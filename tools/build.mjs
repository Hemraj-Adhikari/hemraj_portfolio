// npm run build
// 1. Minifies assets/css/{portfolio,site}.css and assets/js/{portfolio,site}.js into *.min.* files
//    and points every page at them with a content hash (?v=...) so browsers fetch new versions.
// 2. Writes sitemap.xml (lastmod from git history) and feed.xml (RSS for the blog).
// 3. Updates the Content-Security-Policy in .htaccess with hashes of the inline scripts.
// Edit the source files, never the .min files.
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { transform as cssTransform } from 'lightningcss';
import { transformSync as jsTransform } from 'esbuild';
import { ROOT, SITE, read, htmlFiles, hash, cspHash, isNoindex, inlineScripts, jsonLd, lastModified, pageUrl } from './lib.mjs';

const write = (f, s) => writeFileSync(path.join(ROOT, f), s);
const report = [];

// ---------- 1. minify ----------
const versions = {};
for (const name of ['portfolio', 'site']) {
  const css = read(`assets/css/${name}.css`);
  const { code } = cssTransform({ filename: `${name}.css`, code: Buffer.from(css), minify: true });
  write(`assets/css/${name}.min.css`, code);
  versions[`css/${name}`] = hash(code.toString());
  report.push(`assets/css/${name}.min.css  ${(css.length / 1024).toFixed(0)} KB -> ${(code.length / 1024).toFixed(0)} KB`);

  const js = read(`assets/js/${name}.js`);
  const out = jsTransform(js, { minify: true, loader: 'js', legalComments: 'none' }).code;
  write(`assets/js/${name}.min.js`, out);
  versions[`js/${name}`] = hash(out);
  report.push(`assets/js/${name}.min.js   ${(js.length / 1024).toFixed(0)} KB -> ${(out.length / 1024).toFixed(0)} KB`);
}
for (const f of ['assets/js/config.js', 'assets/js/resume.js']) versions[f] = hash(read(f));

const refRe = /assets\/(css|js)\/(portfolio|site)(?:\.min)?\.(css|js)(?:\?v=[\w.-]*)?/g;
const smallRe = /(assets\/js\/(?:config|resume)\.js)(?:\?v=[\w.-]*)?/g;
for (const f of htmlFiles()) {
  const before = read(f);
  const after = before
    .replace(refRe, (_, dir, name, ext) => `assets/${dir}/${name}.min.${ext}?v=${versions[`${dir}/${name}`]}`)
    .replace(smallRe, (_, p) => `${p}?v=${versions[p]}`);
  if (after !== before) write(f, after);
}

// ---------- 2. sitemap + RSS ----------
const old = (() => { try { return read('sitemap.xml'); } catch { return ''; } })();
const prev = {};
for (const m of old.matchAll(/<loc>([^<]+)<\/loc>.*?<changefreq>(\w+)<\/changefreq><priority>([\d.]+)<\/priority>/g)) prev[m[1]] = { freq: m[2], pri: m[3] };
const defaults = (f) =>
  f.startsWith('case-') ? { freq: 'monthly', pri: '0.8' } :
  f.startsWith('blog-') || f.endsWith('-blog.html') ? { freq: 'yearly', pri: '0.6' } : { freq: 'monthly', pri: '0.6' };

const pages = htmlFiles().filter((f) => f !== '404.html' && !isNoindex(read(f)));
const urls = pages.map((f) => {
  const loc = pageUrl(f);
  const { freq, pri } = prev[loc] || defaults(f);
  return `  <url><loc>${loc}</loc><lastmod>${lastModified(f)}</lastmod><changefreq>${freq}</changefreq><priority>${pri}</priority></url>`;
});
// homepage first, then the order of the old sitemap, then new pages
const order = Object.keys(prev);
urls.sort((a, b) => {
  const la = a.match(/<loc>([^<]+)/)[1], lb = b.match(/<loc>([^<]+)/)[1];
  const ia = order.indexOf(la), ib = order.indexOf(lb);
  return (ia < 0 ? 1e3 : ia) - (ib < 0 ? 1e3 : ib) || la.localeCompare(lb);
});
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
report.push(`sitemap.xml  ${urls.length} pages`);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const posts = [];
for (const f of pages) {
  for (const ld of jsonLd(read(f))) {
    for (const node of ld['@graph'] || [ld]) {
      if (node['@type'] !== 'BlogPosting' || !node.datePublished) continue;
      const d = node.datePublished.length === 7 ? node.datePublished + '-01' : node.datePublished;
      posts.push({ title: node.headline, desc: node.description || '', url: pageUrl(f), date: new Date(d + 'T06:00:00Z'), lang: node.inLanguage || 'en' });
    }
  }
}
posts.sort((a, b) => b.date - a.date);
const items = posts.map((p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${p.url}</link>
      <guid isPermaLink="true">${p.url}</guid>
      <pubDate>${p.date.toUTCString()}</pubDate>
      <description>${esc(p.desc)}</description>
    </item>`).join('\n');
write('feed.xml', `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Hemraj Adhikari · Blog</title>
    <link>${SITE}blog.html</link>
    <atom:link href="${SITE}feed.xml" rel="self" type="application/rss+xml"/>
    <description>Practical guides on CRMs, cloud, security and starting a career in IT in Nepal.</description>
    <language>en</language>
    <lastBuildDate>${(posts[0]?.date || new Date()).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`);
report.push(`feed.xml     ${posts.length} posts`);

// ---------- 3. CSP hashes in .htaccess ----------
const hashes = new Set();
for (const f of htmlFiles()) for (const s of inlineScripts(read(f))) hashes.add(cspHash(s));
const csp = [
  "default-src 'self'",
  `script-src 'self' ${[...hashes].sort().join(' ')} https://gc.zgo.at`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data: https:",
  "media-src 'self'",
  "connect-src 'self' https://formspree.io https://*.goatcounter.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' https://formspree.io",
  'upgrade-insecure-requests',
].join('; ');
const ht = read('.htaccess');
const ht2 = ht.replace(/Header always set Content-Security-Policy "[^"]*"/, `Header always set Content-Security-Policy "${csp}"`);
if (ht2 === ht && !ht.includes(csp)) throw new Error('Could not find the Content-Security-Policy line in .htaccess');
write('.htaccess', ht2);
report.push(`.htaccess    CSP with ${hashes.size} inline-script hashes`);

console.log(report.join('\n'));
