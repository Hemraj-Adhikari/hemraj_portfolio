// npm run css:unused
// Lists CSS selectors that no page or script uses. Report only: review before deleting,
// because some classes are added by JavaScript at runtime.
import { PurgeCSS } from 'purgecss';
import { ROOT } from './lib.mjs';
import path from 'node:path';

const sheets = {
  'assets/css/portfolio.css': ['assets/js/portfolio.js', 'assets/js/config.js'],
  'assets/css/site.css': ['assets/js/site.js', 'assets/js/config.js'],
};
const pagesFor = (sheet) => `${ROOT}/*.html`;

let total = 0;
for (const [sheet, scripts] of Object.entries(sheets)) {
  const [res] = await new PurgeCSS().purge({
    content: [pagesFor(sheet), ...scripts.map((s) => path.join(ROOT, s))],
    css: [path.join(ROOT, sheet)],
    rejected: true,
    variables: false,
    // state classes toggled from JS with classList / string building
    safelist: { standard: [/^is-/, /^js$/, /^open$/, /^active$/, /^show$/, /^pre$/, /^in$/, /^valid$/, /^invalid$/, /^err$/, /^ok$/, /^dark/, /^light/], greedy: [/data-theme/, /aria-/] },
  });
  const rejected = [...new Set(res.rejected || [])];
  total += rejected.length;
  console.log(`\n${sheet}: ${rejected.length} unused selectors`);
  for (const s of rejected) console.log('  ' + s);
}
process.exitCode = 0;
console.log(`\n${total} selectors in total. These are candidates, not certainties.`);
