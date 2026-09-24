# reviewplus.io

De hoofdsite van Review Plus, nagebouwd van de Framer-site (Fizens-template) in Astro, net als de shop (`AIOPLUS/reviewplus-shop`). Statisch, gehost op GitHub Pages.

## Pagina's

| URL | Bestand |
|---|---|
| `/` | `src/pages/index.astro` |
| `/features` (Het product) | `src/pages/features.astro` |
| `/plans` (Prijzen) | `src/pages/plans.astro` |
| `/about` (Over ons) | `src/pages/about.astro` |
| `/contact` | `src/pages/contact.astro` |
| `/articles` (Kennisbank) | `src/pages/articles/` + `src/content/articles/*.md` |
| `/aanmelden` (Plan afsluiten) + `/welkom` | `src/pages/aanmelden.astro`, `src/pages/welkom.astro` |
| `/jobs` (Vacatures) | `src/pages/jobs/` + `src/content/jobs/*.md` |
| `/voor/<branche>` | `src/pages/voor/[sector].astro` + `src/content/sectors/*.md` |
| `/privacy-policy`, `/term-and-conditions` | `src/content/legal/*.md` |

De URL's zijn gelijk aan de Framer-site, zodat posities in Google behouden blijven. Template-pagina's van Framer (`/overview`, `/changelog`, `/download`, `/integration/*`, `/team-member/*`, de oude `/jobs/*`-voorbeelden en de Engelse voorbeeldartikelen) bestaan niet meer en geven een 404.

## Teksten aanpassen

- Teksten van home, functies, FAQ, cijfers en prijzen: `src/config/content.ts`
- Menu en footer: `src/config/brand.ts`
- Nieuw kennisbankartikel: maak `src/content/articles/<slug>.md` (velden: zie `src/content.config.ts`)
- Nieuwe branche: kopieer een bestand in `src/content/sectors/`
- Nieuwe vacature: kopieer een bestand in `src/content/jobs/` (velden: zie `src/content.config.ts`)

## Vacatures (`/jobs`)

- `concept: true`: alleen zichtbaar op de testversie, met een gele conceptbalk. Zet op `false` om te publiceren.
- `gesloten: true`: de pagina blijft bestaan, maar solliciteren kan niet meer. Of verwijder het bestand.
- `geldigTot`: tot wanneer de vacature openstaat. Google for Jobs gebruikt deze datum; verleng hem als de vacature langer loopt.
- Gepubliceerde, open vacatures krijgen automatisch JobPosting-gegevens voor Google for Jobs (standplaats Rotterdam, hybride). Salaris: `salarisTekst` (nu "Passend bij kennis en ervaring") of bedragen via `salaris`; alleen bedragen gaan mee naar Google.
- Sollicitaties gaan via het formulier naar het Make-scenario (`request_type: sollicitatie`). Je krijgt een mail op support@ waarop je direct de kandidaat antwoordt. De kandidaat krijgt een bevestiging en kan daarop zijn cv als bijlage terugsturen.
- Bewaartermijn: verwijder sollicitaties uiterlijk 4 weken na afloop van de procedure, of maximaal 1 jaar als de kandidaat daar toestemming voor geeft (staat ook in de privacyverklaring).

## Plan online afsluiten (`/aanmelden`)

- De knoppen op `/plans` gaan naar `/aanmelden?plan=<1-jaar|2-jaar|3-jaar>&facturering=<maand|jaar>`.
- De klant kiest plan en facturering, vult bedrijfs- en contactgegevens in en geeft akkoord op de algemene voorwaarden (de versie = `ingangsdatum` in `src/content/legal/algemene-voorwaarden.md`) en op zijn bevoegdheid.
- Het formulier gaat naar het Make-scenario (`request_type: abonnement`, route 5d). Make rekent de prijs zelf opnieuw uit: **wijzig je prijzen in `src/config/content.ts`, pas ze dan ook aan in Make (module 121)**.
- Make maakt bedrijf, contact en een deal in fase "Offerte Getekend" aan in Teamleader, met taken voor de eerste factuur en het welkomstpakket, maakt het account op app.reviewplus.io aan (EmbedMyReviews Agency API) en stuurt een mail aan jou en een bevestiging aan de klant.
- Account aanmaken werkt pas als in de Make-datastore `shop_data` de records `config:emr_token` (Agency API-token, veld `waarde`) en `config:emr_plan` (ID van het plan in EmbedMyReviews) bestaan. Zonder die records meldt de mail aan jou dat het account handmatig moet.
- Onboarding-afspraak: zet de Teamleader-bookinglink in `brand.onboardingBookingUrl` (`src/config/brand.ts`). Leeg = "we nemen contact op".

## Lokaal

```bash
npm install
npm run dev      # http://localhost:4321
npm run check    # typecheck + lint + build + linkcheck
```

## Variabelen (GitHub → Settings → Secrets and variables → Actions → Variables)

| Naam | Testversie | Live |
|---|---|---|
| `SITE_URL` | leeg (= `https://aioplus.github.io`) | `https://reviewplus.io` |
| `BASE_PATH` | leeg (= `/reviewplus-site`) | `/` |
| `PUBLIC_LEAD_WEBHOOK_URL` | Make-webhook (zelfde als de shop) | idem |
| `PUBLIC_TURNSTILE_SITE_KEY` | zelfde site key als de shop | idem |
| `PUBLIC_ANALYTICS_PROVIDER` / `PUBLIC_UMAMI_WEBSITE_ID` | leeg | Umami |
| `PUBLIC_META_PIXEL_ID`, `PUBLIC_GADS_ID`, `PUBLIC_GADS_CONVERSION_LABEL` | leeg | als je advertenties draait |

De testversie staat op `https://aioplus.github.io/reviewplus-site` en wordt niet geïndexeerd (`robots.txt` blokkeert alles zolang `BASE_PATH` niet `/` is).

## Overstappen van Framer naar deze site

1. Cloudflare Turnstile: voeg `reviewplus.io` en `www.reviewplus.io` toe als hostname van het widget.
2. GitHub-variabelen: `SITE_URL=https://reviewplus.io`, `BASE_PATH=/`.
3. Maak `public/CNAME` met `reviewplus.io`, commit en push.
4. GitHub → Settings → Pages → Custom domain `reviewplus.io` → Enforce HTTPS (zodra het certificaat er is).
5. DNS bij je domeinbeheer: A-records van `reviewplus.io` naar GitHub Pages (185.199.108.153, .109.153, .110.153, .111.153) en `www` als CNAME naar `aioplus.github.io`. Haal de Framer-records weg.
6. Controleer de site, dien de sitemap in bij Google Search Console en zeg daarna het Framer-abonnement op.

Terug naar Framer kan door de DNS-records terug te zetten.

## Foto's

Eigen beelden van de Framer-site staan in `src/assets/img/`. Deze branchefoto's komen van Unsplash (gratis, ook commercieel, naamsvermelding niet verplicht; https://unsplash.com/license):

| Bestand | Unsplash-foto |
|---|---|
| `foto-hotel.jpg` | https://unsplash.com/photos/man-in-black-shirt-standing-beside-counter-yIcm3DWRz-c |
| `foto-winkel.jpg` | https://unsplash.com/photos/woman-leaning-on-pink-desk-IxgPCAUSaOM |
| `foto-zorg.jpg` | https://unsplash.com/photos/man-in-white-dress-shirt-sitting-on-black-office-rolling-chair-QA9fRIi6sFw |
| `foto-sportschool.jpg` | https://unsplash.com/photos/a-man-and-woman-exercising-wSUlQl8HPYc |
| `foto-franchise.jpg` | https://unsplash.com/photos/two-grocery-store-employees-smiling-at-the-camera-2oBnIuO9wv4 |
| `foto-vrije-tijd.jpg` | https://images.unsplash.com/photo-1558271697-dd9f331ca8b3 (arcadekasten) |

## Nog te doen (Jordan)

- `src/pages/about.astro`: eigen verhaal toevoegen (wie, waarom, waar gevestigd).
- `src/config/content.ts`: controleren of alle functies in alle drie de plannen zitten (vergelijkingstabel).
- `src/config/brand.ts`: echte social-media-profielen en juridische naam invullen.
- Cijfers op de site (900+ bedrijven, 220 uur, 15%, 28%) komen van de oude site; zorg dat je ze kunt onderbouwen.
- Logo's van klanten (KFC, Domino's, Subway) alleen gebruiken met toestemming.
