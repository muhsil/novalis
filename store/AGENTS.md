# `store/` — Zustand Stores

Client-side state. All stores use `zustand` + `zustand/middleware`'s `persist` where persistence is desired.

## Stores
- **`useCartStore`** — cart items (`id, name, price, quantity, image, variationId?`), persisted under key `novalis-cart`. Handles add/remove/update/clear.
- **`useWishlistStore`** — wishlist items (`id, name, price, image?, slug`), persisted under `novalis-wishlist`. Legacy keys (`shapehive-wishlist`, `balloonsmall-wishlist`) are auto-migrated on first read.
- **`useAuthStore`** — current user (`id, email, firstName, lastName, jwt?`), persisted under `novalis-auth`.
- **`useLocaleStore`** — `locale: 'en' | 'ar'`, persisted under `novalis-locale`. Drives `html[lang]`/`html[dir]` via `LocaleHydrator`.
- **`useCurrencyStore`** — `selectedCurrency` + hardcoded rate table (AED base). Persisted under `novalis-currency`. On breaking schema changes (e.g. removing INR), `migrate()` resets to AED.

## Non-negotiable patterns

### Persist canonical, not localized, values
Never persist Arabic/translated strings. Store the canonical English `name` and localize at render time. The PR #27 wishlist bug was exactly this — `ProductCard` was passing `displayName` (locale-dependent) to `WishlistButton` which persisted it; switching back to EN kept showing Arabic. Fixed by always passing `name`.

### SSR hydration
Zustand `persist` reads from `localStorage` which is client-only. Don't read these stores during SSR (they'll have default state). Either:
- Mark the consuming component `"use client"`, or
- Render a skeleton on SSR and hydrate on mount.

`LocaleHydrator` in `components/providers/` handles the locale-on-html-tag hydration before paint.

### Breaking schema changes → `migrate()` + bump `version`
When you change the persisted shape (remove a field, rename a key, drop a currency), bump the store's persist `version` and add a `migrate` function that resets or transforms the old state. Example: INR removal in `useCurrencyStore` — users who had INR selected get reset to AED on next load.

### Legacy-key migration (wishlist pattern)
When renaming the persist key (e.g. `shapehive-wishlist` → `novalis-wishlist`), don't just leave users with an empty state. Read legacy keys on first load and migrate the value. See `useWishlistStore` storage adapter.

### Never read one store's state inside another store's setter synchronously
Use the `getState()`/`setState()` pattern at the component level if you need cross-store coordination. Inlining `useOtherStore.getState()` inside `set((state) => ...)` tends to break on fast-refresh in dev.

## Adding a new store
1. Define the `State` interface + actions.
2. Wrap in `persist` only if needed.
3. Key name: `novalis-<feature>` (not `shapehive-*`, which is legacy).
4. If persisted, decide upfront: what `version` do we start at, and what resets on version bump?
