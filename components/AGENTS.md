# `components/` — React Components

Grouped by feature area. Keep a component in the most specific folder that matches its purpose; only promote to `ui/` when it becomes reusable across features.

## Folders
- **`ui/`** — reusable primitives used anywhere (buttons, cards, forms, Navbar, Footer, ProductCard, PriceDisplay). Most components belong here.
  - **`ui/page/`** — page-level shared layouts (Hero, IconCard, StatGrid, CtaBanner, LegalDocPage, SectionHeader, FeatureGrid). Compose the static pages (About, Contact, FAQ, Shipping, Terms, Privacy) from these — don't re-invent layouts.
  - **`ui/skeletons/`** — loading skeletons (match the real component layout 1:1 so there's no layout jump when the data arrives).
  - **`ui/mobile/`** — mobile-only UI (BottomNav, drawers).
- **`account/`** — `/account/*` pages (AccountLayout + gating, OrderCard, ReturnRequestForm, AddressCard, AccountNav).
- **`cart/`** — `CartDrawer` (slides in from side, lists items, free-delivery progress, checkout/view-cart CTAs).
- **`checkout/`** — step-scoped forms (PersonalInfo, BillingAddress, OrderNotes, CreateAccountOption, OrderSummary, OrderSuccess, EmptyCart, SupportBox).
- **`home/`** — `HomeContent` composition (hero + featured carousels + FeatureGrid + Our-Craft section).
- **`shop/`** — `ShopSortBar`.
- **`faq/`** — `FAQClient` (client-side accordion).
- **`providers/`** — client providers mounted in root layout (`LocaleHydrator`, `StoreSettingsProvider`).
- **`seo/`** — SEO primitives (`JsonLd`, `GoogleAnalytics`, `GoogleTagManager`).

## Conventions
- Server components by default. Add `"use client"` only when needed (hooks, refs, browser APIs).
- Client components that read Zustand stores MUST be wrapped client-side (no SSR reads of persisted state — you'll get hydration mismatches). Use `LocaleHydrator` pattern if you need early hydration.
- Never import `wooApi` in a client component — call through an `app/api/` route instead.
- Carousels/sliders: always use Swiper (`import { Swiper, SwiperSlide } from 'swiper/react'`). Don't hand-roll.
- Icons: inline SVGs (no icon library installed). Match stroke-width and size of surrounding SVGs.
- Tailwind only. No CSS modules, no styled-components. Arbitrary values (`text-[#742938]`, `h-[3px]`) are fine and pervasive — follow the style of neighboring files.
- RTL: use logical properties (`ms-`/`me-`, `start-`/`end-`) instead of `ml-`/`mr-`/`left-`/`right-` when rendering inside content that flips under AR locale.

## Brand tokens
- Primary (maroon): `#742938`
- Accent pink: `#D4AFB9`
- Secondary accent (sand): `#d2c7bf` (+ light variant `#ece7e2`)
- Cream background: `#F9F7F2`
- Text: `#121212` / `#191919`
- Muted: `#888888`, `#E8E4DE`
CSS custom properties defined in `app/globals.css` as `--color-*`. Prefer the arbitrary-value hex syntax for consistency with existing files.

## Localization
- Pass canonical English `name` to state (Zustand, localStorage). Compute `displayName = locale === 'ar' && nameAr ? nameAr : name` at render time in the component, never at state-write time. See `ProductCard.tsx`.
- Use `<LocalizedText en={...} ar={...} />` or `t(locale, 'key')` from `lib/i18n/translations.ts` for UI strings.
