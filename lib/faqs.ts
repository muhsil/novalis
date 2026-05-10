import { cache } from 'react';
import { wpApi } from './woocommerce';

export interface HomepageFaq {
  id: number;
  question: string;
  answer: string;
  order: number;
}

async function loadHomepageFaqs(): Promise<HomepageFaq[]> {
  try {
    const { data } = await wpApi.get<HomepageFaq[]>(
      '/novalis/v1/homepage-faqs'
    );
    return data;
  } catch {
    return [];
  }
}

/**
 * Fetches published homepage FAQs from the custom WP REST endpoint.
 * Wrapped in React.cache() to dedupe within a single request tree.
 */
export const getHomepageFaqs = cache(loadHomepageFaqs);
