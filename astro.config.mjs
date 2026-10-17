import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ayches.is-a.dev',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
