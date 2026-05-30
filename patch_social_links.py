#!/usr/bin/env python3
"""
patch_social_links.py
Run this in the same folder as index.html:
    python3 patch_social_links.py

Changes made:
  1. LinkedIn URL: /in/hemrajadhikary  →  /in/hemraajadhikari
  2. Adds Facebook icon link (in both hero social row and footer social)
  3. Adds Instagram icon link (in both hero social row and footer social)
"""

import re, shutil, sys
from pathlib import Path

FILE = Path("index.html")
if not FILE.exists():
    sys.exit("ERROR: index.html not found in current directory.")

# Back up original
shutil.copy(FILE, FILE.with_suffix(".html.bak"))
print("✓ Backup saved as index.html.bak")

html = FILE.read_text(encoding="utf-8")

# ─── 1. Fix LinkedIn URL everywhere ───────────────────────────────────────────
old_li = "https://www.linkedin.com/in/hemrajadhikary"
new_li = "https://www.linkedin.com/in/hemraajadhikari"
count = html.count(old_li)
html = html.replace(old_li, new_li)
print(f"✓ LinkedIn URL fixed ({count} occurrence{'s' if count!=1 else ''})")

# ─── 2. Facebook SVG button snippet ──────────────────────────────────────────
fb_hero = '''        <a href="https://web.facebook.com/hemraaj.adhikaari/" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Hemraj Adhikari on Facebook">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.885v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
        </a>'''

ig_hero = '''        <a href="https://www.instagram.com/hemraj.adhikary/" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Hemraj Adhikari on Instagram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </a>'''

# ─── 3. Facebook + Instagram for FOOTER ──────────────────────────────────────
fb_footer = '''        <a href="https://web.facebook.com/hemraaj.adhikaari/" target="_blank" rel="noopener noreferrer" aria-label="Hemraj Adhikari on Facebook">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.885v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
        </a>'''

ig_footer = '''        <a href="https://www.instagram.com/hemraj.adhikary/" target="_blank" rel="noopener noreferrer" aria-label="Hemraj Adhikari on Instagram">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </a>'''

# ─── Inject into HERO social row (after the email icon link) ─────────────────
HERO_EMAIL_ANCHOR = '''        <a href="mailto:hemrajhadhikari@gmail.com" class="social-btn" aria-label="Email Hemraj Adhikari">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </a>
        <a href="https://hemrajadhikari.info.np" class="social-btn" aria-label="Hemraj Adhikari website">'''

HERO_EMAIL_REPLACEMENT = (
    '''        <a href="mailto:hemrajhadhikari@gmail.com" class="social-btn" aria-label="Email Hemraj Adhikari">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </a>\n'''
    + fb_hero + "\n"
    + ig_hero + "\n"
    + '''        <a href="https://hemrajadhikari.info.np" class="social-btn" aria-label="Hemraj Adhikari website">'''
)

if HERO_EMAIL_ANCHOR in html:
    html = html.replace(HERO_EMAIL_ANCHOR, HERO_EMAIL_REPLACEMENT, 1)
    print("✓ Facebook + Instagram added to hero social row")
else:
    print("⚠  Hero social anchor not found — skipping hero injection (check manually)")

# ─── Inject into FOOTER social (after footer email link) ─────────────────────
FOOTER_EMAIL_ANCHOR = '''        <a href="mailto:hemrajhadhikari@gmail.com" aria-label="Email Hemraj Adhikari">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </a>
      </div>
    </div>

    <div class="footer-links">'''

FOOTER_EMAIL_REPLACEMENT = (
    '''        <a href="mailto:hemrajhadhikari@gmail.com" aria-label="Email Hemraj Adhikari">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </a>\n'''
    + fb_footer + "\n"
    + ig_footer + "\n"
    + '''      </div>
    </div>

    <div class="footer-links">'''
)

if FOOTER_EMAIL_ANCHOR in html:
    html = html.replace(FOOTER_EMAIL_ANCHOR, FOOTER_EMAIL_REPLACEMENT, 1)
    print("✓ Facebook + Instagram added to footer social row")
else:
    print("⚠  Footer social anchor not found — skipping footer injection (check manually)")

# Also fix LinkedIn in Schema.org sameAs array
old_schema_li = '"https://www.linkedin.com/in/hemrajadhikary"'
new_schema_li = '"https://www.linkedin.com/in/hemraajadhikari"'
schema_count = html.count(old_schema_li)
html = html.replace(old_schema_li, new_schema_li)
if schema_count:
    print(f"✓ LinkedIn URL fixed in Schema.org sameAs ({schema_count} occurrence{'s' if schema_count!=1 else ''})")

FILE.write_text(html, encoding="utf-8")
print("\n✅ All done! index.html has been updated.")
print("   (Original saved as index.html.bak)")
