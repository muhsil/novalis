# `lib/` — Server-side Utilities

## `woocommerce.ts` — `wooApi` axios client
Single source of truth for WooCommerce REST access.

- **Base URL**: `${NEXT_PUBLIC_WP_URL}/wp-json/wc/v3`
- **Auth**: Basic auth with consumer key + secret from env.
- **Timeout**: 6s (fail fast so SSR doesn't hang).
- **Retry**: 1 retry max on `408, 425, 429, 500-504` or `ECONNABORTED/ETIMEDOUT`, with 300ms + jitter backoff.
- **Methods retried**: GET/HEAD/OPTIONS/PUT/DELETE **only**. POST/PATCH are never retried to avoid duplicate resource creation (duplicate customers, duplicate order-return notes).

Never bypass this client. Never add fetch/axios calls to `cms.shapehive.in` from elsewhere — add them here and expose a typed helper if needed.

## `store-settings.ts` — `getStoreSettings()`
Fetches WC general settings + free-shipping `min_amount`. Wrapped in `React.cache()` so `layout.tsx` and `page.tsx` share one upstream call per request.

Returns `StoreSettings` shape. On any upstream failure, falls back to `DEFAULT_SETTINGS` (cached in-memory for 30s to avoid a flood of retries on sustained outages).

Consumed by `StoreSettingsProvider` in the root layout — client components read from the provider, not this module.

## `i18n/translations.ts`
Simple `{ en, ar }` dictionary with `t(locale, key)` accessor. Keys are dot-paths (`currency.label`, `product.new`). Missing AR values fall back to EN. Extend this dictionary — don't add another i18n library.

## `password.ts` — PBKDF2 fallback
Hash/verify helpers for the legacy non-JWT auth path. Storage key on WP side: `balloonsmall_password` (name kept for DB compatibility; do not rename). JWT is preferred; PBKDF2 is the fallback when the JWT plugin isn't available.

## `verifyCustomer.ts`
Shared ownership check helper — resolves a customer by email and compares id. Used by order/address/customer route handlers. If you're writing a new customer-scoped API, use this, don't re-implement.

## `woo-localize.ts`
Merges WC REST product JSON with AR custom-field overrides (`name_ar`, `short_description_ar`, `description_ar`). Called from server components that render localized product content.

## Adding new utilities
- Server-only: add to `lib/`. Import from `components/` only on the server side.
- Client shared state: add to `store/` (Zustand), not here.
- Avoid circular deps: `lib/` depends on nothing inside `store/` or `components/`.
