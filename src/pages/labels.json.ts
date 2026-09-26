import type { APIRoute } from 'astro';
import data from '@/data/labels.json';

/** Centrale labellijst van AIO Plus; de shop en andere labelsites lezen deze bij het bouwen. */
export const GET: APIRoute = () =>
  new Response(JSON.stringify({ labels: data.labels, bundel: data.bundel }, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
