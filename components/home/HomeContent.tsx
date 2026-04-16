"use client";

import Link from 'next/link';
import { useEffect, useRef, useState, useCallback } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import CategorySlider from '@/components/ui/CategorySlider';
import { useLocaleStore } from '@/store/useLocaleStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { t } from '@/lib/i18n/translations';

interface HomeContentProps {
  currency: string;
  topCategories: any[];
  bestSellers: any[];
  newArrivals: any[];
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sections = el.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);
  return ref;
}

interface BestSellerSliderProps {
  bestSellers: any[];
  locale: string;
  currSymbol: string;
  getPrice: (price: string) => number;
  getRegPrice: (price: string | undefined) => number | null;
}

function BestSellerSlider({ bestSellers, locale, currSymbol, getPrice, getRegPrice }: BestSellerSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const isRTL = locale === 'ar';

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const absScroll = Math.abs(el.scrollLeft);
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollPrev(absScroll > 4);
    setCanScrollNext(absScroll < maxScroll - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: 'prev' | 'next') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    const scrollAmount = direction === 'prev' ? -amount : amount;
    el.scrollBy({ left: isRTL ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="fade-up max-w-7xl mx-auto px-6 max-md:px-4 pt-16 max-md:pt-10">
      <div className="flex items-center justify-between mb-8 max-md:mb-6">
        <h2 className="text-xl max-md:text-lg font-bold text-[#191919] uppercase tracking-wide">
          {t(locale, 'bestsellers.title_1')} {t(locale, 'bestsellers.title_2')}
        </h2>
        <Link href="/shop" className="text-[13px] font-medium text-[#191919] hover:text-[#C9A96E] transition-colors hidden md:flex items-center gap-1">
          {t(locale, 'bestsellers.view_all')}
          <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </Link>
      </div>

      {/* Desktop Slider */}
      <div className="hidden md:block relative group">
        {canScrollPrev && (
          <button
            onClick={() => scroll('prev')}
            className="absolute -start-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#C9A96E] hover:border-[#C9A96E]/20 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Scroll previous"
          >
            <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>
        )}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-2"
          style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        >
          {bestSellers.slice(0, 8).map((p: any) => (
            <div key={p.id} className="shrink-0 w-[calc(25%-15px)]" style={{ scrollSnapAlign: 'start' }}>
              <ProductCard
                slug={p.slug}
                name={p.name}
                price={getPrice(p.price)}
                regularPrice={getRegPrice(p.regular_price)}
                imageSrc={p.images?.[0]?.src}
                categoryName={p.categories?.[0]?.name}
                onSale={p.on_sale}
                featured={p.featured}
                currency={currSymbol}
                productId={p.id}
              />
            </div>
          ))}
        </div>
        {canScrollNext && (
          <button
            onClick={() => scroll('next')}
            className="absolute -end-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#C9A96E] hover:border-[#C9A96E]/20 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Scroll next"
          >
            <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>
        )}
      </div>

      {/* Mobile Grid */}
      <div className="md:hidden grid grid-cols-2 gap-3">
        {bestSellers.slice(0, 8).map((p: any) => (
          <ProductCard
            key={p.id}
            slug={p.slug}
            name={p.name}
            price={getPrice(p.price)}
            regularPrice={getRegPrice(p.regular_price)}
            imageSrc={p.images?.[0]?.src}
            categoryName={p.categories?.[0]?.name}
            onSale={p.on_sale}
            featured={p.featured}
            currency={currSymbol}
            productId={p.id}
          />
        ))}
      </div>

      <div className="text-center mt-8 md:hidden">
        <Link href="/shop" className="inline-flex items-center gap-2 text-[#191919] font-semibold text-xs px-6 py-3 border border-[#191919] hover:bg-[#191919] hover:text-white transition-colors tracking-wide uppercase">
          {t(locale, 'bestsellers.view_all')}
          <svg className="w-3.5 h-3.5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </section>
  );
}

export default function HomeContent({ currency, topCategories, bestSellers, newArrivals }: HomeContentProps) {
  const locale = useLocaleStore((s) => s.locale);
  const { selectedCurrency, convertPrice, getSymbol } = useCurrencyStore();
  const currSymbol = selectedCurrency !== 'AED' ? getSymbol() : currency;
  const wrapRef = useScrollReveal();

  const getPrice = (price: string) => {
    const num = parseFloat(price || '0');
    return selectedCurrency !== 'AED' ? convertPrice(num) : num;
  };
  const getRegPrice = (price: string | undefined) => {
    if (!price) return null;
    const num = parseFloat(price);
    return selectedCurrency !== 'AED' ? convertPrice(num) : num;
  };

  return (
    <div ref={wrapRef}>
      {/* Hero Banner — Full-width with overlay */}
      <section className="relative overflow-hidden bg-[#191919] min-h-[520px] max-md:min-h-[400px]">
        <div className="absolute inset-0">
          <img
            src="/hero-perfume.png"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-[#191919]/80 via-[#191919]/50 to-transparent max-md:bg-gradient-to-t max-md:from-[#191919]/90 max-md:via-[#191919]/60 max-md:to-[#191919]/20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 max-md:px-4 flex items-center min-h-[520px] max-md:min-h-[400px]">
          <div className="max-w-lg py-16 max-md:py-12 max-md:mt-auto">
            <span className="text-white/60 text-[11px] font-medium tracking-[0.2em] uppercase mb-4 block">
              {t(locale, 'hero.subtitle')}
            </span>
            <h1 className="text-[44px] max-md:text-[28px] font-bold text-white mb-4 leading-[1.1]">
              {t(locale, 'hero.title_1')}{' '}
              <span className="text-[#C9A96E]">{t(locale, 'hero.title_highlight')}</span>
            </h1>
            <p className="text-white/50 text-base max-md:text-sm mb-8 max-md:mb-6 leading-relaxed max-w-md font-light">
              {t(locale, 'hero.description')}
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center bg-white text-[#191919] font-semibold text-sm px-8 max-md:px-6 py-3.5 max-md:py-3 hover:bg-[#f5f5f5] transition-colors"
            >
              {t(locale, 'hero.shop_collection')}
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      {topCategories.length > 0 && (
        <section className="fade-up max-w-7xl mx-auto px-6 max-md:px-4 pt-16 max-md:pt-10">
          <CategorySlider categories={topCategories} />
        </section>
      )}

      {/* Best Selling Fragrances — Desktop Slider */}
      {bestSellers.length > 0 && (
        <BestSellerSlider
          bestSellers={bestSellers}
          locale={locale}
          currSymbol={currSymbol}
          getPrice={getPrice}
          getRegPrice={getRegPrice}
        />
      )}

      {/* Oud Collection Feature Banner */}
      <section className="fade-up max-w-7xl mx-auto px-6 max-md:px-4 pt-16 max-md:pt-10">
        <div className="relative overflow-hidden bg-[#191919]">
          <div className="relative grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-10 max-md:p-6">
              <span className="text-[#C9A96E] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">{t(locale, 'oud.label')}</span>
              <h2 className="text-2xl max-md:text-xl font-bold text-white mb-4 leading-tight">
                {t(locale, 'oud.title_1')} <span className="text-[#C9A96E]">{t(locale, 'oud.title_2')}</span>
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-8 font-light max-w-md">
                {t(locale, 'oud.description')}
              </p>
              <Link
                href="/shop?category=oud-collection"
                className="inline-flex items-center bg-white text-[#191919] font-semibold text-sm px-6 py-3 hover:bg-[#f5f5f5] transition-colors"
              >
                {t(locale, 'oud.cta')}
              </Link>
            </div>
            <div className="hidden md:flex items-center justify-center p-8">
              {bestSellers.filter((p: any) => p.categories?.some((c: any) => c.slug === 'oud-collection')).slice(0, 1).map((p: any) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="group">
                  <div className="w-72 h-72 overflow-hidden">
                    <img src={p.images[0].src} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="fade-up max-w-7xl mx-auto px-6 max-md:px-4 pt-16 max-md:pt-10">
          <div className="flex items-center justify-between mb-8 max-md:mb-6">
            <h2 className="text-xl max-md:text-lg font-bold text-[#191919] uppercase tracking-wide">
              {t(locale, 'arrivals.title_1')} {t(locale, 'arrivals.title_2')}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-md:gap-3">
            {newArrivals.slice(0, 8).map((p: any) => (
              <ProductCard
                key={p.id}
                slug={p.slug}
                name={p.name}
                price={getPrice(p.price)}
                regularPrice={getRegPrice(p.regular_price)}
                imageSrc={p.images?.[0]?.src}
                categoryName={p.categories?.[0]?.name}
                onSale={p.on_sale}
                featured={p.featured}
                currency={currSymbol}
                productId={p.id}
              />
            ))}
          </div>
        </section>
      )}

      {/* Brand Story */}
      <section className="fade-up relative overflow-hidden mt-16 max-md:mt-10">
        <div className="absolute inset-0">
          <img
            src="/novalis-brand-story.png"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#191919]/80" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 max-md:px-4 py-20 max-md:py-12 text-center">
          <span className="text-[#C9A96E] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">{t(locale, 'brand.label')}</span>
          <h2 className="text-3xl max-md:text-xl font-bold text-white mb-4 leading-tight">
            {t(locale, 'brand.title_1')} <span className="text-[#C9A96E]">{t(locale, 'brand.title_2')}</span>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-2xl mx-auto font-light mb-8">
            {t(locale, 'brand.description')}
          </p>
          <Link
            href="/about"
            className="inline-flex items-center bg-white text-[#191919] font-semibold text-sm px-8 py-3.5 hover:bg-[#f5f5f5] transition-colors"
          >
            {t(locale, 'brand.cta')}
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="fade-up max-w-7xl mx-auto px-6 max-md:px-4 pt-16 max-md:pt-10 pb-16 max-md:pb-24">
        <div className="flex items-center justify-between mb-8 max-md:mb-6">
          <h2 className="text-xl max-md:text-lg font-bold text-[#191919] uppercase tracking-wide">
            {t(locale, 'faq.title_1')} {t(locale, 'faq.title_2')}
          </h2>
          <Link href="/faq" className="text-[13px] font-medium text-[#191919] hover:text-[#C9A96E] transition-colors hidden md:flex items-center gap-1">
            {t(locale, 'faq.view_all')}
            <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
        <div className="max-w-full space-y-2">
          {[
            { q: t(locale, 'faq.q1'), a: t(locale, 'faq.a1') },
            { q: t(locale, 'faq.q2'), a: t(locale, 'faq.a2') },
            { q: t(locale, 'faq.q3'), a: t(locale, 'faq.a3') },
            { q: t(locale, 'faq.q4'), a: t(locale, 'faq.a4') },
          ].map((item) => (
            <details key={item.q} className="bg-white border border-[#e8e8e8] group">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium text-[#191919] hover:bg-[#f5f5f5] transition-colors">
                {item.q}
                <svg className="w-4 h-4 text-[#999] shrink-0 ms-3 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="px-5 pb-4 text-sm text-[#666] leading-relaxed font-light">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
