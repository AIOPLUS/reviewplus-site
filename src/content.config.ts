import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faq = z.array(z.object({ vraag: z.string(), antwoord: z.string() })).default([]);

/** Privacyverklaring en algemene voorwaarden (Markdown). */
const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    ingangsdatum: z.string(),
  }),
});

/**
 * Kennisbank. Nieuw artikel: maak src/content/articles/<slug>.md met deze velden.
 * Zet `concept: true` zolang het niet online mag.
 */
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    titel: z.string(),
    beschrijving: z.string(),
    categorie: z.enum(['Reviews verzamelen', 'Reageren op reviews', 'Google-bedrijfsprofiel', 'Lokale vindbaarheid', 'Nieuws']),
    datum: z.coerce.date(),
    bijgewerkt: z.coerce.date().optional(),
    auteur: z.string().default('Team Review Plus'),
    concept: z.boolean().default(false),
  }),
});

/** Sectorpagina's (/voor/<slug>). */
const sectors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sectors' }),
  schema: z.object({
    slug: z.string(),
    naam: z.string(),
    /** Zelfstandig naamwoord in de zin "reviews voor …", bv. "restaurants en cafés". */
    doelgroep: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    heroTitel: z.string(),
    heroTekst: z.string(),
    samenvatting: z.string(),
    /** Foto uit src/assets/img (bestandsnaam). */
    foto: z.string(),
    fotoAlt: z.string(),
    toepassingen: z.array(z.object({ titel: z.string(), tekst: z.string() })),
    /** Slug van de bijpassende sectorpagina in de shop (shop.reviewplus.io/voor/<slug>), als die bestaat. */
    shopSector: z.string().optional(),
    volgorde: z.number().default(0),
    faq,
  }),
});

export const collections = { legal, articles, sectors };
