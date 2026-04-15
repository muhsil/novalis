"use client";
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useState, useEffect, useRef } from 'react';
import CartDrawer from '@/components/cart/CartDrawer';
import { ToastContainer } from '@/components/ui/Toast';

const NAV_ICONS: Record<string, React.ReactNode> = {
  all: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  perfumes: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  'luxury-fragrances': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
  'oud-collection': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-2.21 0-4 2.015-4 4.5S9.79 17 12 17s4-2.015 4-4.5S14.21 8 12 8zm0 0V3m0 14v4" /></svg>,
  oils: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>,
  dokhun: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>,
  'all-over-spray': <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 21h10a2 2 0 002-2V9a2 2 0 00-2-2h-1V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H7a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
};

const NAV_LINKS = [
  { href: '/shop', label: 'All', key: 'all' },
  { href: '/shop?category=perfumes', label: 'Perfumes', key: 'perfumes' },
  { href: '/shop?category=luxury-fragrances', label: 'Luxury Fragrances', key: 'luxury-fragrances' },
  { href: '/shop?category=oud-collection', label: 'Oud Collection', key: 'oud-collection' },
  { href: '/shop?category=oils', label: 'Oils', key: 'oils' },
  { href: '/shop?category=dokhun', label: 'Dokhun', key: 'dokhun' },
  { href: '/shop?category=all-over-spray', label: 'All Over Spray', key: 'all-over-spray' },
];

export default function Navbar() {
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const authCustomer = useAuthStore((s) => s.customer);
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
      <div className="bg-gradient-to-r from-[#C9A96E] via-[#D4B87A] to-[#C9A96E] text-white text-center text-[11px] font-medium py-1.5 px-4 tracking-wide">
        <span className="inline-flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 hidden sm:inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
          <span className="hidden sm:inline">Free Delivery Across UAE</span>
          <span className="hidden sm:inline mx-2 opacity-40">|</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
          <span>Luxury Fragrances with an Emirati Signature</span>
        </span>
      </div>

      {/* Main Header */}
      <header className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        {/* Primary Row */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 group">
              <img src="/novalis-logo.png" alt="Novalis" className="h-10 w-auto object-contain" />
            </Link>

            {/* Desktop Search */}
            <form method="GET" action="/shop" className="hidden md:flex flex-1 max-w-xl mx-6">
              <div className={`flex w-full rounded-full overflow-hidden border-2 transition-all duration-200 ${searchFocused ? 'border-[#C9A96E] shadow-[0_0_0_3px_rgba(201,169,110,0.15)]' : 'border-[#eee] hover:border-[#ddd]'} bg-[#fafafa]`}>
                <input
                  ref={searchRef}
                  name="search"
                  placeholder="Search perfumes, fragrances, oud..."
                  className="flex-1 px-5 py-2.5 text-sm outline-none bg-transparent text-[#333] placeholder:text-[#bbb]"
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                <button type="submit" className="bg-gradient-to-r from-[#C9A96E] to-[#D4B87A] text-white px-5 hover:from-[#B8985D] hover:to-[#C9A96E] transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-1 ml-auto">
              {/* Wishlist */}
              <Link href="/account/wishlist" className="hidden md:flex relative p-2.5 rounded-xl hover:bg-[#f8f8f8] transition-all group" title="Wishlist">
                <svg className="w-[22px] h-[22px] text-[#555] group-hover:text-[#C9A96E] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#C9A96E] text-white text-[9px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1 ring-2 ring-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link href={isLoggedIn ? '/account' : '/account/login'} className="hidden md:flex items-center gap-1.5 p-2.5 rounded-xl hover:bg-[#f8f8f8] transition-all group" title="Account">
                <svg className="w-[22px] h-[22px] text-[#555] group-hover:text-[#C9A96E] transition-colors" fill={isLoggedIn ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {isLoggedIn && authCustomer && (
                  <span className="text-xs font-semibold text-[#555] group-hover:text-[#C9A96E] max-w-[80px] truncate hidden lg:inline transition-colors">{authCustomer.firstName}</span>
                )}
              </Link>

              {/* Cart */}
              <button onClick={() => setCartOpen(true)} className="relative p-2.5 rounded-xl hover:bg-[#f8f8f8] transition-all group" title="Cart">
                <svg className="w-[22px] h-[22px] text-[#555] group-hover:text-[#C9A96E] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#C9A96E] text-white text-[9px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1 ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Desktop Shop CTA */}
              <Link href="/shop" className="hidden md:inline-flex items-center gap-1.5 bg-gradient-to-r from-[#C9A96E] to-[#D4B87A] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:from-[#B8985D] hover:to-[#C9A96E] transition-all shadow-sm hover:shadow-md ml-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                Shop Now
              </Link>

              {/* Mobile hamburger */}
              <button className="md:hidden p-2.5 rounded-xl hover:bg-[#f8f8f8] transition-all" onClick={() => setMenuOpen(!menuOpen)}>
                <svg className="w-5 h-5 text-[#333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  }
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Category Navigation */}
        <div className="hidden md:block border-t border-[#f0f0f0] bg-[#fafafa]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1 h-10 overflow-x-auto no-scrollbar">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[#555] hover:text-[#C9A96E] hover:bg-white text-[13px] font-medium whitespace-nowrap transition-all border border-transparent hover:border-[#f0f0f0] hover:shadow-sm"
                >
                  <span className="text-[#888]">{NAV_ICONS[link.key]}</span>
                  {link.label}
                </Link>
              ))}
              <div className="ml-auto flex items-center gap-1.5 text-[12px] text-[#999]">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Dubai, UAE</span>
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
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#C9A96E] to-[#D4B87A]">
          <div className="flex items-center gap-2">
            <img src="/novalis-logo.png" alt="Novalis" className="h-7 w-auto brightness-0 invert" />
          </div>
          <button onClick={() => setMenuOpen(false)} className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Search */}
        <form method="GET" action="/shop" className="p-3 border-b border-[#f0f0f0]">
          <div className="flex rounded-xl overflow-hidden bg-[#f5f5f5] border border-[#eee]">
            <input name="search" placeholder="Search products..." className="flex-1 px-3 py-2.5 text-sm outline-none bg-transparent" />
            <button type="submit" className="bg-[#C9A96E] text-white px-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        {/* Category Links */}
        <nav className="p-2 flex flex-col gap-0.5 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
          <p className="text-[10px] font-bold text-[#999] uppercase tracking-wider px-3 py-1.5">Categories</p>
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#333] text-sm font-medium hover:bg-[#FAF6F0] hover:text-[#C9A96E] transition-all"
              onClick={() => setMenuOpen(false)}
            >
              <span className="w-8 h-8 bg-[#f8f8f8] rounded-lg flex items-center justify-center text-[#666]">{NAV_ICONS[link.key]}</span>
              {link.label}
            </Link>
          ))}
          <div className="border-t border-[#f0f0f0] my-1.5" />

          <p className="text-[10px] font-bold text-[#999] uppercase tracking-wider px-3 py-1.5">Quick Access</p>
          <button
            onClick={() => { setMenuOpen(false); setCartOpen(true); }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#333] text-sm font-medium hover:bg-[#FAF6F0] hover:text-[#C9A96E] transition-all w-full text-left"
          >
            <span className="w-8 h-8 bg-[#f8f8f8] rounded-lg flex items-center justify-center text-[#666]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg></span>
            Cart
            {cartCount > 0 && (
              <span className="ml-auto bg-[#C9A96E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <Link
            href="/account/wishlist"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#333] text-sm font-medium hover:bg-[#FAF6F0] hover:text-[#C9A96E] transition-all"
            onClick={() => setMenuOpen(false)}
          >
            <span className="w-8 h-8 bg-[#f8f8f8] rounded-lg flex items-center justify-center text-[#666]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg></span>
            Wishlist
            {wishlistCount > 0 && (
              <span className="ml-auto bg-[#C9A96E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            href={isLoggedIn ? '/account' : '/account/login'}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#333] text-sm font-medium hover:bg-[#FAF6F0] hover:text-[#C9A96E] transition-all"
            onClick={() => setMenuOpen(false)}
          >
            <span className="w-8 h-8 bg-[#f8f8f8] rounded-lg flex items-center justify-center text-[#666]"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></span>
            {isLoggedIn ? 'My Account' : 'Sign In'}
          </Link>
        </nav>

        {/* Bottom CTA */}
        <div className="absolute bottom-8 left-3 right-3">
          <Link
            href="/shop"
            className="btn-primary w-full text-center text-sm py-3 rounded-xl shadow-lg"
            onClick={() => setMenuOpen(false)}
          >
            Shop Now
          </Link>
        </div>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <ToastContainer />
    </>
  );
}
