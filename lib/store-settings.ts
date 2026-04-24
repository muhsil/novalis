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
    // WooCommerce shipping zones → free_shipping method min_amount
    const { data: zones } = await wooApi.get('/shipping/zones');
    for (const zone of zones as { id: number }[]) {
      try {
        const { data: methods } = await wooApi.get(`/shipping/zones/${zone.id}/methods`);
        for (const m of methods as { method_id: string; settings?: Record<string, { value?: string }> }[]) {
          if (m.method_id === 'free_shipping') {
            const minAmount = parseFloat(m.settings?.min_amount?.value || '0');
            if (minAmount > 0) return minAmount;
          }
        }
      } catch { /* skip zone */ }
    }
  } catch { /* ignore */ }
  return DEFAULT_SETTINGS.freeDeliveryThreshold;
}

let cachedSettings: StoreSettings | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Fetches store settings from WooCommerce API (server-side only).
 * Results are cached for 5 minutes to avoid excessive API calls.
 */
export async function getStoreSettings(): Promise<StoreSettings> {
  const now = Date.now();
  if (cachedSettings && now - cacheTimestamp < CACHE_TTL) {
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
      currencyPosition: (settings['woocommerce_currency_pos'] as StoreSettings['currencyPosition']) || DEFAULT_SETTINGS.currencyPosition,
      thousandSeparator: settings['woocommerce_price_thousand_sep'] ?? DEFAULT_SETTINGS.thousandSeparator,
      decimalSeparator: settings['woocommerce_price_decimal_sep'] ?? DEFAULT_SETTINGS.decimalSeparator,
      numDecimals: parseInt(settings['woocommerce_price_num_decimals'] ?? String(DEFAULT_SETTINGS.numDecimals), 10),
      country: settings['woocommerce_default_country'] || DEFAULT_SETTINGS.country,
      city: settings['woocommerce_store_city'] || DEFAULT_SETTINGS.city,
      address: settings['woocommerce_store_address'] || DEFAULT_SETTINGS.address,
      freeDeliveryThreshold,
    };
    cacheTimestamp = now;

    return cachedSettings;
  } catch (error) {
    console.error('Failed to fetch store settings:', error);
    return DEFAULT_SETTINGS;
  }
}
