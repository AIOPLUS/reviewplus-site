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
| `/voor/<branche>` | `src/pages/voor/[sector].astro` + `src/content/sectors/*.md` |
| `/privacy-policy`, `/term-and-conditions` | `src/content/legal/*.md` |

De URL's zijn gelijk aan de Framer-site, zodat posities in Google behouden blijven. Template-pagina's van Framer (`/overview`, `/changelog`, `/download`, `/integration/*`, `/team-member/*`, `/jobs/*` en de Engelse voorbeeldartikelen) bestaan niet meer en geven een 404.

## Teksten aanpassen

- Teksten van home, functies, FAQ, cijfers en prijzen: `src/config/content.ts`
- Menu en footer: `src/config/brand.ts`
- Nieuw kennisbankartikel: maak `src/content/articles/<slug>.md` (velden: zie `src/content.config.ts`)
- Nieuwe branche: kopieer een bestand in `src/content/sectors/`

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
| `foto-vrije-tijd.jpg` | https://images.unsplash.com/photo-1558271697-dd9f331ca8b3 (arcadekasten) |

## Nog te doen (Jordan)

- `src/pages/about.astro`: eigen verhaal toevoegen (wie, waarom, waar gevestigd).
- `src/config/content.ts`: controleren of alle functies in alle drie de plannen zitten (vergelijkingstabel).
- `src/config/brand.ts`: echte social-media-profielen en juridische naam invullen.
- Cijfers op de site (900+ bedrijven, 220 uur, 15%, 28%) komen van de oude site; zorg dat je ze kunt onderbouwen.
- Logo's van klanten (KFC, Domino's, Subway) alleen gebruiken met toestemming.
