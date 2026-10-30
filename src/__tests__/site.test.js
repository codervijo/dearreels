// src/__tests__/site.test.js
// Built-output SEO checks for EVERY page (v1.B). Reads dist/, so it needs
// `pnpm build` first — `make test` builds before testing.

import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = join(process.cwd(), 'dist');
const site = 'https://dearreels.com';

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return htmlFiles(p);
    return name.endsWith('.html') ? [p] : [];
  });
}

// dist/questions/to-ask-your-mom/index.html → /questions/to-ask-your-mom/
const urlPath = (file) =>
  '/' + relative(dist, file).replace(/index\.html$/, '').replace(/\\/g, '/');

const attr = (html, re) => html.match(re)?.[1];
// decode the few entities Astro emits before measuring lengths
const decode = (s) =>
  s.replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');

describe('built site (dist/)', () => {
  it('dist/ exists — run `pnpm build` first', () => {
    expect(existsSync(dist)).toBe(true);
  });

  if (!existsSync(dist)) return;

  const files = htmlFiles(dist).filter((f) => !f.endsWith('404.html'));
  const sitemap = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8');
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  it('builds the v1.B content pages', () => {
    const paths = files.map(urlPath);
    for (const p of [
      '/questions/',
      '/questions/to-ask-your-mom/',
      '/questions/to-ask-your-dad/',
      '/questions/to-ask-your-grandparents/',
      '/questions/to-ask-your-parents/',
      '/questions/to-ask-aging-parents/',
      '/guides/storyworth-alternative/',
      '/essays/staying-close-to-parents-far-away/',
    ]) {
      expect(paths).toContain(p);
    }
  });

  for (const file of files) {
    const path = urlPath(file);
    const html = readFileSync(file, 'utf8');

    describe(path, () => {
      it('has a <title> ≤ 70 chars', () => {
        const title = attr(html, /<title>([^<]*)<\/title>/);
        expect(title).toBeTruthy();
        expect(decode(title).length).toBeLessThanOrEqual(70);
      });

      it('has a meta description ≤ 160 chars', () => {
        const d = attr(html, /<meta name="description" content="([^"]*)"/);
        expect(d).toBeTruthy();
        expect(decode(d).length).toBeLessThanOrEqual(160);
      });

      it('canonical is absolute, trailing-slashed, and matches the page path', () => {
        expect(attr(html, /<link rel="canonical" href="([^"]*)"/)).toBe(`${site}${path}`);
      });

      it('is indexable and listed in the sitemap', () => {
        expect(attr(html, /<meta name="robots" content="([^"]*)"/)).toMatch(/^index/);
        expect(locs).toContain(`${site}${path}`);
      });

      it('has og:image and exactly one <h1>', () => {
        expect(html).toMatch(/property="og:image"/);
        expect(html.match(/<h1[\s>]/g)?.length).toBe(1);
      });

      it('has parseable JSON-LD', () => {
        const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
        expect(blocks.length).toBeGreaterThan(0);
        for (const b of blocks) expect(() => JSON.parse(b[1])).not.toThrow();
      });

      it('internal links point at pages that exist', () => {
        const known = new Set(files.map(urlPath));
        const hrefs = [...html.matchAll(/href="(\/[^"#]*)(#[^"]*)?"/g)]
          .map((m) => m[1])
          .filter((h) => !/\.(svg|jpg|png|txt|xml|css|js)$/.test(h) && !h.startsWith('/_astro/'));
        for (const h of hrefs) expect(known, `${path} → ${h}`).toContain(h);
      });
    });
  }
});
