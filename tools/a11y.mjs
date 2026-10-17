// npm run a11y
// Opens every page in Chromium, in both light and dark mode, and runs axe-core
// (WCAG 2.1 A and AA, including colour contrast). Fails on serious or critical issues.
// Locally: npx playwright install chromium  (or set CHROMIUM_PATH to an existing Chromium).
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { ROOT, htmlFiles } from './lib.mjs';

const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.xml': 'application/xml', '.pdf': 'application/pdf', '.webmanifest': 'application/manifest+json' };
const server = http.createServer(async (req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const file = path.join(ROOT, p === '/' ? 'index.html' : p);
  try { res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' }); res.end(await readFile(file)); }
  catch { res.writeHead(404); res.end('not found'); }
}).listen(0);
const base = `http://localhost:${server.address().port}/`;

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const pages = (process.argv[2] ? process.argv.slice(2) : htmlFiles());
let serious = 0;
for (const scheme of ['light', 'dark']) {
  const ctx = await browser.newContext({ colorScheme: scheme, reducedMotion: 'reduce', viewport: { width: 1280, height: 900 } });
  for (const f of pages) {
    const page = await ctx.newPage();
    await page.goto(base + f, { waitUntil: 'networkidle' });
    // scroll through so lazy content and reveal effects settle before measuring
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(800);
    const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    for (const v of violations) {
      const bad = v.impact === 'serious' || v.impact === 'critical';
      if (bad) serious++;
      console.log(`${bad ? 'FAIL' : 'warn'} [${scheme}] ${f}: ${v.id} (${v.impact}) ${v.help}`);
      for (const n of v.nodes.slice(0, 4)) console.log(`       ${n.target.join(' ')}  ${(n.failureSummary || '').split('\n').slice(1, 2).join('').trim()}`);
      if (v.nodes.length > 4) console.log(`       ...and ${v.nodes.length - 4} more`);
    }
    await page.close();
  }
  await ctx.close();
}
await browser.close();
server.close();
if (serious) { console.error(`\n${serious} serious or critical accessibility issue(s).`); process.exit(1); }
console.log(`OK: ${pages.length} pages pass in light and dark mode.`);
