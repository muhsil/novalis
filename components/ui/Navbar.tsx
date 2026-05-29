"use client";
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useState, useEffect, useRef } from 'react';
import CartDrawer from '@/components/cart/CartDrawer';
import { ToastContainer } from '@/components/ui/Toast';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import CurrencySwitcher from '@/components/ui/CurrencySwitcher';
import { useLocaleStore } from '@/store/useLocaleStore';
import { t } from '@/lib/i18n/translations';

const NAV_LINKS = [
  { href: '/shop', labelKey: 'nav.all', key: 'all' },
  { href: '/shop?category=perfumes', labelKey: 'nav.perfumes', key: 'perfumes' },
  { href: '/shop?category=luxury-fragrances', labelKey: 'nav.luxury_fragrances', key: 'luxury-fragrances' },
  { href: '/shop?category=oud-collection', labelKey: 'nav.oud_collection', key: 'oud-collection' },
  { href: '/shop?category=natural-oud', labelKey: 'nav.natural_oud', key: 'natural-oud' },
  { href: '/shop?category=oils', labelKey: 'nav.oils', key: 'oils' },
  { href: '/shop?category=dokhun', labelKey: 'nav.dokhun', key: 'dokhun' },
  { href: '/shop?category=oud-dakhoon', labelKey: 'nav.oud_dakhoon', key: 'oud-dakhoon' },
  { href: '/shop?category=all-over-spray', labelKey: 'nav.all_over_spray', key: 'all-over-spray' },
];

export default function Navbar() {
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const locale = useLocaleStore((s) => s.locale);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [elevated, setElevated] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => setElevated(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 150);
  }, [searchOpen]);

  return (
    <>
      {/* Thin sand accent strip — branded separator above the header */}
      <div className="h-[3px] w-full bg-[#d2c7bf]" />

      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
          elevated ? 'shadow-[0_2px_18px_rgba(0,0,0,0.06)]' : 'border-b border-[#E8E4DE]'
        }`}
      >
        {/* Row 1: Icons (left) • Logo (center) • Icons (right) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left */}
            <div className="flex items-center gap-1 flex-1">
              <button
                className="md:hidden p-2.5 hover:bg-[#F9F7F2] rounded-full transition-colors"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <svg className="w-5 h-5 text-[#121212]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 hover:bg-[#F9F7F2] rounded-full transition-colors group"
                aria-label="Search"
              >
                <svg className="w-5 h-5 text-[#121212] group-hover:text-[#742938] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <div className="hidden md:flex items-center gap-1.5 ms-1">
                <LanguageSwitcher variant="compact" />
                <CurrencySwitcher variant="compact" />
              </div>
            </div>

            {/* Center: Logo */}
            <Link href="/" className="flex items-center shrink-0" aria-label="Novalis — home">
              <img
                src="/novalis-logo.png"
                alt="Novalis"
                className={`w-auto object-contain transition-[height] duration-200 ${elevated ? 'h-9' : 'h-11'}`}
              />
            </Link>

            {/* Right */}
            <div className="flex items-center gap-0.5 flex-1 justify-end">
              <Link
                href={isLoggedIn ? '/account' : '/account/login'}
                className="hidden md:flex p-2.5 hover:bg-[#F9F7F2] rounded-full transition-colors group"
                title={t(locale, 'nav.account')}
              >
                <svg className="w-5 h-5 text-[#121212] group-hover:text-[#742938] transition-colors" fill={isLoggedIn ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
              <Link
                href="/account/wishlist"
                className="hidden md:flex relative p-2.5 hover:bg-[#F9F7F2] rounded-full transition-colors group"
                title={t(locale, 'nav.wishlist')}
              >
                <svg className="w-5 h-5 text-[#121212] group-hover:text-[#742938] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute top-1 end-1 bg-[#d2c7bf] text-[#121212] text-[9px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 hover:bg-[#F9F7F2] rounded-full transition-colors group"
                title={t(locale, 'nav.cart')}
              >
                <svg className="w-5 h-5 text-[#121212] group-hover:text-[#742938] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-1 end-1 bg-[#742938] text-white text-[9px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Desktop nav — always visible, no reflow */}
        <div className="hidden md:block border-t border-[#E8E4DE]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-center gap-1 h-11">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-[#121212] hover:text-[#742938] text-[12px] font-semibold tracking-[0.1em] uppercase whitespace-nowrap transition-colors relative group"
                >
                  {t(locale, link.labelKey)}
                  <span className="absolute bottom-1 inset-x-4 h-[2px] bg-[#d2c7bf] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Full-width search panel (slides down below header, no layout jank) */}
      {searchOpen && (
        <div className="fixed inset-0 z-[55]" onClick={() => setSearchOpen(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative bg-[#742938] pt-16 pb-8 animate-in slide-in-from-top fade-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <form method="GET" action="/shop" className="relative">
                <input
                  ref={searchInputRef}
                  name="search"
                  placeholder={t(locale, 'nav.search_placeholder')}
                  className="w-full bg-transparent border-b border-[#d2c7bf] py-4 text-2xl font-serif text-[#F9F7F2] placeholder:text-[#F9F7F2]/30 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="absolute end-0 top-1/2 -translate-y-1/2 text-[#F9F7F2] hover:text-[#d2c7bf] transition-colors"
                  aria-label="Close search"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </form>
              <div className="mt-4 flex gap-4 overflow-x-auto no-scrollbar py-2">
                <span className="text-[10px] text-[#d2c7bf] uppercase tracking-[0.2em] font-normal py-1">
                  {t(locale, 'nav.quick_access')}:
                </span>
                {NAV_LINKS.slice(1, 4).map((l) => (
                  <Link
                    key={l.key}
                    href={l.href}
                    className="text-[10px] text-[#F9F7F2]/70 hover:text-[#d2c7bf] uppercase tracking-[0.15em] whitespace-nowrap"
                    onClick={() => setSearchOpen(false)}
                  >
                    {t(locale, l.labelKey)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Slide-in Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-[60]" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        </div>
      )}

      {/* Mobile Slide-in Menu Panel */}
      <div className={`md:hidden fixed top-0 end-0 h-full w-[280px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out ${menuOpen ? 'translate-x-0' : 'translate-x-full rtl:-translate-x-full'}`}>
        <div className="h-[3px] w-full bg-[#d2c7bf]" />
        {/* Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#eee]">
          <img src="/novalis-logo.png" alt="Novalis" className="h-7 w-auto" />
          <button onClick={() => setMenuOpen(false)} className="p-1.5 rounded-full hover:bg-[#F9F7F2] transition-colors" aria-label="Close menu">
            <svg className="w-4 h-4 text-[#121212]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Search */}
        <form method="GET" action="/shop" className="p-3 border-b border-[#eee]">
          <div className="flex items-center bg-[#F9F7F2] px-3">
            <svg className="w-4 h-4 text-[#999] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input name="search" placeholder={t(locale, 'nav.search_placeholder')} className="flex-1 px-3 py-2.5 text-sm outline-none bg-transparent font-light" />
          </div>
        </form>

        {/* Category Links */}
        <nav className="p-3 flex flex-col gap-0.5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
          <p className="text-[10px] font-bold text-[#999] uppercase tracking-[0.15em] px-3 py-1.5">{t(locale, 'nav.categories')}</p>
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2.5 text-[#121212] font-serif hover:bg-[#F9F7F2] hover:text-[#742938] transition-all"
              onClick={() => setMenuOpen(false)}
            >
              {t(locale, link.labelKey)}
            </Link>
          ))}
          <div className="border-t border-[#e8e8e8] my-2" />

          <p className="text-[10px] font-bold text-[#999] uppercase tracking-[0.15em] px-3 py-1.5">{t(locale, 'nav.quick_access')}</p>
          <button
            onClick={() => { setMenuOpen(false); setCartOpen(true); }}
            className="flex items-center justify-between px-3 py-2.5 text-[#121212] font-serif hover:bg-[#F9F7F2] hover:text-[#742938] transition-all w-full text-start"
          >
            {t(locale, 'nav.cart')}
            {cartCount > 0 && (
              <span className="bg-[#742938] text-[#D4AFB9] text-[10px] font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <Link
            href="/account/wishlist"
            className="flex items-center justify-between px-3 py-2.5 text-[#121212] font-serif hover:bg-[#F9F7F2] hover:text-[#742938] transition-all"
            onClick={() => setMenuOpen(false)}
          >
            {t(locale, 'nav.wishlist')}
            {wishlistCount > 0 && (
              <span className="bg-[#d2c7bf] text-[#121212] text-[10px] font-bold px-2 py-0.5 rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            href={isLoggedIn ? '/account' : '/account/login'}
            className="px-3 py-2.5 text-[#121212] font-serif hover:bg-[#F9F7F2] hover:text-[#742938] transition-all"
            onClick={() => setMenuOpen(false)}
          >
            {isLoggedIn ? t(locale, 'nav.my_account') : t(locale, 'nav.sign_in')}
          </Link>

          <div className="border-t border-[#e8e8e8] my-2" />

          <p className="text-[10px] font-bold text-[#999] uppercase tracking-[0.15em] px-3 py-1.5">
            {t(locale, 'currency.label')} &amp; {t(locale, 'lang.switch')}
          </p>
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="flex-1">
              <CurrencySwitcher variant="full" />
            </div>
            <div>
              <LanguageSwitcher variant="full" />
            </div>
          </div>
        </nav>

        {/* Bottom CTA */}
        <div className="absolute bottom-6 start-3 end-3">
          <Link
            href="/shop"
            className="block w-full text-center text-[10px] font-bold tracking-[0.2em] uppercase bg-[#742938] text-[#F9F7F2] py-4 hover:bg-[#d2c7bf] hover:text-[#121212] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            {t(locale, 'nav.shop_now')}
          </Link>
        </div>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <ToastContainer />
    </>
  );
}
