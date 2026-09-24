import { getCollection, type CollectionEntry } from 'astro:content';
import { brand } from '@/config/brand';
import { TOON_CONCEPTEN } from '@/config/site';
import { absoluteUrl } from './url';

export type Vacature = CollectionEntry<'jobs'>;

/** Zichtbare vacatures: open eerst, daarna nieuwste eerst. Concepten alleen op de testversie. */
export async function vacatures(): Promise<Vacature[]> {
  const alle = await getCollection('jobs', (j) => TOON_CONCEPTEN || !j.data.concept);
  return alle.sort((a, b) => Number(a.data.gesloten) - Number(b.data.gesloten) || b.data.datum.getTime() - a.data.datum.getTime());
}

const dienstverbandLabel = { fulltime: 'Fulltime', parttime: 'Parttime', freelance: 'Freelance', stage: 'Stage' } as const;
const euro = (n: number) => `€ ${n.toLocaleString('nl-NL', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

export function dienstverband(v: Vacature): string {
  return v.data.dienstverband.map((d) => dienstverbandLabel[d]).join(' of ').toLowerCase().replace(/^./, (c) => c.toUpperCase());
}

export function salaris(v: Vacature): string | null {
  const s = v.data.salaris;
  if (!s) return null;
  return `${euro(s.min)}${s.max ? ` – ${euro(s.max)}` : ''} bruto per ${s.per}`;
}

export function locatie(v: Vacature): string {
  return v.data.werkplek === 'remote' ? 'Remote' : `${v.data.plaats}${v.data.werkplek === 'hybride' ? ' (hybride)' : ''}`;
}

/** Kenmerken voor de kaart en de zijbalk. */
export function kenmerken(v: Vacature): { label: string; waarde: string }[] {
  return [
    { label: 'Dienstverband', waarde: dienstverband(v) },
    { label: 'Uren', waarde: v.data.uren },
    { label: 'Locatie', waarde: locatie(v) },
    ...(salaris(v) ? [{ label: 'Salaris', waarde: salaris(v)! }] : []),
    ...(v.data.start ? [{ label: 'Start', waarde: v.data.start }] : []),
  ];
}

const googleType = { fulltime: 'FULL_TIME', parttime: 'PART_TIME', freelance: 'CONTRACTOR', stage: 'INTERN' } as const;
const googleEenheid = { uur: 'HOUR', maand: 'MONTH', jaar: 'YEAR' } as const;

/** JobPosting voor Google for Jobs. Alleen voor gepubliceerde, open vacatures. */
export function jobPostingSchema(v: Vacature, beschrijvingHtml: string): Record<string, unknown> | null {
  const d = v.data;
  if (d.concept || d.gesloten) return null;
  const adres = { '@type': 'PostalAddress', addressLocality: d.plaats, ...(d.regio ? { addressRegion: d.regio } : {}), addressCountry: d.land };
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: d.titel,
    description: beschrijvingHtml,
    datePosted: d.datum.toISOString().slice(0, 10),
    validThrough: `${d.geldigTot.toISOString().slice(0, 10)}T23:59:59+01:00`,
    employmentType: d.dienstverband.map((x) => googleType[x]),
    hiringOrganization: { '@type': 'Organization', name: brand.name, sameAs: brand.siteUrl, logo: absoluteUrl(brand.logo) },
    ...(d.werkplek === 'remote'
      ? { jobLocationType: 'TELECOMMUTE', applicantLocationRequirements: { '@type': 'Country', name: d.land === 'BE' ? 'België' : 'Nederland' } }
      : { jobLocation: { '@type': 'Place', address: adres } }),
    ...(d.salaris
      ? {
          baseSalary: {
            '@type': 'MonetaryAmount',
            currency: 'EUR',
            value: { '@type': 'QuantitativeValue', ...(d.salaris.max ? { minValue: d.salaris.min, maxValue: d.salaris.max } : { value: d.salaris.min }), unitText: googleEenheid[d.salaris.per] },
          },
        }
      : {}),
    directApply: true,
    url: absoluteUrl(`/jobs/${v.id}`),
  };
}
