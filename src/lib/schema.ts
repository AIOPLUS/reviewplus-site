import { brand } from '@/config/brand';
import { plannen } from '@/config/content';
import { absoluteUrl } from './url';

type Json = Record<string, unknown>;

const orgId = `${brand.siteUrl}/#organization`;

export function organizationSchema(): Json {
  const sameAs = Object.values(brand.social).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': orgId,
    name: brand.name,
    url: brand.siteUrl,
    logo: absoluteUrl(brand.logo),
    email: brand.email,
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${brand.siteUrl}/#website`,
    name: brand.name,
    url: brand.siteUrl,
    inLanguage: 'nl-NL',
    publisher: { '@id': orgId },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function faqSchema(faq: readonly { vraag: string; antwoord: string }[]): Json | null {
  if (!faq.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.vraag,
      acceptedAnswer: { '@type': 'Answer', text: f.antwoord },
    })),
  };
}

/** Review Plus Online als software, met de drie abonnementen als aanbiedingen (prijs per maand, excl. btw). */
export function softwareSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Review Plus Online',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    url: absoluteUrl('/features'),
    publisher: { '@id': orgId },
    offers: plannen.map((p) => ({
      '@type': 'Offer',
      name: p.naam,
      price: p.maand.replace(',', '.'),
      priceCurrency: 'EUR',
      url: absoluteUrl('/plans'),
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: p.maand.replace(',', '.'),
        priceCurrency: 'EUR',
        unitCode: 'MON',
        valueAddedTaxIncluded: false,
      },
    })),
  };
}
