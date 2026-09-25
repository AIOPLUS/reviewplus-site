# KvK-zoekproxy (Cloudflare Worker)

Zorgt voor de **KvK-autofill** in het aanmeldformulier van reviewplus.io (`/aanmelden`) en het aanvraagformulier van de shop (`shop.reviewplus.io/aanvragen`). De bezoeker typt een bedrijfsnaam of KvK-nummer, kiest zijn bedrijf, en bedrijfsnaam, KvK-nummer en adres worden ingevuld.

Waarom een Worker: de KvK-API-sleutel mag niet in de browser staan. De Worker bewaart de sleutel als geheim, laat alleen onze eigen websites toe en onthoudt zoekresultaten een dag (scheelt aanroepen).

## Kosten

- **KvK**: Handelsregister Zoeken is gratis per zoekvraag. Voor een API-sleutel (abonnement) rekent KvK € 6,40 per maand. Zie developers.kvk.nl.
- **Cloudflare Workers**: gratis tot 100.000 aanroepen per dag.

## Eenmalig instellen (Jordan)

1. **KvK-sleutel aanvragen** op https://developers.kvk.nl/nl/apis (API: Handelsregister Zoeken). Na goedkeuring krijg je een API-sleutel.
2. **Worker online zetten** (in een terminal, in deze map `workers/kvk-zoeken`):
   ```bash
   npx wrangler login
   ```
   ```bash
   npx wrangler secret put KVK_API_KEY
   ```
   Plak bij de vraag de KvK-sleutel. Die komt alleen in Cloudflare te staan, niet in de code.
   ```bash
   npx wrangler deploy
   ```
   Wrangler toont daarna de URL van de Worker, bijvoorbeeld `https://reviewplus-kvk.<jouw-subdomein>.workers.dev`.
3. **URL instellen in GitHub** (repo's `AIOPLUS/reviewplus-site` en `AIOPLUS/reviewplus-shop`): Settings → Secrets and variables → Actions → Variables → `PUBLIC_KVK_PROXY_URL` = de Worker-URL. Daarna een nieuwe deploy starten (of een kleine commit pushen).

Zonder `PUBLIC_KVK_PROXY_URL` werken de formulieren gewoon zoals nu, zonder autofill.

## Instellingen (`wrangler.toml`)

- `KVK_BASE`: productie `https://api.kvk.nl/api/v2`. Om eerst te testen kan de testomgeving van KvK (`https://api.kvk.nl/test/api/v2`, met de testsleutel uit de KvK-documentatie; die geeft alleen fictieve testbedrijven).
- `ALLOWED_ORIGINS`: websites die de Worker mogen aanroepen. Voeg een domein toe als de site verhuist (bijvoorbeeld www.viewplus.io).

## Testen

```bash
node --test workers/kvk-zoeken/test.mjs
```

(vanuit de hoofdmap van reviewplus-site). De tests bootsen KvK en Cloudflare na; er is geen echte sleutel voor nodig.

## Hoe het werkt

- `GET /?q=<zoekterm>`: 8 cijfers = zoeken op KvK-nummer, anders op naam (minimaal 3 tekens). Alleen hoofd- en nevenvestigingen.
- Antwoord: `{ "resultaten": [{ kvkNummer, vestigingsnummer, naam, type, straat, huisnummer, huisletter, postcode, plaats }] }`.
- Veldnamen volgens de officiële specificatie van de KvK Zoeken API v2 (`api_zoeken.yaml`).
