# Startprompt: website View Plus

Kopieer alles onder de streep naar een nieuwe chat in Claude Code, met als werkmap `C:\Users\jorda\.claude\projects`.

---

Je gaat de website van **View Plus** bouwen, het zustermerk van **Review Plus**. De site wordt vrijwel identiek aan de nieuwe Review Plus-site, maar met eigen branding, teksten en foto's. Werk in het Nederlands met me (Jordan, support@reviewplus.io). Ik ben geen developer: leg keuzes kort en in gewone taal uit.

## Wat er al staat

Het overzicht van alle projecten, Make, Teamleader, DNS, werkafspraken en lessen staat in `C:\Users\jorda\.claude\projects\CLAUDE.md`. Claude Code leest dat automatisch; volg het. Lees daarnaast `reviewplus-site/README.md`: daar staan de structuur, de variabelen, de overstapstappen van Framer en de fotocredits.

De Review Plus-site (`reviewplus-site`) is sinds 25-09-2026 live op https://www.reviewplus.io en is de basis voor View Plus.
- **Configuratie**:
  - `src/config/brand.ts`: naam, links, menu, footer;
  - `src/config/site.ts`: SITE_URL, BASE_PATH, formulieren, analytics;
  - `src/config/content.ts`: teksten, FAQ, plannen, logo's;
  - `src/styles/tokens.css`: kleuren, lettertype, radius, breakpoints;
  - `src/components/layout/Logo.astro`.
- **Beelden**: `src/assets/img/`.
- **Content**: `src/content/{sectors,articles,jobs,legal}/`.
- **Favicons en OG-beelden**: `public/`.

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

**Domeinen van View Plus** (DNS bij GoDaddy):
- **www.viewplus.io**: de site, deze opdracht.
- **shop.viewplus.io**: webshop waarin View Plus reseller wordt van o.a. [Smiirl](https://www.smiirl.com/en/discover/instagram/5d/)-tellers (live volgers/likes-teller) en andere tools. Die bouwen we **na** de site, als aparte repo op basis van `review plus shop`. Vraag dan eerst de details: productlijst, inkoop- en verkoopprijzen, levering (dropship of voorraad), betaling (Mollie), retourbeleid en de voorwaarden van het resellerschap. Gebruik productfoto's en merknamen van leveranciers alleen met hun toestemming.
- **app.viewplus.io**: eigen app, zelf te bouwen (geen white-label leverancier), later. Houd er nu alleen rekening mee in menu en footer (bijvoorbeeld een "Inloggen"-link pas zodra de app er is).

Zet in de site alvast een plek voor de shop klaar (menu-item "Shop" dat pas zichtbaar wordt als `brand.shopUrl` gevuld is), net zoals de Review Plus-site naar shop.reviewplus.io linkt.

## Stap 1: vraag mij eerst (met AskUserQuestion, gebundeld)

Verzin niets over View Plus. Vraag in één keer wat nodig is en wat je niet uit bestaand materiaal kunt halen:

1. **Aanbod**: klopt het beeld hierboven? Zijn er meer diensten (andere platformen dan Instagram, zoals TikTok, Facebook of LinkedIn; video; websitebeelden), pakketten of looptijden? Is € 75 per week exclusief btw? Welke doelgroepen naast horeca? Is er een bestaande site of social-mediaprofiel om beelden van over te nemen?
2. **Branding**: logo en kleuren zijn bekend (zie hierboven). Houden we Poppins als lettertype, en welke tone of voice?
3. **E-mailadres** voor contact en formulieren (domein www.viewplus.io, DNS bij GoDaddy).
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

## Werkafspraken en lessen

Staan in `projects/CLAUDE.md` en gelden hier ook. Aanvullend voor View Plus: wijzig de Review Plus-repo's en -scenario's niet, tenzij ik erom vraag of het nodig is voor gedeelde formulieren (optie a). Meld dat dan vooraf. Commit en push naar `main` van de nieuwe repo. Voeg de View Plus-regel in de projecttabel van `projects/CLAUDE.md` toe zodra de repo bestaat.
