import { cache } from 'react';
import { wooApi } from './woocommerce';

export interface StoreSettings {
  currency: string;
  currencySymbol: string;
  currencyPosition: 'left' | 'left_space' | 'right' | 'right_space';
  thousandSeparator: string;
  decimalSeparator: string;
  numDecimals: number;
  country: string;
  city: string;
  address: string;
  freeDeliveryThreshold: number;
}

const DEFAULT_SETTINGS: StoreSettings = {
  currency: 'AED',
  currencySymbol: 'د.إ',
  currencyPosition: 'left_space',
  thousandSeparator: ',',
  decimalSeparator: '.',
  numDecimals: 0,
  country: 'AE',
  city: 'Dubai',
  address: 'Dubai, United Arab Emirates',
  freeDeliveryThreshold: 100,
};

async function getFreeDeliveryThreshold(): Promise<number> {
  try {
    const { data: zones } = await wooApi.get('/shipping/zones');
    // Fetch all zone methods in parallel to avoid N sequential round-trips.
    const zoneIds = (zones as { id: number }[]).map((z) => z.id);
    const methodResults = await Promise.allSettled(
      zoneIds.map((id) => wooApi.get(`/shipping/zones/${id}/methods`))
    );
    for (const result of methodResults) {
      if (result.status !== 'fulfilled') continue;
      const methods = result.value.data as {
        method_id: string;
        settings?: Record<string, { value?: string }>;
      }[];
      for (const m of methods) {
        if (m.method_id === 'free_shipping') {
          const minAmount = parseFloat(m.settings?.min_amount?.value || '0');
          if (minAmount > 0) return minAmount;
        }
      }
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_SETTINGS.freeDeliveryThreshold;
}

let cachedSettings: StoreSettings | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_OK = 5 * 60 * 1000; // 5 minutes on success
const CACHE_TTL_FAIL = 30 * 1000; // 30s on failure (prevents thundering herd)

async function loadStoreSettings(): Promise<StoreSettings> {
  const now = Date.now();
  if (cachedSettings && now - cacheTimestamp < CACHE_TTL_OK) {
    return cachedSettings;
  }

  try {
    const [{ data }, freeDeliveryThreshold] = await Promise.all([
      wooApi.get('/settings/general'),
      getFreeDeliveryThreshold(),
    ]);
    const settings: Record<string, string> = {};
    for (const item of data as { id: string; value: string }[]) {
      settings[item.id] = item.value;
    }

    cachedSettings = {
      currency: settings['woocommerce_currency'] || DEFAULT_SETTINGS.currency,
      currencySymbol: DEFAULT_SETTINGS.currencySymbol,
      currencyPosition:
        (settings['woocommerce_currency_pos'] as StoreSettings['currencyPosition']) ||
        DEFAULT_SETTINGS.currencyPosition,
      thousandSeparator:
        settings['woocommerce_price_thousand_sep'] ?? DEFAULT_SETTINGS.thousandSeparator,
      decimalSeparator:
        settings['woocommerce_price_decimal_sep'] ?? DEFAULT_SETTINGS.decimalSeparator,
      numDecimals: parseInt(
        settings['woocommerce_price_num_decimals'] ??
          String(DEFAULT_SETTINGS.numDecimals),
        10
      ),
      country: settings['woocommerce_default_country'] || DEFAULT_SETTINGS.country,
      city: settings['woocommerce_store_city'] || DEFAULT_SETTINGS.city,
      address: settings['woocommerce_store_address'] || DEFAULT_SETTINGS.address,
      freeDeliveryThreshold,
    };
    cacheTimestamp = now;
    return cachedSettings;
  } catch (error) {
    console.error('Failed to fetch store settings:', error);
    // Cache the fallback briefly so we don't stampede WC with retries while
    // the backend is rate-limited or down.
    cachedSettings = DEFAULT_SETTINGS;
    cacheTimestamp = now - (CACHE_TTL_OK - CACHE_TTL_FAIL);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Fetches store settings from WooCommerce (server-side only). Wrapped in
 * React `cache()` so the same request tree (root layout + page) dedupes to a
 * single upstream call per render, on top of a 5-min in-memory TTL across
 * requests.
 */
export const getStoreSettings = cache(loadStoreSettings);
