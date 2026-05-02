import axios from 'axios';
import { cache } from 'react';

const WP_URL = process.env.NEXT_PUBLIC_WP_URL || 'https://cms.shapehive.in';

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
    const { data } = await axios.get<HeroBanner[]>(
      `${WP_URL}/wp-json/novalis/v1/hero-banners`,
      { timeout: 6000 }
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
