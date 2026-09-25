# Startprompt: website View Plus

Kopieer alles onder de streep naar een nieuwe chat in Claude Code, met als werkmap `C:\Users\jorda\.claude\projects`.

---

Je gaat de website van **View Plus** bouwen, het zustermerk van **Review Plus**. De site wordt vrijwel identiek aan de nieuwe Review Plus-site, maar met eigen branding, teksten en foto's. Werk in het Nederlands met me (Jordan, support@reviewplus.io). Ik ben geen developer: leg keuzes kort en in gewone taal uit.

## Wat er al staat (Review Plus)

- **Hoofdsite Review Plus**: repo `AIOPLUS/reviewplus-site`, lokaal `C:\Users\jorda\.claude\projects\reviewplus-site`. Astro 7 + Tailwind 4, statisch, GitHub Pages via GitHub Actions. Testversie: https://aioplus.github.io/reviewplus-site (nog niet live op reviewplus.io; Framer draait daar nog).
  - Pagina's: home, `/features`, `/plans` (prijzen), `/aanmelden` + `/welkom` (plan online afsluiten, met akkoord op de voorwaarden en 21% btw), `/about`, `/contact`, `/articles` (Kennisbank, 4 artikelen), `/jobs` (vacatures met sollicitatieformulier), `/voor/<branche>` (10 sectorpagina's), `/privacy-policy`, `/term-and-conditions`, `404`, `robots.txt`, `llms.txt`, sitemap.
  - Configuratie: `src/config/brand.ts` (naam, links, menu, footer), `src/config/site.ts` (SITE_URL, BASE_PATH, formulieren, analytics, pixels), `src/config/content.ts` (teksten, functies, FAQ, plannen, logo's), `src/styles/tokens.css` (kleuren, lettertype, radius, breakpoints), `src/components/layout/Logo.astro`, beelden in `src/assets/img/`, content in `src/content/{sectors,articles,jobs,legal}/`, favicons en OG-beelden in `public/`.
  - Lees eerst `README.md` van reviewplus-site: daar staan de structuur, de variabelen, de overstapstappen en de fotocredits.
- **Shop Review Plus**: repo `AIOPLUS/reviewplus-shop`, lokaal `C:\Users\jorda\.claude\projects\review plus shop`, live op shop.reviewplus.io. De Make-documentatie staat in `docs/MAKE-SCENARIO.md`.
- **Automatisering (Make.com, eu1, team 2918043, GRATIS plan: max. 2 actieve scenario's, 1.000 operaties/maand, datastore 1 MB)**:
  - Scenario 7570648 "Review Plus - Shop aanvragen": één webhook voor alle formulieren van shop en site (`request_type`: aanvraag, nieuwsbrief, contact, sollicitatie, abonnement), met Cloudflare Turnstile-controle, Teamleader, Gmail en de Agency API van EmbedMyReviews.
  - Scenario 7583249 "Dagelijks (demo's en herinneringen)".
  - Beide actieve plekken zijn dus bezet.
- Andere diensten: Teamleader Focus (CRM, Sales Pipeline), Gmail via Google Workspace (support@reviewplus.io), Cloudflare Turnstile, Umami Cloud (analytics), Mollie, EmbedMyReviews (white label achter app.reviewplus.io), GitHub (org AIOPLUS). Het Fizens-template van Framer is betaald en mag gebruikt worden.

## Wat we al weten over View Plus

Het merkmateriaal staat in `C:\Users\jorda\.claude\projects\viewplus-brand\`:
- `logo-icoon.webp`: het beeldmerk, 1915×2000, transparant;
- `logo-met-woordmerk.png`: logo en woordmerk op een A4-pagina; uitsnijden nodig;
- `brochure-pagina-1.png`: de eerste brochurepagina als afbeelding;
- `View Plus - Brochure.pdf`: de volledige brochure. De tekst is gecodeerd; bekijk de PNG of render de pagina's.

- **Logo**: hetzelfde beeldmerk als Review Plus (vier vlakken, links twee kwartcirkels), maar in **paars**. Woordmerk: **"View"** vet + **"Plus"** regular, in hetzelfde paars. Maak er een SVG van: een variant van `src/components/layout/Logo.astro`, plus een favicon en OG-beelden.
- **Kleuren** (gemeten): beeldmerk **#7A01B0**, woordmerk **#8000B0**, lichtpaarse vlakken **#F7E7FD**, tekst bijna zwart (#150E08). Bouw er een paarse schaal van in `tokens.css` (50–900) in plaats van het blauw van Review Plus. Controleer het contrast, WCAG AA.
- **Wat View Plus doet**: social media management, professionele fotografie en content voor lokale ondernemers, met als eerste doelgroep de horeca. Slogan in de brochure: **"Van Concept naar Content. Vergroot je online zichtbaarheid."** Drie pijlers: **Fotografie** (beelden die de sfeer en uitstraling vastleggen), **Content** (content die jouw zaak online tot leven brengt) en **Engagement** (actieve interactie met jouw doelgroep). Ondertitel: "Professionele fotografie, sterke content en actief beheer."
- **Social media management: € 75 per week** (vraag of dit exclusief btw is). Daarbij hoort:
  - een contentkalender vooraf;
  - drie vaste contentpijlers, samen bepaald;
  - 2 tot 3 posts per week, inclusief captions en hashtags;
  - inspelen op actualiteit en lokale gebeurtenissen;
  - reageren op alle reacties;
  - actief interactie zoeken met relevante accounts.
  Het doel is meer bereik, de juiste doelgroep en meer betrokkenheid.
- **Fotografie: shootdag € 475 exclusief btw.** Ongeveer 2 uur, circa 40 bewerkte foto's, vrij te gebruiken voor Instagram én de website. Eén shootdag is genoeg voor 2 tot 3 maanden content; opnieuw fotograferen bij bijvoorbeeld een nieuwe (seizoens)kaart. Ook grafische elementen in de posts voor een herkenbare stijl.
- **Uitbreidingen**: videomateriaal, en een reviewsysteem voor meer Google-reviews. Dat laatste is een natuurlijke link naar Review Plus; verwijs daar op de site naar.
- **Let op**: de brochure is een voorstel voor één klant, het Italiaanse restaurant Segugio in Amsterdam. Gebruik die naam, hun Instagram en foto's **niet** op de site zonder toestemming van Jordan. Schrijf de teksten algemeen, voor "jouw zaak".
- **Gevolgen voor de site**: de Review Plus-opzet (softwareplannen van 1/2/3 jaar, NFC-welkomstpakket, EmbedMyReviews-account) past niet één op één. Stel een passende opzet voor, bijvoorbeeld:
  - een prijspagina met "Social media management vanaf € 75 per week" en "Shootdag € 475";
  - een aanvraag- of offerteformulier in plaats van direct online afsluiten;
  - een portfolio- of werkpagina.
  Laat mij kiezen voordat je bouwt.

## Doel

Een nieuwe repo `AIOPLUS/viewplus-site` op basis van reviewplus-site, met View Plus-branding, eerst op een testversie (`https://aioplus.github.io/viewplus-site`) en daarna live op **https://www.viewplus.io**. De `www`-versie is het hoofdadres; `viewplus.io` zonder www stuurt door naar www. Bij GitHub Pages: custom domain `www.viewplus.io`, en voor het kale domein de A-records van GitHub Pages, zodat GitHub zelf doorstuurt.

## Stap 1: vraag mij eerst (met AskUserQuestion, gebundeld)

Verzin niets over View Plus. Vraag in één keer wat nodig is en wat je niet uit bestaand materiaal kunt halen:

1. **Aanbod**: klopt het beeld hierboven? Zijn er meer diensten (andere platformen dan Instagram, zoals TikTok, Facebook of LinkedIn; video; websitebeelden), pakketten of looptijden? Is € 75 per week exclusief btw? Welke doelgroepen naast horeca? Is er een bestaande site of social-mediaprofiel om beelden van over te nemen?
2. **Branding**: logo en kleuren zijn bekend (zie hierboven). Houden we Poppins als lettertype, en welke tone of voice?
3. **E-mailadres** voor contact en formulieren (het domein is al bekend: www.viewplus.io). Waar wordt het domein beheerd (voor de DNS-stappen later)?
4. **Pagina's**: welke van de Review Plus-pagina's blijven: prijzen/plannen + online afsluiten, Kennisbank, vacatures, sectorpagina's (welke branches), Over ons? Komt er ook een shop?
5. **Prijzen**: kloppen € 75 per week (social media management) en € 475 per shootdag, exclusief btw? Is er een minimale looptijd, opzegtermijn of pakketkorting? Mogen de prijzen op de site staan, of liever "vanaf" en een offerte?
6. **Foto's**: juist voor een fotografiedienst tellen eigen beelden. Welk eigen werk mag ik gebruiken, en van welke klanten heb je toestemming? Anders tijdelijk passende Unsplash-foto's, duidelijk als voorbeeld, met de afspraak dat die vervangen worden.
7. **Formulieren en automatisering** (belangrijk vanwege het gratis Make-plan):
   - (a) Via het bestaande scenario 7570648, met een extra veld `merk: "viewplus"` en eigen routes en mailteksten. Geen extra scenario nodig; verbruikt wel operaties van hetzelfde tegoed.
   - (b) Een eigen scenario voor View Plus. Vereist een betaald Make-plan.
   - Ook: welke Teamleader-pipeline of -fase, en is er een eigen account, zoals EmbedMyReviews?
8. **Juridisch**: eigen algemene voorwaarden en privacyverklaring voor View Plus, of dezelfde entiteit als Review Plus? Juridische naam en KvK.
9. **Analytics en consent**: een nieuwe Umami-website voor View Plus (ik heb het website-ID nodig) en dezelfde cookiebanner.

## Stap 2: bouwen

1. Kopieer reviewplus-site naar `C:\Users\jorda\.claude\projects\viewplus-site`, zonder `.git`, `node_modules` en `dist`. Begin met een schone git-geschiedenis en maak de repo `AIOPLUS/viewplus-site` aan met de gh CLI (`"C:\Program Files\GitHub CLI\gh.exe"`, via PowerShell).
2. Pas de branding centraal aan: `brand.ts`, `site.ts`, `content.ts`, `tokens.css`, `Logo.astro`, favicons en OG-beelden in `public/`, `astro.config.mjs` (standaard SITE_URL `https://www.viewplus.io`), `package.json` (naam), `README.md`.
3. Zoek daarna overal op `Review Plus`, `reviewplus`, `revw`, `review` en `EmbedMyReviews`, en herschrijf alles wat over reviews gaat naar het verhaal van View Plus: teksten, FAQ, schema.org, `llms.txt`, meta-titels en -beschrijvingen, mails in formulieren, sectorpagina's en Kennisbank. Verwijder of herschrijf de 4 Review Plus-artikelen en de vacatures als die niet passen; publiceer niets wat inhoudelijk niet klopt voor View Plus.
4. Vervang alle foto's en werk de fotocredits in de README bij. Unsplash-foto's alleen via de officiële Unsplash-pagina, en klik geen cookiebanners weg behalve met de privacyvriendelijkste keuze.
5. Formulieren: zet `request_type` en een `merk`-veld in de payloads. Pas Make pas aan nadat ik de optie uit vraag 7 heb gekozen.
6. GitHub: Actions-workflow voor Pages. Zet repo-variabelen: `SITE_URL` leeg en `BASE_PATH` `/viewplus-site` voor de test, plus `PUBLIC_LEAD_WEBHOOK_URL` en `PUBLIC_TURNSTILE_SITE_KEY`. De Turnstile-hostnames (`aioplus.github.io`, later `www.viewplus.io` en `viewplus.io`) voeg ik zelf toe in Cloudflare; geef me de exacte stappen.
7. Controleer:
   - `npm run check` (typecheck, lint, build, linkcheck), ook met `BASE_PATH=/viewplus-site`;
   - Lighthouse op home, prijzen en contact (doel: toegankelijkheid 100, SEO 100 behalve bewust niet-geïndexeerde pagina's);
   - mobiel (375px) zonder horizontaal scrollen;
   - de desktopkolommen.

## Lessen van Review Plus (voorkom dezelfde fouten)

- **Tailwind 4**: zet alle breakpoints in px (sm 640, md 810, lg 1200, xl 1440, 2xl 1536). Gemengde rem/px zet Tailwind in de verkeerde volgorde.
- **Git Bash op Windows** verandert `/viewplus-site` in een Windows-pad: gebruik `export MSYS_NO_PATHCONV=1` bij lokale builds met BASE_PATH.
- **Astro 7** gebruikt standaard Sätteri voor Markdown: remark- en rehype-plugins werken niet zonder `@astrojs/markdown-remark`. Gebruik in Markdown **relatieve links** (`../plans`, `andere-slug`), dan werken ze op de testversie en live. Het linkcheck-script rekent relatieve links met BASE_PATH.
- Nieuwe content-collection niet zichtbaar in dev: herstart met `astro dev --force`. YAML-waarden met `: ` erin tussen aanhalingstekens zetten.
- Merklogo's via `@iconify-json/simple-icons` en `@iconify-json/logos` (`src/lib/icons.ts`); woordmerken krijgen de vlag `woordmerk`.
- Contrast: decoratieve tekst als SVG, roze badge `text-pink-800`.
- GitHub Pages-cache: controleer live met `?v=<nummer>` en wacht op de juiste deploy-run (`gh run list`, dan `gh run watch <id>`).
- Heredocs met apostroffen in Bash breken: schrijf scripts met de Write-tool naar de scratchpad en voer ze daarna uit.
- **Make**:
  - `scenarios_update` vervangt de hele blueprint. Haal hem altijd eerst vers op, wijzig via een script en vergelijk na de update wat live staat met je versie.
  - Geen `\"` in formules: gebruik regex `/[\x22\x5C]/g`.
  - `get(first(x); "id")` in plaats van `first(x).id`.
  - In filters telt "notexist" een lege string ook als niet bestaand.
  - HTTP v3 heeft de volledige geavanceerde mapper nodig.
  - Teamleader createContact en createCompany hebben een `addresses`-blok nodig.
  - Variabelen in dezelfde SetVariables-module kunnen elkaar niet gebruiken: gebruik een tweede module.
- **Turnstile** in het browserpaneel van Claude toont vaak "Ik ben geen robot". Claude mag dat niet aanvinken: laat mij testformulieren in mijn eigen browser versturen en controleer daarna de runs in Make (`executions_list`).

## Werkafspraken (niet onderhandelbaar)

- Voer nooit wachtwoorden, API-sleutels of tokens in, en lees geheimen niet uit, zoals datastore-records `config:turnstile` en `config:emr_token`. Maak lege records klaar; ik plak de waarde zelf.
- Definitief verwijderen (Teamleader-records, klanten, repo's) doe ik zelf. Geef me de links.
- Vraag toestemming voordat je formulieren verstuurt, berichten verstuurt, webhooks registreert of accountinstellingen wijzigt. Testdata duidelijk als TEST markeren.
- Wijzig de Review Plus-repo's en -scenario's niet, tenzij ik erom vraag of het nodig is voor gedeelde formulieren (optie a). Meld dat dan vooraf.
- Commit met duidelijke Nederlandse berichten en push naar de branch `main` van de nieuwe repo.
- Sluit elke stap af met wat er af is, wat getest is (en hoe) en wat ik nog moet doen.
