# `app/` — App Router Routes

Next.js 16 App Router. **Read `node_modules/next/dist/docs/` before using Next APIs** — this is not the Next.js you know.

## Route groups
- **`(storefront)/`** — public site (home, `/shop`, `/product/[slug]`, `/cart`, `/account/*`, static pages). Has its own `layout.tsx` with the Navbar + Footer + TrustBanner. ISR `revalidate = 60` on product/shop listings.
- **`checkout/`** — deliberately OUTSIDE `(storefront)` so it doesn't inherit the Navbar. Single-page flow with numbered sections (`01 Shipping → 02 Billing → 03 Notes → 04 Payment`).
- **`api/`** — server-only route handlers. See `app/api/AGENTS.md` for security rules.

## Conventions
- Server components by default. Add `"use client"` only when you need state, effects, or browser APIs.
- Dynamic params (Next 15+): `{ params }: { params: Promise<{ slug: string }> }` — **params is a Promise**, await it.
- Data fetching: server components call `wooApi` directly (via `lib/woocommerce.ts`). Client components go through Route Handlers under `api/`.
- `getStoreSettings()` is wrapped in `React.cache()` — safe to call from both `layout.tsx` and any `page.tsx` in the same request without double-fetching.
- `revalidate = 60` is the default for product/category pages. Manual invalidation via `/api/revalidate?path=...&secret=$REVALIDATION_SECRET`.

## Static pages
`about`, `contact`, `faq`, `shipping`, `terms`, `privacy` all compose the shared `components/ui/page/*` primitives (`PageHero`, `SectionHeader`, `IconCard`, `StatGrid`, `CtaBanner`, `LegalDocPage`). Reuse those instead of building new layouts.

## Account routes
`/account/*` pages render `AccountLayout`, which gates on `useAuthStore` — unauthenticated users see a "Sign in" screen, not the page body. Wishlist localStorage is independent of auth, but the `/account/wishlist` page itself requires login.

## Locale
- `useLocaleStore` drives `html[lang]` and `html[dir]` via `LocaleHydrator` (client component in root layout).
- AR translations: static UI strings from `lib/i18n/translations.ts`; product content from WC custom fields (`name_ar` etc.) resolved inside `ProductCard`/PDP.
- Never store an AR-translated string in Zustand — store the canonical English, localize at render.

## Currency
- All prices pass through `<PriceDisplay amount={aedPrice} />`. Do not pre-convert.
- `useCurrencyStore` holds the user's selected currency + conversion rates (hardcoded, AED base).
- Currency symbol, thousand/decimal separators, and position come from `StoreSettings` (WC general settings), not hardcoded.
