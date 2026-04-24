import type { Locale } from '@/lib/i18n/translations';

/**
 * WooCommerce has no translation plugin (Polylang/WPML) on this site, so
 * Arabic copy is stored as Custom Fields / ACF meta on each product and
 * category. Editors can add these in WP-admin → Product → Custom Fields:
 *
 *   name_ar
 *   short_description_ar
 *   description_ar
 *
 * If a field is missing for a locale, we fall back to the default
 * (English) value from WooCommerce.
 */
type MetaItem = { key?: string; value?: unknown } | null | undefined;

function readMeta(meta: MetaItem[] | undefined, key: string): string | undefined {
  if (!Array.isArray(meta)) return undefined;
  const hit = meta.find((m) => m && typeof m === 'object' && m.key === key);
  if (!hit) return undefined;
  const v = hit.value;
  return typeof v === 'string' && v.trim() ? v : undefined;
}

type LocalizableProduct = {
  name?: string;
  short_description?: string;
  description?: string;
  meta_data?: MetaItem[];
} & Record<string, unknown>;

/**
 * Returns a shallow-merged product with localized name/description fields
 * swapped in when the given locale is Arabic and the *_ar meta exists.
 * Always returns a valid product shape — never throws.
 */
export function localizeProduct<T extends LocalizableProduct>(product: T, locale: Locale): T {
  if (locale !== 'ar' || !product) return product;
  const meta = product.meta_data;
  const nameAr = readMeta(meta, 'name_ar');
  const shortAr = readMeta(meta, 'short_description_ar');
  const longAr = readMeta(meta, 'description_ar');
  return {
    ...product,
    ...(nameAr ? { name: nameAr } : {}),
    ...(shortAr ? { short_description: shortAr } : {}),
    ...(longAr ? { description: longAr } : {}),
  };
}

type LocalizableCategory = {
  name?: string;
  description?: string;
  meta_data?: MetaItem[];
} & Record<string, unknown>;

export function localizeCategory<T extends LocalizableCategory>(category: T, locale: Locale): T {
  if (locale !== 'ar' || !category) return category;
  const meta = category.meta_data;
  const nameAr = readMeta(meta, 'name_ar');
  const descAr = readMeta(meta, 'description_ar');
  return {
    ...category,
    ...(nameAr ? { name: nameAr } : {}),
    ...(descAr ? { description: descAr } : {}),
  };
}

/**
 * Server-side extractor for the Arabic overrides on a WC product. Returned
 * values are passed as explicit props to client components so locale
 * switching happens without refetching. `undefined` = no Arabic override.
 */
export function extractArNames(product: LocalizableProduct | undefined | null): {
  nameAr?: string;
  categoryNameAr?: string;
  shortDescriptionAr?: string;
  descriptionAr?: string;
} {
  if (!product) return {};
  const firstCategory = (product as { categories?: LocalizableCategory[] }).categories?.[0];
  return {
    nameAr: readMeta(product.meta_data, 'name_ar'),
    shortDescriptionAr: readMeta(product.meta_data, 'short_description_ar'),
    descriptionAr: readMeta(product.meta_data, 'description_ar'),
    categoryNameAr: readMeta(firstCategory?.meta_data, 'name_ar'),
  };
}
