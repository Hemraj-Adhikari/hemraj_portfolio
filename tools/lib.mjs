// Shared helpers for the build and check scripts. No dependencies.
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const SITE = 'https://hemrajadhikari.info.np/';

export const read = (f) => readFileSync(path.join(ROOT, f), 'utf8');
export const htmlFiles = () => readdirSync(ROOT).filter((f) => f.endsWith('.html')).sort();
export const hash = (s, len = 8) => createHash('sha256').update(s).digest('hex').slice(0, len);
export const cspHash = (s) => "'sha256-" + createHash('sha256').update(s, 'utf8').digest('base64') + "'";

export const isNoindex = (html) => /<meta name="robots" content="[^"]*noindex/i.test(html);

/** Inline <script> blocks that execute (JSON-LD is data, not code, so CSP ignores it). */
export function inlineScripts(html) {
  const out = [];
  const re = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) if (!/application\/ld\+json/.test(m[1])) out.push(m[2]);
  return out;
}

export function jsonLd(html) {
  const out = [];
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) out.push(JSON.parse(m[1]));
  return out;
}

/** Last commit date (YYYY-MM-DD) that touched a file, ignoring the automatic chore(build) commits.
 *  Falls back to today when git is unavailable. */
export function lastModified(file) {
  try {
    const d = execFileSync('git', ['log', '-1', '--format=%cs', '--invert-grep', '--grep=^chore(build)', '--', file], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    if (d) return d;
  } catch {}
  return new Date().toISOString().slice(0, 10);
}

export const pageUrl = (file) => SITE + (file === 'index.html' ? '' : file);
