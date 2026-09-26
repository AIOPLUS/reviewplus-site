import data from '@/data/labels.json';

/** De labels van AIO Plus (Review Plus, View Plus, ...). Bron: src/data/labels.json. */
export interface Label {
  id: string;
  naam: string;
  omschrijving: string;
  kleur: string;
  url: string;
  status: 'live' | 'binnenkort';
}

/** Dit label: wordt aangevinkt in de wisselaar en is de utm_source van uitgaande links. */
export const HUIDIG_LABEL = 'reviewplus';

/** Kleur voor labels waarvan de huisstijl nog niet vaststaat. */
const GRIJS = '#a3a3a3';

interface Ruw { id: string; naam: string; omschrijving?: string; kleur?: string; url?: string; status?: string }

const normaliseer = (l: Ruw): Label => ({
  id: l.id,
  naam: l.naam,
  omschrijving: l.omschrijving ?? '',
  url: l.url ?? '',
  kleur: l.kleur || GRIJS,
  // Alleen klikbaar als het label live is én een adres heeft.
  status: l.status === 'live' && l.url ? 'live' : 'binnenkort',
});

export const labels: Label[] = data.labels.map(normaliseer);
export const bundel: Label = normaliseer({ ...data.bundel, kleur: '' });

/** Link naar een ander label, met utm-parameters zodat je in analytics ziet waar bezoekers vandaan komen. */
export function labelLink(label: Label, plek: 'wisselaar' | 'footer' | 'menu'): string {
  if (label.id === HUIDIG_LABEL) return label.url;
  const u = new URL(label.url);
  u.searchParams.set('utm_source', HUIDIG_LABEL);
  u.searchParams.set('utm_medium', 'labelwisselaar');
  u.searchParams.set('utm_content', plek);
  return u.toString();
}
