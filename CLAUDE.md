# reviewplus-site

Hoofdsite, live op https://www.reviewplus.io. **Een push naar `main` staat direct live**, dus draai eerst `npm run check`. Het algemene overzicht staat in `../CLAUDE.md` en de structuur in `README.md`.

## Waar staat wat

- **Teksten, plannen en prijzen**: `src/config/content.ts`. Wijzig je een prijs, pas hem dan ook aan in Make-module 121.
- **Btw**: `src/lib/prijs.ts`.
- **Menu, footer en links**: `src/config/brand.ts` (bijvoorbeeld `onboardingBookingUrl`).
- **Omgeving**: `src/config/site.ts` (env, `LEAD`, `TOON_CONCEPTEN` = alleen buiten productie).
- **Content**: `src/content/{articles,sectors,jobs,legal}/*.md`, met het schema in `src/content.config.ts`. Vacatures met `concept: true` staan niet live.
- **Plan afsluiten**: `src/pages/aanmelden.astro` (payload `request_type: abonnement`), daarna `src/pages/welkom.astro`.
- **Vacatures**: `src/pages/jobs/` en `src/lib/jobs.ts` (JobPosting-schema). Het formulier is `src/components/jobs/SollicitatieForm.astro`.
- **Doorverwijzingen van oude Framer-URL's**: `redirects` in `astro.config.mjs`. De sitemap slaat bedankt, welkom en 404 over.
- **KvK-Worker (geparkeerd)**: `workers/kvk-zoeken/`, met eigen README en tests. Voer de tests uit met `node --test workers/kvk-zoeken/test.mjs`.
- **Startprompt View Plus**: `docs/view-plus-startprompt.md`.
