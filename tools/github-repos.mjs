// npm run github
// Saves the most recently updated public repositories to assets/data/github.json,
// which projects.html shows in its "Recently on GitHub" section.
// Runs daily in .github/workflows/maintain.yml; GITHUB_TOKEN raises the API rate limit.
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

const USER = 'Hemraj-Adhikari';
const SKIP = new Set([USER.toLowerCase()]); // the profile README repo

const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'hemraj-portfolio' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const res = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed&type=owner`, { headers });
if (!res.ok) {
  console.error(`GitHub API returned ${res.status}; keeping the existing file.`);
  process.exit(0);
}
const repos = (await res.json())
  .filter((r) => !r.fork && !r.archived && !r.private && !SKIP.has(r.name.toLowerCase()))
  .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
  .slice(0, 6)
  .map((r) => ({
    name: r.name,
    description: r.description || '',
    url: r.html_url,
    homepage: r.homepage || '',
    language: r.language || '',
    stars: r.stargazers_count,
    pushed_at: r.pushed_at,
  }));

writeFileSync(path.join(ROOT, 'assets/data/github.json'), JSON.stringify({ updated: new Date().toISOString(), repos }, null, 2) + '\n');
console.log(`Saved ${repos.length} repositories.`);
