// src/__tests__/seo.test.js
// Technical-SEO regression check for Astro. Reads src/pages/index.astro,
// strips frontmatter, asserts the v3.B SEO baseline tags remain.

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const raw = readFileSync(join(process.cwd(), 'src', 'pages', 'index.astro'), 'utf8');
// Strip frontmatter (between leading `---` markers) so we just check the HTML body.
const html = raw.replace(/^---[\s\S]*?---\n/, '');
const frontmatter = raw.match(/^---([\s\S]*?)---\n/)?.[1] ?? '';

describe('SEO baseline (src/pages/index.astro)', () => {
  it('has a <title>', () => {
    expect(html).toMatch(/<title>/);
  });

  it('has <meta name="description">', () => {
    expect(html).toMatch(/<meta\s+name="description"/);
  });

  it('has <link rel="canonical">', () => {
    expect(html).toMatch(/<link\s+rel="canonical"/);
  });

  it('has Open Graph tags', () => {
    expect(html).toMatch(/property="og:title"/);
    expect(html).toMatch(/property="og:url"/);
  });

  it('has Twitter card meta', () => {
    expect(html).toMatch(/name="twitter:card"/);
  });

  it('has favicon link', () => {
    expect(html).toMatch(/<link\s+rel="icon"[^>]*href="\/favicon\.svg"/);
  });

  it('has JSON-LD Organization + WebSite', () => {
    expect(html).toMatch(/application\/ld\+json/);
    expect(html).toMatch(/"@type":\s*"Organization"/);
    expect(html).toMatch(/"@type":\s*"WebSite"/);
  });

  it('meta description is ≤160 chars', () => {
    const m = frontmatter.match(/const description =\s*"([^"]*)"/);
    expect(m).not.toBeNull();
    expect(m[1].length).toBeLessThanOrEqual(160);
  });

  it('has <meta name="robots">', () => {
    expect(html).toMatch(/<meta\s+name="robots"/);
  });

  it('has og:image + twitter:image', () => {
    expect(html).toMatch(/property="og:image"/);
    expect(html).toMatch(/name="twitter:image"/);
  });

  it('canonical matches JSON-LD WebSite url (trailing slash)', () => {
    expect(frontmatter).toMatch(/const site = "https:\/\/dearreels\.com\/"/);
    expect(html).toMatch(/"url": "https:\/\/dearreels\.com\/"/);
  });
});

describe('404 handling (no soft-404s)', () => {
  it('wrangler serves 404.html with a 404 status, not the SPA fallback', () => {
    const wrangler = readFileSync(join(process.cwd(), 'wrangler.jsonc'), 'utf8');
    expect(wrangler).toMatch(/"not_found_handling":\s*"404-page"/);
  });

  it('404 page exists and is noindex', () => {
    const page = readFileSync(join(process.cwd(), 'src', 'pages', '404.astro'), 'utf8');
    expect(page).toMatch(/<meta\s+name="robots"\s+content="noindex"/);
  });
});
