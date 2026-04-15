"use client";

import Link from 'next/link';
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

export default function HomeContent({ currency, topCategories, bestSellers, newArrivals }: HomeContentProps) {
  const locale = useLocaleStore((s) => s.locale);
  const { selectedCurrency, convertPrice, getSymbol } = useCurrencyStore();
  const displayCurrency = selectedCurrency || currency;
  const currSymbol = selectedCurrency !== 'AED' ? getSymbol() : currency;

  const formatPrice = (price: number) => {
    const converted = selectedCurrency !== 'AED' ? convertPrice(price) : price;
    return `${currSymbol} ${converted.toFixed(0)}`;
  };

  return (
    <>
      <TrustBanner currency={currSymbol} />

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#1A1A2E]">
        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] via-[#1A1A2E] to-[#2A2A4E]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #C9A96E 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        {/* Glow effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-[#C9A96E] blur-[120px]" />
          <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-[#C9A96E] blur-[150px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 max-md:px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[480px] max-md:min-h-[380px]">
            {/* Text */}
            <div className="py-16 max-md:py-10">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] animate-pulse" />
                <span className="text-[#C9A96E] text-xs font-semibold tracking-[0.2em] uppercase">
                  {t(locale, 'hero.subtitle')}
                </span>
              </div>
              <h1 className="text-5xl max-md:text-3xl font-light text-white mb-5 leading-[1.1]">
                {t(locale, 'hero.title_1')}{' '}
                <span className="font-semibold text-[#C9A96E]">{t(locale, 'hero.title_highlight')}</span>
              </h1>
              <p className="text-white/50 text-lg max-md:text-sm mb-10 leading-relaxed max-w-lg font-light">
                {t(locale, 'hero.description')}
              </p>
              <div className="flex gap-4 max-md:gap-3">
                <Link
                  href="/shop"
                  className="inline-flex items-center bg-[#C9A96E] text-white font-semibold text-sm px-8 max-md:px-6 py-3.5 max-md:py-3 rounded-none hover:bg-[#B8985D] transition-colors tracking-wide uppercase"
                >
                  {t(locale, 'hero.shop_collection')}
                </Link>
                <Link
                  href="/shop?category=oud-collection"
                  className="hidden md:inline-flex items-center border border-white/20 text-white font-semibold text-sm px-8 py-3.5 rounded-none hover:bg-white/5 hover:border-white/40 transition-all tracking-wide uppercase"
                >
                  {t(locale, 'hero.oud_collection')}
                </Link>
              </div>
            </div>

            {/* Image grid - desktop */}
            <div className="hidden md:grid grid-cols-2 gap-3 p-6">
              {bestSellers.slice(0, 4).map((p: any) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="group">
                  <div className="relative overflow-hidden aspect-square bg-white/5 border border-white/10">
                    <img src={p.images[0].src} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <p className="text-white text-xs font-medium line-clamp-1">{p.name}</p>
                      <p className="text-[#C9A96E] text-xs font-semibold">{formatPrice(parseFloat(p.price || '0'))}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Image strip - mobile */}
            <div className="md:hidden flex gap-2 pb-6 overflow-x-auto no-scrollbar">
              {bestSellers.slice(0, 4).map((p: any) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="shrink-0 w-[80px]">
                  <div className="w-[80px] h-[80px] overflow-hidden bg-white/5 border border-white/10">
                    <img src={p.images[0].src} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[#C9A96E] text-[9px] font-medium mt-1 text-center line-clamp-1">{formatPrice(parseFloat(p.price || '0'))}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent" />
      </section>

      {/* Categories */}
      {topCategories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 max-md:px-3 pt-8">
          <CategorySlider categories={topCategories} />
        </section>
      )}

      {/* Best Selling Fragrances */}
      {bestSellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 max-md:px-3 pt-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl max-md:text-lg font-light text-[#191919] tracking-wide">
              {t(locale, 'bestsellers.title_1')} <span className="font-semibold">{t(locale, 'bestsellers.title_2')}</span>
            </h2>
            <p className="text-sm text-[#999] mt-1 font-light">{t(locale, 'bestsellers.subtitle')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-md:gap-2">
            {bestSellers.slice(0, 8).map((p: any) => (
              <ProductCard
                key={p.id}
                slug={p.slug}
                name={p.name}
                price={selectedCurrency !== 'AED' ? convertPrice(parseFloat(p.price || '0')) : parseFloat(p.price || '0')}
                regularPrice={p.regular_price ? (selectedCurrency !== 'AED' ? convertPrice(parseFloat(p.regular_price)) : parseFloat(p.regular_price)) : null}
                imageSrc={p.images?.[0]?.src}
                categoryName={p.categories?.[0]?.name}
                onSale={p.on_sale}
                featured={p.featured}
                currency={currSymbol}
              />
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/shop" className="inline-flex items-center text-[#C9A96E] font-semibold text-sm hover:underline tracking-wide uppercase">
              {t(locale, 'bestsellers.view_all')} &rarr;
            </Link>
          </div>
        </section>
      )}

      {/* Oud Collection Feature */}
      <section className="max-w-7xl mx-auto px-4 max-md:px-3 pt-10">
        <div className="relative overflow-hidden bg-[#1A1A2E] rounded-lg">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#C9A96E] blur-3xl" />
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-8 max-md:p-5">
              <span className="text-[#C9A96E] text-xs font-semibold tracking-[0.25em] uppercase mb-3 block">{t(locale, 'oud.label')}</span>
              <h2 className="text-2xl max-md:text-xl font-light text-white mb-3">
                {t(locale, 'oud.title_1')} <span className="font-semibold text-[#C9A96E]">{t(locale, 'oud.title_2')}</span>
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-6 font-light max-w-md">
                {t(locale, 'oud.description')}
              </p>
              <Link
                href="/shop?category=oud-collection"
                className="inline-flex items-center bg-[#C9A96E] text-white font-semibold text-sm px-6 py-2.5 rounded-none hover:bg-[#B8985D] transition-colors tracking-wide uppercase"
              >
                {t(locale, 'oud.cta')}
              </Link>
            </div>
            <div className="hidden md:flex items-center justify-center p-8">
              {bestSellers.filter((p: any) => p.categories?.some((c: any) => c.slug === 'oud-collection')).slice(0, 1).map((p: any) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="group">
                  <div className="w-64 h-64 overflow-hidden border border-white/10">
                    <img src={p.images[0].src} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 max-md:px-3 pt-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl max-md:text-lg font-light text-[#191919] tracking-wide">
              {t(locale, 'arrivals.title_1')} <span className="font-semibold">{t(locale, 'arrivals.title_2')}</span>
            </h2>
            <p className="text-sm text-[#999] mt-1 font-light">{t(locale, 'arrivals.subtitle')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-md:gap-2">
            {newArrivals.slice(0, 8).map((p: any) => (
              <ProductCard
                key={p.id}
                slug={p.slug}
                name={p.name}
                price={selectedCurrency !== 'AED' ? convertPrice(parseFloat(p.price || '0')) : parseFloat(p.price || '0')}
                regularPrice={p.regular_price ? (selectedCurrency !== 'AED' ? convertPrice(parseFloat(p.regular_price)) : parseFloat(p.regular_price)) : null}
                imageSrc={p.images?.[0]?.src}
                categoryName={p.categories?.[0]?.name}
                onSale={p.on_sale}
                featured={p.featured}
                currency={currSymbol}
              />
            ))}
          </div>
        </section>
      )}

      {/* Brand Story */}
      <section className="max-w-7xl mx-auto px-4 max-md:px-3 pt-10">
        <div className="bg-[#FAF6F0] rounded-lg p-8 max-md:p-5 text-center">
          <span className="text-[#C9A96E] text-xs font-semibold tracking-[0.25em] uppercase mb-3 block">{t(locale, 'brand.label')}</span>
          <h2 className="text-2xl max-md:text-xl font-light text-[#191919] mb-3">
            {t(locale, 'brand.title_1')} <span className="font-semibold">{t(locale, 'brand.title_2')}</span>
          </h2>
          <p className="text-[#666] text-sm leading-relaxed max-w-2xl mx-auto font-light mb-6">
            {t(locale, 'brand.description')}
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center bg-[#C9A96E] text-white font-semibold text-sm px-8 py-3 rounded-none hover:bg-[#B8985D] transition-colors tracking-wide uppercase"
          >
            {t(locale, 'brand.cta')}
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 max-md:px-3 pt-10 pb-10 max-md:pb-20">
        <div className="text-center mb-6">
          <h2 className="text-2xl max-md:text-lg font-light text-[#191919] tracking-wide">
            {t(locale, 'faq.title_1')} <span className="font-semibold">{t(locale, 'faq.title_2')}</span>
          </h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-2">
          {[
            { q: t(locale, 'faq.q1'), a: t(locale, 'faq.a1') },
            { q: t(locale, 'faq.q2'), a: t(locale, 'faq.a2') },
            { q: t(locale, 'faq.q3'), a: t(locale, 'faq.a3') },
            { q: t(locale, 'faq.q4'), a: t(locale, 'faq.a4') },
          ].map((item) => (
            <details key={item.q} className="bg-white rounded-lg border border-[#f0f0f0] group">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium text-[#191919] hover:bg-[#fafafa] transition-colors">
                {item.q}
                <svg className="w-4 h-4 text-[#C9A96E] shrink-0 ml-2 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="px-5 pb-4 text-sm text-[#666] leading-relaxed font-light">{item.a}</p>
            </details>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link href="/faq" className="text-[#C9A96E] font-semibold text-sm hover:underline tracking-wide uppercase">
            {t(locale, 'faq.view_all')} &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
