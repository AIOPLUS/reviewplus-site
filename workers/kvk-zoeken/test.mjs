// Test zonder Cloudflare en zonder echte KvK-sleutel: node --test workers/kvk-zoeken/test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bouwKvkUrl, naarResultaten } from './src/kvk.js';
import worker from './src/index.js';

const voorbeeld = {
  pagina: 1, resultatenPerPagina: 10, totaal: 2,
  resultaten: [
    { kvkNummer: '12345678', vestigingsnummer: '000012345678', naam: 'Bakkerij De Test', type: 'hoofdvestiging',
      adres: { binnenlandsAdres: { type: 'bezoekadres', straatnaam: 'Teststraat', huisnummer: 12, huisletter: 'A', postcode: '3011AA', plaats: 'Rotterdam' } } },
    { kvkNummer: '87654321', naam: 'Zonder Adres BV', type: 'rechtspersoon' },
    { kvkNummer: '12345678', vestigingsnummer: '000012345678', naam: 'Bakkerij De Test', type: 'hoofdvestiging' },
  ],
};

test('bouwKvkUrl: KvK-nummer, naam en te kort', () => {
  assert.match(bouwKvkUrl('https://api.kvk.nl/api/v2', '1234 5678'), /zoeken\?kvkNummer=12345678&type=hoofdvestiging&type=nevenvestiging&resultatenPerPagina=10$/);
  assert.match(bouwKvkUrl('https://api.kvk.nl/api/v2/', 'Bakkerij'), /\/api\/v2\/zoeken\?naam=Bakkerij&/);
  assert.equal(bouwKvkUrl('x', 'ab'), null);
  assert.match(bouwKvkUrl('x', 'Café 1234'), /naam=Caf%C3%A9\+1234/);
});

test('naarResultaten: adres, ontbrekend adres en dubbelen', () => {
  const r = naarResultaten(voorbeeld);
  assert.equal(r.length, 2);
  assert.deepEqual(r[0], { kvkNummer: '12345678', vestigingsnummer: '000012345678', naam: 'Bakkerij De Test', type: 'hoofdvestiging', straat: 'Teststraat', huisnummer: '12', huisletter: 'A', postcode: '3011AA', plaats: 'Rotterdam' });
  assert.equal(r[1].straat, '');
  assert.deepEqual(naarResultaten(null), []);
});

// Nagebootste Cloudflare-omgeving
const cacheMap = new Map();
globalThis.caches = { default: { match: async (req) => cacheMap.get(req.url)?.clone(), put: async (req, res) => { cacheMap.set(req.url, res); } } };
const env = { KVK_API_KEY: 'test-sleutel', KVK_BASE: 'https://kvk.example/api/v2', ALLOWED_ORIGINS: 'https://reviewplus.io,https://shop.reviewplus.io' };
const ctx = { waitUntil: (p) => p };
let aanroepen = [];
globalThis.fetch = async (url, init) => {
  aanroepen.push({ url: String(url), apikey: init?.headers?.apikey });
  if (String(url).includes('naam=Onbekend')) return new Response('{}', { status: 404 });
  return new Response(JSON.stringify(voorbeeld), { status: 200 });
};
const req = (q, origin = 'https://reviewplus.io', method = 'GET') => new Request(`https://worker.example/?q=${encodeURIComponent(q)}`, { method, headers: origin ? { Origin: origin } : {} });

test('worker: toegestane origin krijgt resultaten + CORS, sleutel gaat mee naar KvK', async () => {
  aanroepen = [];
  const res = await worker.fetch(req('Bakkerij'), env, ctx);
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('Access-Control-Allow-Origin'), 'https://reviewplus.io');
  const body = await res.json();
  assert.equal(body.resultaten.length, 2);
  assert.equal(aanroepen[0].apikey, 'test-sleutel');
  assert.ok(!JSON.stringify(body).includes('test-sleutel'));
});

test('worker: tweede keer uit de cache', async () => {
  aanroepen = [];
  const res = await worker.fetch(req('Bakkerij'), env, ctx);
  assert.equal(res.headers.get('X-Cache'), 'HIT');
  assert.equal(aanroepen.length, 0);
});

test('worker: vreemde origin, geen origin, POST en preflight', async () => {
  assert.equal((await worker.fetch(req('Bakkerij', 'https://evil.example'), env, ctx)).status, 403);
  assert.equal((await worker.fetch(req('Bakkerij', ''), env, ctx)).status, 403);
  assert.equal((await worker.fetch(req('Bakkerij', 'https://reviewplus.io', 'POST'), env, ctx)).status, 405);
  const pre = await worker.fetch(req('x', 'https://shop.reviewplus.io', 'OPTIONS'), env, ctx);
  assert.equal(pre.status, 204);
  assert.equal(pre.headers.get('Access-Control-Allow-Origin'), 'https://shop.reviewplus.io');
});

test('worker: geen resultaten (KvK 404), te korte term, ontbrekende sleutel', async () => {
  assert.deepEqual(await (await worker.fetch(req('Onbekend bedrijf'), env, ctx)).json(), { resultaten: [] });
  assert.deepEqual(await (await worker.fetch(req('ab'), env, ctx)).json(), { resultaten: [] });
  assert.equal((await worker.fetch(req('Bakkerij'), { ...env, KVK_API_KEY: '' }, ctx)).status, 503);
});
