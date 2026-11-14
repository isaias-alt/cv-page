// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cv.lucasco.dev',
  // Astro 7 defaults to JSX whitespace handling; keep HTML-aware compression so
  // separators between inline elements stay stable.
  compressHTML: true,
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [sitemap()],
});
