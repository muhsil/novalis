"use client";

import Link from 'next/link';
import { useEffect, useRef, useState, useCallback } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import CategorySlider from '@/components/ui/CategorySlider';
import { useLocaleStore } from '@/store/useLocaleStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { t, type Locale } from '@/lib/i18n/translations';

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
  locale: Locale;
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
    <section className="fade-up max-w-7xl mx-auto px-6 max-md:px-4 pt-14 max-md:pt-8">
      {/* Section header: centered title with inline arrows (makeup.ae style) */}
      <div className="flex items-center justify-center mb-8 max-md:mb-5 gap-4">
        <h2 className="text-xl max-md:text-base font-normal text-[#191919] text-center italic">
          {t(locale, 'bestsellers.title_1')} {t(locale, 'bestsellers.title_2')}
        </h2>
        <div className="hidden md:flex items-center gap-1.5">
          <button
            onClick={() => scroll('prev')}
            disabled={!canScrollPrev}
            className="w-8 h-8 flex items-center justify-center text-[#191919] disabled:text-[#ccc] hover:text-[#666] transition-colors"
            aria-label="Previous"
          >
            <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0l6-6m-6 6l6 6" /></svg>
          </button>
          <button
            onClick={() => scroll('next')}
            disabled={!canScrollNext}
            className="w-8 h-8 flex items-center justify-center text-[#191919] disabled:text-[#ccc] hover:text-[#666] transition-colors"
            aria-label="Next"
          >
            <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6" /></svg>
          </button>
        </div>
      </div>

      {/* Desktop Slider */}
      <div className="hidden md:block relative">
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

      <div className="text-center mt-6 md:hidden">
        <Link href="/shop" className="inline-flex items-center gap-2 text-[#191919] font-medium text-sm hover:text-[#666] transition-colors">
          {t(locale, 'bestsellers.view_all')}
          <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6" /></svg>
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
      {/* Hero Banner — Clean full-width image banner like makeup.ae */}
      <section className="relative overflow-hidden bg-white">
        <Link href="/shop" className="block">
          <div className="relative w-full" style={{ aspectRatio: '3/1' }}>
            <img
              src="/hero-perfume.png"
              alt={t(locale, 'hero.title_1')}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </section>

      {/* Categories */}
      {topCategories.length > 0 && (
        <section className="fade-up max-w-7xl mx-auto px-6 max-md:px-4 pt-14 max-md:pt-8">
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

      {/* Oud Collection Feature Banner — clean minimal style */}
      <section className="fade-up max-w-7xl mx-auto px-6 max-md:px-4 pt-14 max-md:pt-8">
        <div className="relative overflow-hidden bg-[#f7f7f7]">
          <div className="relative grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-10 max-md:p-6">
              <span className="text-[#999] text-[10px] font-bold tracking-[0.15em] uppercase mb-3 block">{t(locale, 'oud.label')}</span>
              <h2 className="text-2xl max-md:text-xl font-bold text-[#191919] mb-3 leading-tight">
                {t(locale, 'oud.title_1')} {t(locale, 'oud.title_2')}
              </h2>
              <p className="text-[#666] text-sm leading-relaxed mb-6 font-light max-w-md">
                {t(locale, 'oud.description')}
              </p>
              <Link
                href="/shop?category=oud-collection"
                className="inline-flex items-center bg-[#191919] text-white font-semibold text-sm px-6 py-3 hover:bg-[#333] transition-colors"
              >
                {t(locale, 'oud.cta')}
              </Link>
            </div>
            <div className="hidden md:flex items-center justify-center p-8">
              {bestSellers.filter((p: any) => p.categories?.some((c: any) => c.slug === 'oud-collection')).slice(0, 1).map((p: any) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="group">
                  <div className="w-72 h-72 overflow-hidden">
                    <img src={p.images?.[0]?.src} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="fade-up max-w-7xl mx-auto px-6 max-md:px-4 pt-14 max-md:pt-8">
          <div className="flex items-center justify-center mb-8 max-md:mb-5">
            <h2 className="text-xl max-md:text-base font-normal text-[#191919] text-center italic">
              {t(locale, 'arrivals.title_1')} {t(locale, 'arrivals.title_2')}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-md:gap-2.5">
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

      {/* Brand Story — clean light section */}
      <section className="fade-up mt-14 max-md:mt-8">
        <div className="bg-[#f7f7f7]">
          <div className="max-w-3xl mx-auto px-6 max-md:px-4 py-16 max-md:py-10 text-center">
            <span className="text-[#999] text-[10px] font-bold tracking-[0.15em] uppercase mb-3 block">{t(locale, 'brand.label')}</span>
            <h2 className="text-2xl max-md:text-lg font-bold text-[#191919] mb-3 leading-tight">
              {t(locale, 'brand.title_1')} {t(locale, 'brand.title_2')}
            </h2>
            <p className="text-[#666] text-sm leading-relaxed max-w-2xl mx-auto font-light mb-6">
              {t(locale, 'brand.description')}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center bg-[#191919] text-white font-semibold text-sm px-8 py-3 hover:bg-[#333] transition-colors"
            >
              {t(locale, 'brand.cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="fade-up max-w-7xl mx-auto px-6 max-md:px-4 pt-14 max-md:pt-8 pb-14 max-md:pb-24">
        <div className="flex items-center justify-center mb-8 max-md:mb-5">
          <h2 className="text-xl max-md:text-base font-normal text-[#191919] text-center italic">
            {t(locale, 'faq.title_1')} {t(locale, 'faq.title_2')}
          </h2>
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
