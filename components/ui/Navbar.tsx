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
  { href: '/shop?category=oils', labelKey: 'nav.oils', key: 'oils' },
  { href: '/shop?category=dokhun', labelKey: 'nav.dokhun', key: 'dokhun' },
  { href: '/shop?category=all-over-spray', labelKey: 'nav.all_over_spray', key: 'all-over-spray' },
];

export default function Navbar() {
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const authCustomer = useAuthStore((s) => s.customer);
  const locale = useLocaleStore((s) => s.locale);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#1A1A2E] text-white text-center text-[11px] font-light py-2 px-4 tracking-[0.1em]">
        <span className="inline-flex items-center gap-2">
          <span className="hidden sm:inline">{t(locale, 'announcement.free_delivery')}</span>
          <span className="hidden sm:inline mx-2 opacity-20">|</span>
          <span>{t(locale, 'announcement.tagline')}</span>
        </span>
      </div>

      {/* Main Header */}
      <header className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'border-b border-[#f0f0f0]'}`}>
        {/* Primary Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <img src="/novalis-logo.png" alt="Novalis" className="h-10 w-auto object-contain" />
            </Link>

            {/* Desktop Search */}
            <form method="GET" action="/shop" className="hidden md:flex flex-1 max-w-xl mx-6">
              <div className={`flex w-full overflow-hidden border transition-all duration-200 ${searchFocused ? 'border-[#C9A96E]' : 'border-[#e8e8e8] hover:border-[#ddd]'} bg-[#fafafa]`}>
                <input
                  ref={searchRef}
                  name="search"
                  placeholder={t(locale, 'nav.search_placeholder')}
                  className="flex-1 px-4 py-2.5 text-sm outline-none bg-transparent text-[#333] placeholder:text-[#bbb] font-light"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <button type="submit" className="bg-[#C9A96E] text-white px-4 hover:bg-[#B8985D] transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-1 ml-auto">
              {/* Language Switcher */}
              <LanguageSwitcher variant="compact" />

              {/* Currency Switcher */}
              <CurrencySwitcher variant="compact" />

              {/* Wishlist - desktop */}
              <Link href="/account/wishlist" className="hidden md:flex relative p-2.5 hover:bg-[#fafafa] transition-all" title={t(locale, 'nav.wishlist')}>
                <svg className="w-5 h-5 text-[#555] hover:text-[#C9A96E] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-0.5 bg-[#C9A96E] text-white text-[9px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account - desktop */}
              <Link href={isLoggedIn ? '/account' : '/account/login'} className="hidden md:flex items-center gap-1.5 p-2.5 hover:bg-[#fafafa] transition-all" title={t(locale, 'nav.account')}>
                <svg className="w-5 h-5 text-[#555] hover:text-[#C9A96E] transition-colors" fill={isLoggedIn ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {isLoggedIn && authCustomer && (
                  <span className="text-xs font-medium text-[#555] max-w-[80px] truncate hidden lg:inline">{authCustomer.firstName}</span>
                )}
              </Link>

              {/* Cart - desktop */}
              <button onClick={() => setCartOpen(true)} className="hidden md:flex relative p-2.5 hover:bg-[#fafafa] transition-all" title={t(locale, 'nav.cart')}>
                <svg className="w-5 h-5 text-[#555] hover:text-[#C9A96E] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-1 right-0.5 bg-[#C9A96E] text-white text-[9px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Desktop Shop CTA */}
              <Link href="/shop" className="hidden md:inline-flex items-center bg-[#C9A96E] text-white text-xs font-semibold px-6 py-2.5 hover:bg-[#B8985D] transition-colors tracking-[0.15em] uppercase ml-1">
                {t(locale, 'nav.shop_now')}
              </Link>

              {/* Mobile hamburger */}
              <button className="md:hidden p-2.5 hover:bg-[#fafafa] transition-all" onClick={() => setMenuOpen(!menuOpen)}>
                <svg className="w-5 h-5 text-[#333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  }
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Category Navigation */}
        <div className="hidden md:block border-t border-[#f0f0f0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-0 h-10 overflow-x-auto no-scrollbar">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-[#666] hover:text-[#C9A96E] text-[13px] font-light whitespace-nowrap transition-colors tracking-wide"
                >
                  {t(locale, link.labelKey)}
                </Link>
              ))}
              <div className="ml-auto flex items-center gap-1.5 text-[12px] text-[#999] font-light">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{t(locale, 'nav.dubai_uae')}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-[60]" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        </div>
      )}

      {/* Mobile Slide-in Menu Panel */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-[280px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Menu Header */}
        <div className="flex items-center justify-between p-4 bg-[#1A1A2E]">
          <img src="/novalis-logo.png" alt="Novalis" className="h-7 w-auto brightness-0 invert" />
          <button onClick={() => setMenuOpen(false)} className="p-1.5 rounded bg-white/10 hover:bg-white/20 transition-colors">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Search */}
        <form method="GET" action="/shop" className="p-3 border-b border-[#f0f0f0]">
          <div className="flex overflow-hidden bg-[#f5f5f5] border border-[#eee]">
            <input name="search" placeholder={t(locale, 'nav.search_placeholder')} className="flex-1 px-3 py-2.5 text-sm outline-none bg-transparent font-light" />
            <button type="submit" className="bg-[#C9A96E] text-white px-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        {/* Category Links */}
        <nav className="p-3 flex flex-col gap-0.5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
          <p className="text-[10px] font-semibold text-[#999] uppercase tracking-[0.15em] px-3 py-1.5">{t(locale, 'nav.categories')}</p>
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2.5 text-[#333] text-sm font-light hover:bg-[#FAF6F0] hover:text-[#C9A96E] transition-all"
              onClick={() => setMenuOpen(false)}
            >
              {t(locale, link.labelKey)}
            </Link>
          ))}
          <div className="border-t border-[#f0f0f0] my-2" />

          <p className="text-[10px] font-semibold text-[#999] uppercase tracking-[0.15em] px-3 py-1.5">{t(locale, 'nav.quick_access')}</p>
          <button
            onClick={() => { setMenuOpen(false); setCartOpen(true); }}
            className="flex items-center justify-between px-3 py-2.5 text-[#333] text-sm font-light hover:bg-[#FAF6F0] hover:text-[#C9A96E] transition-all w-full text-left"
          >
            {t(locale, 'nav.cart')}
            {cartCount > 0 && (
              <span className="bg-[#C9A96E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <Link
            href="/account/wishlist"
            className="flex items-center justify-between px-3 py-2.5 text-[#333] text-sm font-light hover:bg-[#FAF6F0] hover:text-[#C9A96E] transition-all"
            onClick={() => setMenuOpen(false)}
          >
            {t(locale, 'nav.wishlist')}
            {wishlistCount > 0 && (
              <span className="bg-[#C9A96E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            href={isLoggedIn ? '/account' : '/account/login'}
            className="px-3 py-2.5 text-[#333] text-sm font-light hover:bg-[#FAF6F0] hover:text-[#C9A96E] transition-all"
            onClick={() => setMenuOpen(false)}
          >
            {isLoggedIn ? t(locale, 'nav.my_account') : t(locale, 'nav.sign_in')}
          </Link>
        </nav>

        {/* Bottom CTA */}
        <div className="absolute bottom-8 left-3 right-3">
          <Link
            href="/shop"
            className="block w-full text-center text-xs font-semibold tracking-[0.15em] uppercase bg-[#C9A96E] text-white py-3.5 hover:bg-[#B8985D] transition-colors"
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
