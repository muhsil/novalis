"use client";

import Link from 'next/link';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useLocaleStore } from '@/store/useLocaleStore';
import { t } from '@/lib/i18n/translations';

interface Category {
  id: number;
  name: string;
  slug: string;
  image?: { src: string } | null;
  count: number;
}

interface CategorySliderProps {
  categories: Category[];
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  perfumes: 'from-[#191919] to-[#333]',
  'luxury-fragrances': 'from-[#2A1A1E] to-[#3A2A2E]',
  'oud-collection': 'from-[#1A1A0E] to-[#2A2A1E]',
  oils: 'from-[#0E1A1A] to-[#1E2A2A]',
  dokhun: 'from-[#1A0E1A] to-[#2A1E2A]',
  'all-over-spray': 'from-[#0E0E1A] to-[#1E1E2A]',
};

export default function CategorySlider({ categories }: CategorySliderProps) {
  const locale = useLocaleStore((s) => s.locale);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const isRTL = locale === 'ar';

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const absScroll = Math.abs(el.scrollLeft);
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(absScroll > 4);
    setCanScrollRight(absScroll < maxScroll - 4);
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
    <div className="relative group">
      {/* Section Header: centered title with inline arrows (makeup.ae style) */}
      <div className="flex items-center justify-center mb-6 max-md:mb-4 gap-4">
        <h2 className="text-xl max-md:text-base font-normal text-[#191919] text-center italic">
          {t(locale, 'categories.title_1')} {t(locale, 'categories.title_2')}
        </h2>
        <div className="hidden md:flex items-center gap-1.5">
          <button
            onClick={() => scroll('prev')}
            disabled={!canScrollLeft}
            className="w-8 h-8 flex items-center justify-center text-[#191919] disabled:text-[#ccc] hover:text-[#666] transition-colors"
            aria-label="Previous"
          >
            <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0l6-6m-6 6l6 6" /></svg>
          </button>
          <button
            onClick={() => scroll('next')}
            disabled={!canScrollRight}
            className="w-8 h-8 flex items-center justify-center text-[#191919] disabled:text-[#ccc] hover:text-[#666] transition-colors"
            aria-label="Next"
          >
            <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6" /></svg>
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Scrollable Track */}
        <div
          ref={scrollRef}
          className="flex gap-4 max-md:gap-3 overflow-x-auto no-scrollbar scroll-smooth pb-2"
          style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        >
          {/* All Categories Card */}
          <Link
            href="/shop"
            className="shrink-0 w-[180px] max-md:w-[140px] group/card"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="relative overflow-hidden aspect-[4/5] bg-[#191919] flex flex-col items-center justify-center hover:shadow-md transition-all duration-300">
              <div className="w-14 h-14 max-md:w-11 max-md:h-11 rounded-full bg-white/10 flex items-center justify-center text-white mb-4">
                <svg className="w-7 h-7 max-md:w-5 max-md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </div>
              <span className="text-white font-bold text-sm max-md:text-xs tracking-wide">{t(locale, 'categories.all_products')}</span>
              <span className="text-white/40 text-[10px] mt-1 tracking-widest uppercase">{t(locale, 'categories.view_all')}</span>
            </div>
          </Link>

          {/* Category Cards */}
          {categories.map((cat) => {
            const gradientClass = CATEGORY_GRADIENTS[cat.slug] || 'from-[#1A1A2E] to-[#2A2A4E]';
            return (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="shrink-0 w-[180px] max-md:w-[140px] group/card"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="relative overflow-hidden aspect-[4/5] hover:shadow-md transition-all duration-300">
                  {cat.image?.src ? (
                    <img
                      src={cat.image.src}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
                      <div className="text-center">
                        <span className="text-[#C9A96E]/20 text-6xl max-md:text-5xl font-serif italic">{cat.name.charAt(0)}</span>
                      </div>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 max-md:p-3">
                    <p className="text-white font-bold text-sm max-md:text-xs leading-tight">{cat.name}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
