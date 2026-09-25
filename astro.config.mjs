// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const site = (env.SITE_URL || 'https://www.reviewplus.io').replace(/\/+$/, '');
// Voor de testversie op https://aioplus.github.io/reviewplus-site: BASE_PATH=/reviewplus-site
const rawBase = env.BASE_PATH || '/';
const base = rawBase === '/' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}`;

export default defineConfig({
  site,
  base,
  // Zelfde URL's als de Framer-site (/features, /plans, …) zodat posities in Google behouden blijven.
  trailingSlash: 'never',
  // Oude pagina's uit het Framer-template (stonden in de Framer-sitemap) sturen we door naar de best passende pagina.
  redirects: {
    "/integration": "/features",
    "/download": "/",
    "/changelog": "/",
    "/overview": "/features",
    "/team-member/sarah-jane": "/about",
    "/team-member/john-david": "/about",
    "/team-member/michael-james": "/about",
    "/team-member/jennifer-ann": "/about",
    "/team-member/william-joseph": "/about",
    "/team-member/charlotte-rose": "/about",
    "/team-member/amelia-grace": "/about",
    "/team-member/evelyn-mae": "/about",
    "/articles/universities-proposing-no-loan-options-for-financial-aid-packages-to-students": "/articles",
    "/articles/buy-low-sell-high": "/articles",
    "/articles/opportunities-for-insurers-in-a-rapidly-shifting-insurtech-market": "/articles",
    "/articles/how-insurers-can-serve-asia-s-aging-population": "/articles",
    "/articles/8-financial-tips-for-young-adults": "/articles",
    "/articles/10-simple-habits-to-improve-your-investing-results-immediately": "/articles",
    "/articles/3-essential-questions-you-need-to-ask-your-insurance-advisor": "/articles",
    "/articles/adjusting-the-sails-of-your-investment-to-the-weather": "/articles",
    "/articles/why-you-should-not-invest-your-emergency-fund": "/articles",
    "/articles/navigating-the-stock-market-a-beginner-s-guide": "/articles",
    "/integration/chainly": "/features",
    "/integration/syncnest": "/features",
    "/integration/relaylink": "/features",
    "/integration/connectzen": "/features",
    "/integration/integryhub": "/features",
    "/integration/taskio": "/features",
    "/integration/flownet": "/features",
    "/integration/databridge": "/features",
    "/integration/zapsync": "/features",
    "/jobs/product-succes-manager": "/jobs",
    "/jobs/marketing-manager": "/jobs",
    "/jobs/ios-developer": "/jobs",
    "/jobs/product-designer": "/jobs"
  },
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
