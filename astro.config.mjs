import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ayches.is-a.dev',
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Sin fuentes ni imágenes en data: URI: la CSP (public/_headers) solo admite font-src 'self'.
  vite: { build: { assetsInlineLimit: 0 } },
});
