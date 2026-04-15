"use client";

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import TrustBanner from '@/components/ui/TrustBanner';
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
      <TrustBanner currency={currSymbol} />

      {/* Hero Banner — Full-bleed lifestyle image */}
      <section className="relative overflow-hidden bg-[#1A1A2E] min-h-[600px] max-md:min-h-[500px]">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/hero-perfume.png"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E]/90 via-[#1A1A2E]/60 to-transparent max-md:bg-gradient-to-t max-md:from-[#1A1A2E]/95 max-md:via-[#1A1A2E]/70 max-md:to-[#1A1A2E]/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 max-md:px-4 flex items-center min-h-[600px] max-md:min-h-[500px]">
          <div className="max-w-xl py-20 max-md:py-16 max-md:mt-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-5 py-2 mb-8 max-md:mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
              <span className="text-[#C9A96E] text-[10px] font-semibold tracking-[0.3em] uppercase">
                {t(locale, 'hero.subtitle')}
              </span>
            </div>
            <h1 className="font-serif text-[56px] max-md:text-[32px] font-normal text-white mb-6 leading-[1.08] tracking-tight">
              {t(locale, 'hero.title_1')}{' '}
              <span className="text-[#C9A96E] italic">{t(locale, 'hero.title_highlight')}</span>
            </h1>
            <p className="text-white/50 text-lg max-md:text-sm mb-12 max-md:mb-8 leading-relaxed max-w-md font-light">
              {t(locale, 'hero.description')}
            </p>
            <div className="flex gap-4 max-md:gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center bg-[#C9A96E] text-white font-semibold text-xs px-10 max-md:px-7 py-4 max-md:py-3.5 hover:bg-[#B8985D] transition-colors tracking-[0.2em] uppercase"
              >
                {t(locale, 'hero.shop_collection')}
              </Link>
              <Link
                href="/shop?category=oud-collection"
                className="hidden md:inline-flex items-center border border-white/25 text-white font-semibold text-xs px-10 py-4 hover:bg-white/10 hover:border-white/40 transition-all tracking-[0.2em] uppercase backdrop-blur-sm"
              >
                {t(locale, 'hero.oud_collection')}
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent" />
      </section>

      {/* Categories */}
      {topCategories.length > 0 && (
        <section className="fade-up max-w-7xl mx-auto px-6 max-md:px-4 pt-20 max-md:pt-12">
          <CategorySlider categories={topCategories} />
        </section>
      )}

      {/* Decorative divider */}
      <div className="max-w-7xl mx-auto px-6 max-md:px-4 pt-20 max-md:pt-12">
        <div className="flex items-center gap-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#e8e4dc]" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#C9A96E]" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#e8e4dc]" />
        </div>
      </div>

      {/* Best Selling Fragrances */}
      {bestSellers.length > 0 && (
        <section className="fade-up max-w-7xl mx-auto px-6 max-md:px-4 pt-20 max-md:pt-12">
          <div className="text-center mb-12 max-md:mb-8">
            <span className="text-[#C9A96E] text-[10px] font-semibold tracking-[0.3em] uppercase mb-3 block">
              {t(locale, 'bestsellers.subtitle')}
            </span>
            <h2 className="font-serif text-4xl max-md:text-2xl font-normal text-[#191919]">
              {t(locale, 'bestsellers.title_1')} <span className="italic text-[#C9A96E]">{t(locale, 'bestsellers.title_2')}</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-md:gap-3">
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
          <div className="text-center mt-12">
            <Link href="/shop" className="inline-flex items-center gap-2 border border-[#C9A96E] text-[#C9A96E] font-semibold text-xs px-8 py-3.5 hover:bg-[#C9A96E] hover:text-white transition-colors tracking-[0.2em] uppercase">
              {t(locale, 'bestsellers.view_all')}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </section>
      )}

      {/* Oud Collection Feature — with image */}
      <section className="fade-up max-w-7xl mx-auto px-6 max-md:px-4 pt-24 max-md:pt-14">
        <div className="relative overflow-hidden bg-[#1A1A2E]">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#C9A96E] blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#C9A96E] blur-[80px]" />
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-12 max-md:p-8">
              <span className="text-[#C9A96E] text-[10px] font-semibold tracking-[0.3em] uppercase mb-5 block">{t(locale, 'oud.label')}</span>
              <h2 className="font-serif text-4xl max-md:text-2xl font-normal text-white mb-5 leading-tight">
                {t(locale, 'oud.title_1')} <span className="italic text-[#C9A96E]">{t(locale, 'oud.title_2')}</span>
              </h2>
              <p className="text-white/45 text-sm leading-relaxed mb-10 font-light max-w-md">
                {t(locale, 'oud.description')}
              </p>
              <Link
                href="/shop?category=oud-collection"
                className="inline-flex items-center bg-[#C9A96E] text-white font-semibold text-xs px-8 py-3.5 hover:bg-[#B8985D] transition-colors tracking-[0.2em] uppercase"
              >
                {t(locale, 'oud.cta')}
              </Link>
            </div>
            <div className="hidden md:flex items-center justify-center p-10">
              {bestSellers.filter((p: any) => p.categories?.some((c: any) => c.slug === 'oud-collection')).slice(0, 1).map((p: any) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="group">
                  <div className="w-80 h-80 overflow-hidden border border-white/10">
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
        <section className="fade-up max-w-7xl mx-auto px-6 max-md:px-4 pt-24 max-md:pt-14">
          <div className="text-center mb-12 max-md:mb-8">
            <span className="text-[#C9A96E] text-[10px] font-semibold tracking-[0.3em] uppercase mb-3 block">
              {t(locale, 'arrivals.subtitle')}
            </span>
            <h2 className="font-serif text-4xl max-md:text-2xl font-normal text-[#191919]">
              {t(locale, 'arrivals.title_1')} <span className="italic text-[#C9A96E]">{t(locale, 'arrivals.title_2')}</span>
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

      {/* Brand Story — with background image */}
      <section className="fade-up relative overflow-hidden mt-24 max-md:mt-14">
        <div className="absolute inset-0">
          <img
            src="/novalis-brand-story.png"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1A1A2E]/80" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 max-md:px-4 py-24 max-md:py-14 text-center">
          <span className="text-[#C9A96E] text-[10px] font-semibold tracking-[0.3em] uppercase mb-5 block">{t(locale, 'brand.label')}</span>
          <h2 className="font-serif text-4xl max-md:text-2xl font-normal text-white mb-5 leading-tight">
            {t(locale, 'brand.title_1')} <span className="italic text-[#C9A96E]">{t(locale, 'brand.title_2')}</span>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-2xl mx-auto font-light mb-10">
            {t(locale, 'brand.description')}
          </p>
          <Link
            href="/about"
            className="inline-flex items-center border border-white/30 text-white font-semibold text-xs px-10 py-4 hover:bg-white/10 hover:border-white/50 transition-colors tracking-[0.2em] uppercase backdrop-blur-sm"
          >
            {t(locale, 'brand.cta')}
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="fade-up max-w-7xl mx-auto px-6 max-md:px-4 pt-24 max-md:pt-14 pb-20 max-md:pb-28">
        <div className="text-center mb-12 max-md:mb-8">
          <h2 className="font-serif text-4xl max-md:text-2xl font-normal text-[#191919]">
            {t(locale, 'faq.title_1')} <span className="italic text-[#C9A96E]">{t(locale, 'faq.title_2')}</span>
          </h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {[
            { q: t(locale, 'faq.q1'), a: t(locale, 'faq.a1') },
            { q: t(locale, 'faq.q2'), a: t(locale, 'faq.a2') },
            { q: t(locale, 'faq.q3'), a: t(locale, 'faq.a3') },
            { q: t(locale, 'faq.q4'), a: t(locale, 'faq.a4') },
          ].map((item) => (
            <details key={item.q} className="bg-white border border-[#f0f0f0] group">
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer text-sm font-medium text-[#191919] hover:bg-[#fafafa] transition-colors">
                {item.q}
                <svg className="w-4 h-4 text-[#C9A96E] shrink-0 ml-3 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="px-6 pb-5 text-sm text-[#666] leading-relaxed font-light">{item.a}</p>
            </details>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/faq" className="text-[#C9A96E] font-semibold text-xs hover:underline tracking-[0.2em] uppercase">
            {t(locale, 'faq.view_all')} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
