import { cache } from 'react';
import { wpApi } from './woocommerce';

export interface HeroBanner {
  id: number;
  title: string;
  subtitle: string;
  button_text: string;
  link: string;
  image: string;
  order: number;
}

async function loadHeroBanners(): Promise<HeroBanner[]> {
  try {
    const { data } = await wpApi.get<HeroBanner[]>(
      '/novalis/v1/hero-banners'
    );
    return data;
  } catch {
    return [];
  }
}

/**
 * Fetches active hero banners from the custom WP REST endpoint.
 * Wrapped in React.cache() to dedupe within a single request tree.
 */
export const getHeroBanners = cache(loadHeroBanners);
