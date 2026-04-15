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

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#1A1A2E]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] via-[#1A1A2E] to-[#2A2A4E]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #C9A96E 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-[#C9A96E] blur-[150px]" />
          <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] rounded-full bg-[#C9A96E] blur-[180px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 max-md:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[540px] max-md:min-h-[420px]">
            <div className="py-20 max-md:py-12">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
                <span className="text-[#C9A96E] text-[10px] font-semibold tracking-[0.25em] uppercase">
                  {t(locale, 'hero.subtitle')}
                </span>
              </div>
              <h1 className="font-serif text-5xl max-md:text-3xl font-normal text-white mb-6 leading-[1.1]">
                {t(locale, 'hero.title_1')}{' '}
                <span className="text-[#C9A96E] italic">{t(locale, 'hero.title_highlight')}</span>
              </h1>
              <p className="text-white/40 text-lg max-md:text-sm mb-12 leading-relaxed max-w-lg font-light">
                {t(locale, 'hero.description')}
              </p>
              <div className="flex gap-4 max-md:gap-3">
                <Link
                  href="/shop"
                  className="inline-flex items-center bg-[#C9A96E] text-white font-semibold text-xs px-8 max-md:px-6 py-4 max-md:py-3 hover:bg-[#B8985D] transition-colors tracking-[0.2em] uppercase"
                >
                  {t(locale, 'hero.shop_collection')}
                </Link>
                <Link
                  href="/shop?category=oud-collection"
                  className="hidden md:inline-flex items-center border border-white/20 text-white font-semibold text-xs px-8 py-4 hover:bg-white/5 hover:border-white/40 transition-all tracking-[0.2em] uppercase"
                >
                  {t(locale, 'hero.oud_collection')}
                </Link>
              </div>
            </div>

            {/* Image grid - desktop */}
            <div className="hidden md:grid grid-cols-2 gap-3 p-8">
              {bestSellers.slice(0, 4).map((p: any) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="group">
                  <div className="relative overflow-hidden aspect-square bg-white/5 border border-white/10">
                    <img src={p.images[0].src} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <p className="text-white text-xs font-light line-clamp-1">{p.name}</p>
                      <p className="text-[#C9A96E] text-xs font-medium">{currSymbol} {getPrice(p.price).toFixed(0)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Image strip - mobile */}
            <div className="md:hidden flex gap-2 pb-8 overflow-x-auto no-scrollbar">
              {bestSellers.slice(0, 4).map((p: any) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="shrink-0 w-[80px]">
                  <div className="w-[80px] h-[80px] overflow-hidden bg-white/5 border border-white/10">
                    <img src={p.images[0].src} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[#C9A96E] text-[9px] font-medium mt-1 text-center line-clamp-1">{currSymbol} {getPrice(p.price).toFixed(0)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent" />
      </section>

      {/* Categories */}
      {topCategories.length > 0 && (
        <section className="fade-up max-w-7xl mx-auto px-6 max-md:px-4 pt-16 max-md:pt-10">
          <CategorySlider categories={topCategories} />
        </section>
      )}

      {/* Decorative divider */}
      <div className="max-w-7xl mx-auto px-6 max-md:px-4 pt-16 max-md:pt-10">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#e8e4dc]" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#C9A96E]" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#e8e4dc]" />
        </div>
      </div>

      {/* Best Selling Fragrances */}
      {bestSellers.length > 0 && (
        <section className="fade-up max-w-7xl mx-auto px-6 max-md:px-4 pt-16 max-md:pt-10">
          <div className="text-center mb-10 max-md:mb-6">
            <h2 className="font-serif text-3xl max-md:text-xl font-normal text-[#191919]">
              {t(locale, 'bestsellers.title_1')} <span className="italic text-[#C9A96E]">{t(locale, 'bestsellers.title_2')}</span>
            </h2>
            <p className="text-sm text-[#999] mt-2 font-light">{t(locale, 'bestsellers.subtitle')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-md:gap-2.5">
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
          <div className="text-center mt-10">
            <Link href="/shop" className="inline-flex items-center text-[#C9A96E] font-semibold text-xs hover:underline tracking-[0.2em] uppercase">
              {t(locale, 'bestsellers.view_all')} &rarr;
            </Link>
          </div>
        </section>
      )}

      {/* Oud Collection Feature */}
      <section className="fade-up max-w-7xl mx-auto px-6 max-md:px-4 pt-16 max-md:pt-10">
        <div className="relative overflow-hidden bg-[#1A1A2E]">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#C9A96E] blur-3xl" />
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-10 max-md:p-6">
              <span className="text-[#C9A96E] text-[10px] font-semibold tracking-[0.3em] uppercase mb-4 block">{t(locale, 'oud.label')}</span>
              <h2 className="font-serif text-3xl max-md:text-xl font-normal text-white mb-4">
                {t(locale, 'oud.title_1')} <span className="italic text-[#C9A96E]">{t(locale, 'oud.title_2')}</span>
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-8 font-light max-w-md">
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
                  <div className="w-72 h-72 overflow-hidden border border-white/10">
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
          <div className="text-center mb-10 max-md:mb-6">
            <h2 className="font-serif text-3xl max-md:text-xl font-normal text-[#191919]">
              {t(locale, 'arrivals.title_1')} <span className="italic text-[#C9A96E]">{t(locale, 'arrivals.title_2')}</span>
            </h2>
            <p className="text-sm text-[#999] mt-2 font-light">{t(locale, 'arrivals.subtitle')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-md:gap-2.5">
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
      <section className="fade-up max-w-7xl mx-auto px-6 max-md:px-4 pt-20 max-md:pt-12">
        <div className="bg-[#FAF6F0] p-12 max-md:p-6 text-center">
          <span className="text-[#C9A96E] text-[10px] font-semibold tracking-[0.3em] uppercase mb-4 block">{t(locale, 'brand.label')}</span>
          <h2 className="font-serif text-3xl max-md:text-xl font-normal text-[#191919] mb-4">
            {t(locale, 'brand.title_1')} <span className="italic text-[#C9A96E]">{t(locale, 'brand.title_2')}</span>
          </h2>
          <p className="text-[#666] text-sm leading-relaxed max-w-2xl mx-auto font-light mb-8">
            {t(locale, 'brand.description')}
          </p>
          <Link
            href="/about"
            className="inline-flex items-center border border-[#C9A96E] text-[#C9A96E] font-semibold text-xs px-8 py-3.5 hover:bg-[#C9A96E] hover:text-white transition-colors tracking-[0.2em] uppercase"
          >
            {t(locale, 'brand.cta')}
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="fade-up max-w-7xl mx-auto px-6 max-md:px-4 pt-20 max-md:pt-12 pb-16 max-md:pb-24">
        <div className="text-center mb-10 max-md:mb-6">
          <h2 className="font-serif text-3xl max-md:text-xl font-normal text-[#191919]">
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
        <div className="text-center mt-6">
          <Link href="/faq" className="text-[#C9A96E] font-semibold text-xs hover:underline tracking-[0.2em] uppercase">
            {t(locale, 'faq.view_all')} &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
