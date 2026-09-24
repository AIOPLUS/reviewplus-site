/**
 * Merkgegevens van Review Plus. Eén bron voor header, footer, schema en formulieren.
 */
export const brand = {
  name: 'Review Plus',
  legalName: 'Review Plus', // TODO: Jordan vult de juridische naam (zoals in KvK) in.
  siteUrl: 'https://reviewplus.io',
  shopUrl: 'https://shop.reviewplus.io',
  appLoginUrl: 'https://app.reviewplus.io/login',
  demoBookingUrl:
    'https://cloud.teamleader.eu/review-plus/bookings/u/review1/t/demonstratie-met-review-plus-2/',
  email: 'support@reviewplus.io',
  /** Rasterlogo voor schema.org/Google (min. 112px). Icoon zelf: components/layout/Logo.astro */
  logo: '/assets/brand/logo-512.png',
  // TODO: Jordan vult de echte profielen in (de Framer-site linkte naar algemene placeholders).
  social: {
    linkedin: '',
    instagram: '',
    facebook: '',
  },
  tagline: 'Maak het jezelf makkelijker.',
} as const;

/** Hoofdmenu (zelfde volgorde als de Framer-site, met "Over ons" erbij). */
export const mainNav = [
  { label: 'Home', href: '/' },
  { label: 'Het product', href: '/features' },
  { label: 'Prijzen', href: '/plans' },
  { label: 'Over ons', href: '/about' },
  { label: 'Kennisbank', href: '/articles' },
] as const;

export const footerNav = [
  {
    title: 'Bedrijf',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Over ons', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Kennisbank', href: '/articles' },
    ],
  },
  {
    title: 'Product',
    links: [
      { label: 'Functies', href: '/features' },
      { label: 'Prijzen', href: '/plans' },
      { label: 'Shop', href: brand.shopUrl },
      { label: 'Inloggen', href: brand.appLoginUrl },
    ],
  },
  {
    title: 'Branches',
    links: [
      { label: 'Horeca', href: '/voor/horeca' },
      { label: 'Hotels & hospitality', href: '/voor/hotels' },
      { label: 'Beauty & wellness', href: '/voor/beauty' },
      { label: 'Autobedrijven', href: '/voor/autobedrijven' },
      { label: 'Installateurs', href: '/voor/installateurs' },
      { label: 'Winkels', href: '/voor/retail' },
      { label: 'Zorg', href: '/voor/zorg' },
      { label: 'Sportscholen', href: '/voor/sportscholen' },
      { label: 'Vrije tijd & beleving', href: '/voor/vrije-tijd' },
      { label: 'Franchiseketens', href: '/voor/franchise' },
    ],
  },
  {
    title: 'Wettelijk',
    links: [
      { label: 'Algemene voorwaarden', href: '/term-and-conditions' },
      { label: 'Privacyverklaring', href: '/privacy-policy' },
    ],
  },
] as const;
