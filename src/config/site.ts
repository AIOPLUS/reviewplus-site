import { brand } from './brand';

const env = import.meta.env;

function normBase(raw: string | undefined): string {
  if (!raw || raw === '/') return '/';
  return `/${raw.replace(/^\/+|\/+$/g, '')}`;
}

/** Absolute origin zonder trailing slash, bv. https://reviewplus.io */
export const SITE_URL = (env.SITE_URL || 'https://reviewplus.io').replace(/\/+$/, '');
/** "/" op reviewplus.io, "/reviewplus-site" op de testversie (GitHub Pages zonder eigen domein). */
export const BASE_PATH = normBase(env.BASE_PATH);
/** Concepten (vacatures met `concept: true`) zijn alleen zichtbaar op de testversie, nooit op reviewplus.io. */
export const TOON_CONCEPTEN = BASE_PATH !== '/';

export const DEMO_BOOKING_URL = brand.demoBookingUrl;
export const LOGIN_URL = brand.appLoginUrl;

/** Formulieren (contact, nieuwsbrief) gaan naar hetzelfde Make-scenario als de shop. */
export const LEAD = {
  webhookUrl: env.PUBLIC_LEAD_WEBHOOK_URL || '',
  turnstileSiteKey: env.PUBLIC_TURNSTILE_SITE_KEY || '',
  /** KvK-zoekproxy (Cloudflare Worker, zie workers/kvk-zoeken). Leeg = geen KvK-autofill. */
  kvkProxyUrl: env.PUBLIC_KVK_PROXY_URL || '',
  fallbackEmail: brand.email,
};

export const ANALYTICS = {
  provider: (env.PUBLIC_ANALYTICS_PROVIDER || '') as '' | 'plausible' | 'umami',
  domain: env.PUBLIC_ANALYTICS_DOMAIN || new URL(SITE_URL).host,
  scriptUrl: env.PUBLIC_ANALYTICS_SCRIPT_URL || '',
  umamiWebsiteId: env.PUBLIC_UMAMI_WEBSITE_ID || '',
};

export const PIXELS = {
  metaPixelId: env.PUBLIC_META_PIXEL_ID || '',
  gadsId: env.PUBLIC_GADS_ID || '',
  gadsConversionLabel: env.PUBLIC_GADS_CONVERSION_LABEL || '',
};
