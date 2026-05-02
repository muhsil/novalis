"use client";

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import ProductSlider from '@/components/ui/ProductSlider';
import CategorySlider from '@/components/ui/CategorySlider';
import FeatureGrid from '@/components/ui/page/FeatureGrid';
import { useLocaleStore } from '@/store/useLocaleStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { t } from '@/lib/i18n/translations';
import type { HeroBanner } from '@/lib/hero-banners';
import type { FeatureCard } from '@/lib/feature-cards';
import type { HomepageFaq } from '@/lib/faqs';
import type { FeaturePanel } from '@/components/ui/page/FeatureGrid';

type Category = {
  id: number;
  name: string;
  slug: string;
  image?: { src: string } | null;
  count: number;
};

interface HomeContentProps {
  currency: string;
  topCategories: Category[];
  bestSellers: Record<string, unknown>[];
  newArrivals: Record<string, unknown>[];
  heroBanners?: HeroBanner[];
  featureCards?: FeatureCard[];
  faqs?: HomepageFaq[];
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

function toFeaturePanel(card: FeatureCard): FeaturePanel {
  let title = card.title;
  const accent = card.title_accent;
  if (accent && title.toLowerCase().endsWith(accent.toLowerCase())) {
    title = title.slice(0, title.length - accent.length).trim();
  }
  return {
    eyebrow: card.eyebrow || undefined,
    title,
    titleAccent: accent || undefined,
    description: card.description || undefined,
    cta: card.cta_text || undefined,
    href: card.link || undefined,
    image: card.image,
    tone: card.tone as FeaturePanel['tone'],
  };
}

export default function HomeContent({ topCategories, bestSellers, newArrivals, heroBanners = [], featureCards = [], faqs = [] }: HomeContentProps) {
  const locale = useLocaleStore((s) => s.locale);
  const { getSymbol } = useCurrencyStore();
  const currSymbol = getSymbol();
  const wrapRef = useScrollReveal();

  const topCard = featureCards.find((c) => c.position === 'top');
  const bottomCards = featureCards.filter((c) => c.position === 'bottom');

  return (
    <div ref={wrapRef}>
      {/* Hero Banner */}
      {heroBanners.length > 0 ? (
        <Link
          href={heroBanners[0].link || '/shop'}
          className="block relative w-full overflow-hidden bg-[#742938] group"
        >
          <img
            src={heroBanners[0].image}
            alt={heroBanners[0].title}
            className="w-full h-[60vh] min-h-[400px] max-md:h-[42vh] max-md:min-h-[260px] object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
          />
          {(heroBanners[0].subtitle || heroBanners[0].button_text) && (
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 max-md:pb-8 bg-gradient-to-t from-black/40 to-transparent">
              {heroBanners[0].subtitle && (
                <p className="text-white text-lg max-md:text-sm font-light tracking-widest uppercase mb-4 max-md:mb-3 text-center px-4">
                  {heroBanners[0].subtitle}
                </p>
              )}
              {heroBanners[0].button_text && (
                <span className="inline-block border border-white text-white text-sm max-md:text-xs tracking-widest uppercase px-8 max-md:px-5 py-2.5 max-md:py-2 hover:bg-white hover:text-[#742938] transition-colors">
                  {heroBanners[0].button_text}
                </span>
              )}
            </div>
          )}
        </Link>
      ) : (
        <Link href="/shop" className="block relative w-full overflow-hidden bg-[#742938] group">
          <img
            src="/hero-perfume.png"
            alt={t(locale, 'hero.title_1')}
            className="w-full h-[60vh] min-h-[400px] max-md:h-[42vh] max-md:min-h-[260px] object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
          />
        </Link>
      )}

      {/* Categories */}
      {topCategories.length > 0 && (
        <section className="fade-up max-w-7xl mx-auto px-4 max-md:px-3 py-6 max-md:py-3">
          <CategorySlider categories={topCategories} />
        </section>
      )}

      {/* Best Selling Fragrances */}
      {bestSellers.length > 0 && (
        <div className="bg-white py-4 max-md:py-1">
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

      {/* Feature grid — art/bespoke/gift */}
      <FeatureGrid
        top={topCard ? toFeaturePanel(topCard) : {
          eyebrow: t(locale, 'feature.legacy_eyebrow'),
          title: t(locale, 'feature.legacy_title'),
          titleAccent: t(locale, 'feature.legacy_title_accent'),
          description: t(locale, 'feature.legacy_desc'),
          cta: t(locale, 'feature.legacy_cta'),
          href: '/about',
          image: '/novalis-brand-story.png',
        }}
        bottom={bottomCards.length >= 2
          ? [toFeaturePanel(bottomCards[0]), toFeaturePanel(bottomCards[1])]
          : [
              {
                eyebrow: t(locale, 'feature.bespoke_eyebrow'),
                title: t(locale, 'feature.bespoke_title'),
                titleAccent: t(locale, 'feature.bespoke_title_accent'),
                description: t(locale, 'feature.bespoke_desc'),
                cta: t(locale, 'feature.bespoke_cta'),
                href: '/shop?category=oud-collection',
                image: '/novalis-about.png',
              },
              {
                eyebrow: t(locale, 'feature.gift_eyebrow'),
                title: t(locale, 'feature.gift_title'),
                titleAccent: t(locale, 'feature.gift_title_accent'),
                description: t(locale, 'feature.gift_desc'),
                cta: t(locale, 'feature.gift_cta'),
                href: '/shop?category=luxury-fragrances',
                image: '/cat-wedding.png',
              },
            ]
        }
      />

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <div className="bg-[#F9F7F2] py-4 max-md:py-1">
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

      {/* FAQ Section */}
      <section className="fade-up max-w-5xl mx-auto px-4 max-md:px-4 pt-6 max-md:pt-3 pb-6 max-md:pb-24">
        <h2 className="text-2xl max-md:text-lg font-serif text-[#121212] text-center italic mb-6 max-md:mb-3">
          {t(locale, 'faq.title_1')} {t(locale, 'faq.title_2')}
        </h2>
        <div className="grid gap-0">
          {(faqs.length > 0
            ? faqs.map((f) => ({ q: f.question, a: f.answer }))
            : [
                { q: t(locale, 'faq.q1'), a: t(locale, 'faq.a1') },
                { q: t(locale, 'faq.q2'), a: t(locale, 'faq.a2') },
                { q: t(locale, 'faq.q3'), a: t(locale, 'faq.a3') },
                { q: t(locale, 'faq.q4'), a: t(locale, 'faq.a4') },
              ]
          ).map((item) => (
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
