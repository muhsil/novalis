import { cache } from 'react';
import { wpApi } from './woocommerce';

export interface FeatureCard {
  id: number;
  title: string;
  eyebrow: string;
  title_accent: string;
  description: string;
  cta_text: string;
  link: string;
  image: string;
  position: 'top' | 'bottom';
  tone: 'dark' | 'light' | 'warm';
  order: number;
}

async function loadFeatureCards(): Promise<FeatureCard[]> {
  try {
    const { data } = await wpApi.get<FeatureCard[]>(
      '/novalis/v1/feature-cards'
    );
    return data;
  } catch {
    return [];
  }
}

/**
 * Fetches published feature cards from the custom WP REST endpoint.
 * Wrapped in React.cache() to dedupe within a single request tree.
 */
export const getFeatureCards = cache(loadFeatureCards);
