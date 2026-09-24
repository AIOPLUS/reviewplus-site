import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { brand } from '@/config/brand';
import { faq, hoofdfuncties, extraFuncties, plannen } from '@/config/content';
import { absoluteUrl } from '@/lib/url';

/** Samenvatting van de site voor AI-assistenten (llmstxt.org). */
export const GET: APIRoute = async () => {
  const artikelen = (await getCollection('articles', (a) => !a.data.concept)).sort((a, b) => b.data.datum.getTime() - a.data.datum.getTime());
  const sectors = (await getCollection('sectors')).sort((a, b) => a.data.volgorde - b.data.volgorde);
  const lines = [
    `# ${brand.name}`,
    '',
    '> Review Plus is software voor reputatiemanagement: bedrijven verzamelen automatisch meer online reviews (via NFC-kaarten, QR-codes, slimme links, e-mail, sms en WhatsApp), laten AI op reviews reageren en volgen alle reviewplatformen in één dashboard.',
    '',
    '## Functies',
    ...hoofdfuncties.map((f) => `- ${f.titel}: ${f.tekst}`),
    ...extraFuncties.map((f) => `- ${f.titel}: ${f.tekst}`),
    '',
    '## Prijzen (per maand, excl. btw)',
    ...plannen.map((p) => `- ${p.naam}: € ${p.maand} bij maandelijkse facturering, € ${p.jaar} bij jaarlijkse facturering. Gratis welkomstpakket: ${p.pakket}.`),
    '',
    '## Pagina\'s',
    `- [Het product](${absoluteUrl('/features')})`,
    `- [Prijzen](${absoluteUrl('/plans')})`,
    `- [Plan direct online afsluiten](${absoluteUrl('/aanmelden')})`,
    `- [Over ons](${absoluteUrl('/about')})`,
    `- [Contact](${absoluteUrl('/contact')})`,
    ...sectors.map((s) => `- [Review Plus voor ${s.data.naam.toLowerCase()}](${absoluteUrl(`/voor/${s.data.slug}`)}): ${s.data.samenvatting}`),
    `- [Shop: gratis NFC-reviewkaarten](${brand.shopUrl})`,
    `- [Demo boeken](${brand.demoBookingUrl})`,
    '',
    ...(artikelen.length ? ['## Kennisbank', ...artikelen.map((a) => `- [${a.data.titel}](${absoluteUrl(`/articles/${a.id}`)}): ${a.data.beschrijving}`), ''] : []),
    '## Veelgestelde vragen',
    ...faq.flatMap((f) => [`### ${f.vraag}`, f.antwoord, '']),
    `Contact: ${brand.email}`,
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
