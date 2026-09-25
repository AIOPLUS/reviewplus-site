/** Pure hulpfuncties (los testbaar zonder Cloudflare). Veldnamen volgens api_zoeken.yaml van KvK (Zoeken API v2). */

/** Bouwt de KvK-zoek-URL: 8 cijfers = KvK-nummer, anders zoeken op naam (min. 3 tekens). */
export function bouwKvkUrl(base, q) {
  const term = (q ?? '').trim();
  const cijfers = term.replace(/\D/g, '');
  const params = new URLSearchParams();
  if (/^\d{8}$/.test(cijfers) && cijfers.length === term.replace(/[\s.]/g, '').length) {
    params.set('kvkNummer', cijfers);
  } else if (term.length >= 3) {
    params.set('naam', term);
  } else {
    return null;
  }
  params.append('type', 'hoofdvestiging');
  params.append('type', 'nevenvestiging');
  params.set('resultatenPerPagina', '10');
  return `${base.replace(/\/+$/, '')}/zoeken?${params}`;
}

/** Zet het KvK-antwoord om naar een compacte lijst voor de formulieren. */
export function naarResultaten(data) {
  const items = Array.isArray(data?.resultaten) ? data.resultaten : [];
  const gezien = new Set();
  const uit = [];
  for (const r of items) {
    const a = r?.adres?.binnenlandsAdres ?? {};
    const item = {
      kvkNummer: r.kvkNummer ?? '',
      vestigingsnummer: r.vestigingsnummer ?? '',
      naam: r.naam ?? '',
      type: r.type ?? '',
      straat: a.straatnaam ?? '',
      huisnummer: a.huisnummer != null ? String(a.huisnummer) : '',
      huisletter: a.huisletter ?? '',
      postcode: a.postcode ?? '',
      plaats: a.plaats ?? '',
    };
    if (!item.kvkNummer || !item.naam) continue;
    const sleutel = `${item.kvkNummer}|${item.vestigingsnummer}|${item.naam}`;
    if (gezien.has(sleutel)) continue;
    gezien.add(sleutel);
    uit.push(item);
  }
  return uit;
}
