/** Btw-tarief voor Nederland (en België zonder verlegging). Prijzen in content.ts zijn exclusief btw. */
export const BTW = 0.21;

/** "149,95" → 149.95 */
export function bedrag(s: string): number {
  return Number(s.replace(/\./g, '').replace(',', '.'));
}

/** 181.4395 → "181,44" */
export function formatEuro(n: number): string {
  return n.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** Bedrag inclusief btw, afgerond op centen. */
export function inclBtw(excl: number): number {
  return Math.round(excl * (1 + BTW) * 100) / 100;
}

/** "149,95" → "181,44" */
export function inclBtwTekst(excl: string): string {
  return formatEuro(inclBtw(bedrag(excl)));
}
