// npm run check
// Fast checks with no browser: broken local links and anchors, missing SEO tags,
// image alt text, valid JSON-LD, sitemap coverage, and that the .min files are up to date.
import { existsSync } from 'node:fs';
import path from 'node:path';
import { transform as cssTransform } from 'lightningcss';
import { transformSync as jsTransform } from 'esbuild';
import { ROOT, read, htmlFiles, hash, isNoindex, jsonLd, pageUrl } from './lib.mjs';

const errors = [];
const warn = [];
const err = (f, m) => errors.push(`${f}: ${m}`);

const files = htmlFiles();
const ids = Object.fromEntries(files.map((f) => [f, new Set([...read(f).matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]));

for (const f of files) {
  const html = read(f);
  const noindex = isNoindex(html);

  // local links, images, scripts, styles
  for (const m of html.matchAll(/\s(?:href|src|poster|data-src|data-full)="([^"]+)"/g)) {
    const raw = m[1];
    if (/^(https?:|mailto:|tel:|data:|javascript:|\/\/)/.test(raw)) continue;
    const [p, anchor] = decodeURI(raw).split('#');
    const file = p.split('?')[0];
    if (file && !existsSync(path.join(ROOT, file))) err(f, `missing file ${raw}`);
    if (anchor) {
      const target = file || f;
      if (target.endsWith('.html') && ids[target] && !ids[target].has(anchor)) err(f, `missing anchor ${raw}`);
    }
  }

  // basics every page needs
  if (!/<html lang="[^"]+"/.test(html)) err(f, 'no lang on <html>');
  if (!/<title>[^<]{10,}<\/title>/.test(html)) err(f, 'missing or short <title>');
  if (!/<meta name="viewport"/.test(html)) err(f, 'no viewport meta');
  if (!/<meta name="description" content="[^"]{50,}"/.test(html)) err(f, 'missing or short meta description');
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) err(f, 'should have exactly one <h1>');
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\salt="/.test(m[0])) err(f, `image without alt: ${m[0].slice(0, 80)}`);
  if (!noindex && f !== '404.html') {
    if (!html.includes(`<link rel="canonical" href="${pageUrl(f)}">`)) err(f, 'canonical missing or wrong');
    if (!/<meta property="og:image" content="https:/.test(html)) err(f, 'no og:image');
    if (!/<meta property="og:title"/.test(html)) err(f, 'no og:title');
  }
  try { jsonLd(html); } catch (e) { err(f, `invalid JSON-LD: ${e.message}`); }
  if (/fonts\.googleapis|fonts\.gstatic/.test(html)) err(f, 'loads Google Fonts; fonts are self-hosted now');
  if (/assets\/(css|js)\/(portfolio|site)\.(css|js)/.test(html)) err(f, 'links an unminified asset; run npm run build');
}

// sitemap lists every indexable page and nothing else
const sitemap = read('sitemap.xml');
const listed = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
for (const f of files) {
  const want = f !== '404.html' && !isNoindex(read(f));
  if (want && !listed.has(pageUrl(f))) err('sitemap.xml', `missing ${f}`);
  if (!want && listed.has(pageUrl(f))) err('sitemap.xml', `lists ${f}, which is noindex`);
}
for (const u of listed) if (!files.some((f) => pageUrl(f) === u)) err('sitemap.xml', `lists ${u}, which does not exist`);

// .min files match their sources
for (const name of ['portfolio', 'site']) {
  const css = cssTransform({ filename: 'x.css', code: Buffer.from(read(`assets/css/${name}.css`)), minify: true }).code.toString();
  if (!existsSync(path.join(ROOT, `assets/css/${name}.min.css`)) || read(`assets/css/${name}.min.css`) !== css) err(`assets/css/${name}.min.css`, 'out of date; run npm run build');
  const js = jsTransform(read(`assets/js/${name}.js`), { minify: true, loader: 'js', legalComments: 'none' }).code;
  if (!existsSync(path.join(ROOT, `assets/js/${name}.min.js`)) || read(`assets/js/${name}.min.js`) !== js) err(`assets/js/${name}.min.js`, 'out of date; run npm run build');
  for (const f of files) {
    const h = read(f);
    if (h.includes(`${name}.min.css?v=`) && !h.includes(`${name}.min.css?v=${hash(css)}`)) err(f, `stale version on ${name}.min.css; run npm run build`);
    if (h.includes(`${name}.min.js?v=`) && !h.includes(`${name}.min.js?v=${hash(js)}`)) err(f, `stale version on ${name}.min.js; run npm run build`);
  }
}

// config.js must stay valid JavaScript
try { new Function(read('assets/js/config.js')); } catch (e) { err('assets/js/config.js', `syntax error: ${e.message}`); }

if (warn.length) console.log('Warnings:\n  ' + warn.join('\n  '));
if (errors.length) {
  console.error(`${errors.length} problem(s):\n  ` + errors.join('\n  '));
  process.exit(1);
}
console.log(`OK: ${files.length} pages checked.`);
