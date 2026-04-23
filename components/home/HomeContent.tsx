"use client";

import Link from 'next/link';
import { useEffect, useRef, useState, useCallback } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import ProductSlider from '@/components/ui/ProductSlider';
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

// Abstracted ProductSlider logic moved to elements...

export default function HomeContent({ currency, topCategories, bestSellers, newArrivals }: HomeContentProps) {
  const locale = useLocaleStore((s) => s.locale);
  const { selectedCurrency, convertPrice, getSymbol } = useCurrencyStore();
  const currSymbol = getSymbol();
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
      {/* Hero Banner — image only */}
      <Link href="/shop" className="block relative w-full overflow-hidden bg-[#742938] group">
        <img
          src="/hero-perfume.png"
          alt={t(locale, 'hero.title_1')}
          className="w-full h-[60vh] min-h-[400px] max-md:h-[55vh] max-md:min-h-[300px] object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
        />
      </Link>

      {/* Categories */}
      {topCategories.length > 0 && (
        <section className="fade-up max-w-7xl mx-auto px-4 max-md:px-3 py-10 max-md:py-5">
          <CategorySlider categories={topCategories} />
        </section>
      )}

      {/* Best Selling Fragrances */}
      {bestSellers.length > 0 && (
        <div className="bg-white py-10 max-md:py-5">
          <ProductSlider
            products={bestSellers}
            locale={locale}
            currSymbol={currSymbol}
            title1={t(locale, 'bestsellers.title_1')}
            title2={t(locale, 'bestsellers.title_2')}
            viewAllLink="/shop"
            viewAllText={t(locale, 'bestsellers.view_all')}
          />
        </div>
      )}

      {/* Oud Collection Feature Banner */}
      <section className="fade-up max-w-7xl mx-auto px-4 max-md:px-3 py-10 max-md:py-5">
        <div className="relative overflow-hidden bg-[#742938] flex flex-col md:flex-row items-center group">
          {/* Image first on mobile */}
          <div className="w-full md:w-1/2 h-[220px] md:h-[500px] overflow-hidden order-1 md:order-2">
            <img src="/novalis-brand-story.png" alt="Oud Collection" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" />
          </div>
          <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-20 order-2 md:order-1">
            <span className="text-[#D4AFB9] text-[10px] font-bold tracking-[0.3em] uppercase mb-3 block">{t(locale, 'oud.label')}</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-white mb-3 leading-tight">
              {t(locale, 'oud.title_1')} <span className="italic">{t(locale, 'oud.title_2')}</span>
            </h2>
            <p className="text-[#F9F7F2]/60 text-sm leading-relaxed mb-5 font-light max-w-md">{t(locale, 'oud.description')}</p>
            <Link href="/shop?category=oud-collection" className="inline-flex items-center gap-3 text-[#D4AFB9] font-semibold text-xs tracking-widest uppercase hover:gap-5 transition-all duration-300">
              {t(locale, 'oud.cta')}
              <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <div className="bg-[#F9F7F2] py-10 max-md:py-5">
          <ProductSlider
            products={newArrivals.slice(0, 10)}
            locale={locale}
            currSymbol={currSymbol}
            title1={t(locale, 'arrivals.title_1')}
            title2={t(locale, 'arrivals.title_2')}
            viewAllLink="/shop"
            viewAllText={t(locale, 'nav.shop_now')}
          />
        </div>
      )}

      {/* Brand Story */}
      <section className="fade-up mt-6 max-md:mt-3">
        <div className="bg-[#742938]">
          <div className="max-w-3xl mx-auto px-5 max-md:px-4 py-10 max-md:py-8 text-center">
            <span className="text-[#D4AFB9] text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block">{t(locale, 'brand.label')}</span>
            <h2 className="text-3xl max-md:text-xl font-serif text-white mb-3 leading-tight">
              {t(locale, 'brand.title_1')} <span className="italic text-[#D4AFB9]">{t(locale, 'brand.title_2')}</span>
            </h2>
            <p className="text-[#F9F7F2]/60 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto font-light mb-6 max-md:hidden">
              {t(locale, 'brand.description')}
            </p>
            <Link href="/about" className="inline-flex items-center text-[#D4AFB9] border border-[#D4AFB9] font-semibold text-xs tracking-widest uppercase px-8 py-3 hover:bg-[#D4AFB9] hover:text-[#121212] transition-colors">
              {t(locale, 'brand.cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="fade-up max-w-5xl mx-auto px-4 max-md:px-4 pt-8 max-md:pt-6 pb-6 max-md:pb-24">
        <h2 className="text-2xl max-md:text-lg font-serif text-[#121212] text-center italic mb-6 max-md:mb-4">
          {t(locale, 'faq.title_1')} {t(locale, 'faq.title_2')}
        </h2>
        <div className="grid gap-0">
          {[
            { q: t(locale, 'faq.q1'), a: t(locale, 'faq.a1') },
            { q: t(locale, 'faq.q2'), a: t(locale, 'faq.a2') },
            { q: t(locale, 'faq.q3'), a: t(locale, 'faq.a3') },
            { q: t(locale, 'faq.q4'), a: t(locale, 'faq.a4') },
          ].map((item) => (
            <details key={item.q} className="bg-transparent border-b border-[#E8E4DE] group">
              <summary className="flex items-center justify-between py-3.5 cursor-pointer text-sm font-semibold tracking-wide text-[#121212] hover:text-[#742938] transition-colors">
                {item.q}
                <svg className="w-4 h-4 text-[#D4AFB9] shrink-0 ms-3 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="pb-4 text-sm text-[#888888] leading-relaxed font-light pe-6">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
