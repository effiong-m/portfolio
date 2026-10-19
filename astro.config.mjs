import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// Read environment variables in the Astro config file.
const { BASE_URL } = loadEnv(
  process.env.NODE_ENV || 'development',
  process.cwd(),
  ''
);

// Ensure BASE_URL starts and ends with a slash.
// Example: if BASE_URL is 'portfolio', finalBase becomes '/portfolio/'.
const finalBase = BASE_URL
  ? `/${BASE_URL}/`.replace(/\/{2,}/g, '/')
  : '/';

export default defineConfig({
  base: finalBase,

  prefetch: {
    prefetchAll: true,
  },

  site: 'https://effiong-m.github.io',

  build: {
    inlineStylesheets: 'always',
  },

  integrations: [
    mdx(),
    icon(),
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});