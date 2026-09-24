// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const site = (env.SITE_URL || 'https://reviewplus.io').replace(/\/+$/, '');
// Voor de testversie op https://aioplus.github.io/reviewplus-site: BASE_PATH=/reviewplus-site
const rawBase = env.BASE_PATH || '/';
const base = rawBase === '/' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}`;

export default defineConfig({
  site,
  base,
  // Zelfde URL's als de Framer-site (/features, /plans, …) zodat posities in Google behouden blijven.
  trailingSlash: 'never',
  build: { format: 'file' },
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !/\/(bedankt|welkom|404)(\.html)?$/.test(page),
    }),
  ],
  image: { responsiveStyles: true },
  vite: {
    plugins: [tailwindcss()],
    define: {
      'import.meta.env.SITE_URL': JSON.stringify(site),
      'import.meta.env.BASE_PATH': JSON.stringify(base),
    },
  },
});
