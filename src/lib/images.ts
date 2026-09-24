import type { ImageMetadata } from 'astro';

const all = import.meta.glob<{ default: ImageMetadata }>('/src/assets/img/*.{png,jpg,jpeg,webp,svg}', { eager: true });

/** Afbeelding uit src/assets/img op bestandsnaam (voor content-bestanden die een foto noemen). */
export function img(name: string): ImageMetadata {
  const hit = all[`/src/assets/img/${name}`];
  if (!hit) throw new Error(`Afbeelding niet gevonden: src/assets/img/${name}`);
  return hit.default;
}
