/**
 * KvK-zoekproxy voor de formulieren van reviewplus.io en shop.reviewplus.io.
 *
 * Waarom een proxy: de KvK-API-sleutel mag niet in de browser staan, en de KvK-API is niet bedoeld
 * voor directe aanroepen vanaf websites. Deze Worker bewaart de sleutel als geheim (KVK_API_KEY),
 * laat alleen onze eigen domeinen toe (ALLOWED_ORIGINS) en cachet resultaten een dag.
 *
 * Gebruik: GET /?q=<bedrijfsnaam of 8-cijferig KvK-nummer>
 * Antwoord: { resultaten: [{ kvkNummer, vestigingsnummer, naam, type, straat, huisnummer, huisletter, postcode, plaats }] }
 */
import { bouwKvkUrl, naarResultaten } from './kvk.js';

const CACHE_SECONDEN = 60 * 60 * 24;

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function json(body, status, origin, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...(origin ? corsHeaders(origin) : {}), ...extra },
  });
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin') ?? '';
    const toegestaan = (env.ALLOWED_ORIGINS ?? '').split(',').map((s) => s.trim()).filter(Boolean);
    const originOk = toegestaan.includes(origin);

    if (request.method === 'OPTIONS') {
      return originOk ? new Response(null, { status: 204, headers: corsHeaders(origin) }) : new Response(null, { status: 403 });
    }
    if (request.method !== 'GET') return json({ fout: 'Alleen GET' }, 405, originOk ? origin : '');
    if (!originOk) return json({ fout: 'Niet toegestaan' }, 403, '');
    if (!env.KVK_API_KEY) return json({ fout: 'KvK-sleutel ontbreekt' }, 503, origin);

    const q = (new URL(request.url).searchParams.get('q') ?? '').trim().slice(0, 80);
    const kvkUrl = bouwKvkUrl(env.KVK_BASE ?? 'https://api.kvk.nl/api/v2', q);
    if (!kvkUrl) return json({ resultaten: [] }, 200, origin);

    // Cache per zoekterm (de sleutel zit niet in de cache-sleutel)
    const cache = caches.default;
    const cacheKey = new Request(`https://kvk-cache.invalid/?u=${encodeURIComponent(kvkUrl)}`);
    const hit = await cache.match(cacheKey);
    if (hit) return json(await hit.json(), 200, origin, { 'X-Cache': 'HIT' });

    let body;
    try {
      const res = await fetch(kvkUrl, { headers: { apikey: env.KVK_API_KEY, Accept: 'application/json' } });
      if (res.status === 404) body = { resultaten: [] }; // KvK geeft 404 bij "geen resultaten"
      else if (!res.ok) return json({ fout: `KvK gaf status ${res.status}` }, 502, origin);
      else body = { resultaten: naarResultaten(await res.json()) };
    } catch {
      return json({ fout: 'KvK niet bereikbaar' }, 502, origin);
    }

    ctx.waitUntil(cache.put(cacheKey, new Response(JSON.stringify(body), { headers: { 'Cache-Control': `public, max-age=${CACHE_SECONDEN}` } })));
    return json(body, 200, origin, { 'Cache-Control': 'public, max-age=3600', 'X-Cache': 'MISS' });
  },
};
