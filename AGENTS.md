<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Novalis Storefront — Agent Guide

Luxury Arabic fragrance storefront (Dubai, UAE). Next.js 16 App Router frontend talking to a WooCommerce REST API on WordPress. English + Arabic, AED-base currency with 9-currency switcher, cash-on-delivery checkout.

## Stack
- Next.js 16.2.1 (App Router, Turbopack dev, React 19.2) — **read `node_modules/next/dist/docs/` before using Next APIs**, it's not the Next you know.
- TypeScript 5, Tailwind CSS 4 (`@theme` in `app/globals.css`).
- Zustand 5 (stores in `store/`, `persist` middleware with localStorage).
- Axios 1.13 (`wooApi` client in `lib/woocommerce.ts`).
- Swiper 12 (all carousels/sliders — never hand-roll one).
- No testing framework configured. No CI on this repo.

## Backend
- WooCommerce REST v3 at `https://cms.shapehive.in/wp-json/wc/v3`.
- Auth keys in `.env.local` as `WC_CONSUMER_KEY` / `WC_CONSUMER_SECRET`.
- Rate-limited by Hostinger — expect intermittent 429s from dev IPs.
- AR translations via WC custom fields on products: `name_ar`, `short_description_ar`, `description_ar`. No WPML/Polylang plugin.

## Commands
```bash
npm run dev          # Next dev server on :3000 (Turbopack)
npm run build        # production build — run before opening a PR
npm run lint         # eslint-config-next
npx tsc --noEmit     # type-check (no `test` script configured)
```
Always run `tsc --noEmit` + `npm run build` before pushing. There is no CI; the Hostinger deploy on `initial-copy` is the only downstream signal.

## Environment
`.env.local` (not committed):
```
NEXT_PUBLIC_WP_URL=https://cms.shapehive.in
WC_CONSUMER_KEY=ck_...
WC_CONSUMER_SECRET=cs_...
REVALIDATION_SECRET=<optional, for /api/revalidate webhooks>
```
No Stripe — checkout is cash-on-delivery only. Ignore any Stripe references in stale docs.

## Repo Map
```
app/                    Next.js App Router routes
  (storefront)/         Public site (home, shop, product, cart, account, static pages)
  api/                  Server API proxies (WC order/customer/return, auth)
  checkout/             Single-page checkout (not grouped under storefront)
components/             React components grouped by feature
  ui/                   Reusable primitives (Navbar, Footer, ProductCard, …)
    page/               Shared page-level components (Hero, IconCard, LegalDocPage, …)
    skeletons/          Loading skeletons
    mobile/             Mobile-only UI (BottomNav, Drawer)
lib/                    Server-side utilities
  woocommerce.ts        wooApi axios client (timeout + retry)
  store-settings.ts     React.cache()'d WC general settings fetcher
  i18n/                 AR/EN translation dictionary
  password.ts           PBKDF2 helpers (non-JWT WP auth fallback)
store/                  Zustand stores (cart, wishlist, auth, locale, currency)
```

## Branching & PRs
- **Base branch**: `initial-copy` (not `main`).
- New feature/fix branches: `devin/<unix-ts>-<kebab-description>` off `initial-copy`.
- Always fetch the PR template before opening a PR (`git_pr action=fetch_template`).
- No CI configured — `npx tsc --noEmit` + `npm run build` locally are the only gates.
- Merging to `initial-copy` triggers Hostinger redeploy (~5 min, may 503 briefly).

## Non-negotiables
- **Never** add WPML/Polylang — AR content comes from product meta (`name_ar` etc.). See `components/ui/ProductCard.tsx` for the `locale === 'ar' ? nameAr || name : name` pattern.
- **Never** persist locale-dependent values (AR product names, translated strings) to Zustand — always persist the canonical English value, then localize at render time. See the PR #27 wishlist fix.
- **Never** call `wooApi` directly from client components. All WC access goes through:
  - Server components / Route Handlers (under `app/api/`)
  - `StoreSettingsProvider` context for settings
- `wooApi` retries **only** idempotent methods (GET/HEAD/OPTIONS/PUT/DELETE). POST/PATCH are never retried — a retry on `POST /customers` would create duplicates.
- **Order endpoints require email-based ownership checks**. See `app/api/AGENTS.md`.
- Currency: AED is base (`rate: 1`). All prices on cards/PDP are AED; `PriceDisplay` converts at render time from `useCurrencyStore`. Never pre-convert before passing to `PriceDisplay`.
- Primary brand color: `#742938` (maroon). Accent: `#D4AFB9` (pink). Secondary accent: `#d2c7bf` (sand, added PR #27).
- Emojis: do not add emojis to the codebase unless the user explicitly requests them.

## Deploy
- Hostinger hPanel → Node.js site `shapehive.in` → auto-deploys on push to `initial-copy`.
- Env vars (`NEXT_PUBLIC_WP_URL`, `WC_CONSUMER_KEY`, `WC_CONSUMER_SECRET`) are set in hPanel build config, not in the repo.
- After merge, live site may 503 for ~5 min during swap — normal.

## Session patterns
- `list_knowledge_notes` for context about prior sessions (what's been built, known issues).
- When running the dev server, prefer the background-shell pattern (`nohup npm run dev > /tmp/dev.log 2>&1 &`).
- Scoped `AGENTS.md` files live in `app/`, `app/api/`, `components/`, `lib/`, `store/` — read the one nearest the files you're editing.
