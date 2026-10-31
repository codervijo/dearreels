// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Pages kept out of the sitemap while they carry operator [VERIFY] markers
// (they also render noindex). Remove a path here when its markers clear —
// site.test.js fails if a page with [VERIFY] is indexable or in the sitemap.
const verifyPending = [];

export default defineConfig({
  site: 'https://dearreels.com',
  integrations: [
    sitemap({ filter: (page) => !verifyPending.some((p) => page.endsWith(p)) }),
    react(),
  ],
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
