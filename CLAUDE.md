# reviewplus-site

Hoofdsite van Review Plus, live op https://www.reviewplus.io. De centrale instructies (bedrijf, labels, tools, werkafspraken) staan in de hub `AIOPLUS/claude`: lokaal `../CLAUDE.md`; in een cloud-chat haalt de SessionStart-hook ze op. Dit bestand bevat alleen wat specifiek is voor deze repo; de structuur staat in `README.md`.

**Main staat direct live.** Werk op een branch, draai `npm run check`, open een PR en merge pas na een groene check en Jordans akkoord.

## Waar staat wat

- **Teksten, plannen en prijzen**: `src/config/content.ts`. Wijzig je een prijs, pas hem dan ook aan in Make-module 121 (via de chat "AIO Plus - Make").
- **Btw**: `src/lib/prijs.ts`.
- **Menu, footer en links**: `src/config/brand.ts` (bijvoorbeeld `onboardingBookingUrl`).
- **Omgeving**: `src/config/site.ts` (env, `LEAD`, `TOON_CONCEPTEN` = alleen buiten productie).
- **Content**: `src/content/{articles,sectors,jobs,legal}/*.md`, met het schema in `src/content.config.ts`. Vacatures met `concept: true` staan niet live.
- **Plan afsluiten**: `src/pages/aanmelden.astro` (payload `request_type: abonnement`), daarna `src/pages/welkom.astro`.
- **Vacatures**: `src/pages/jobs/` en `src/lib/jobs.ts` (JobPosting-schema). Het formulier is `src/components/jobs/SollicitatieForm.astro`.
- **Labels**: `src/data/labels.json` is de bron voor de labelwisselaar op alle sites (gepubliceerd op `/labels.json`). Zie `docs/DIENSTEN.md` in de hub.
- **Doorverwijzingen van oude Framer-URL's**: `redirects` in `astro.config.mjs`. De sitemap slaat bedankt, welkom en 404 over.
- **KvK-Worker (geparkeerd)**: `workers/kvk-zoeken/`, met eigen README en tests. Voer de tests uit met `node --test workers/kvk-zoeken/test.mjs`.
- **CI**: `.github/workflows/ci.yml` draait `npm run check` op elke pull request.
