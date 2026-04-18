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
  perfumes: 'from-[#742938] to-[#1A1A1A]',
  'luxury-fragrances': 'from-[#0A0A0A] to-[#141414]',
  'oud-collection': 'from-[#121110] to-[#1C1A18]',
  oils: 'from-[#101211] to-[#181C1A]',
  dokhun: 'from-[#141212] to-[#1E1A1A]',
  'all-over-spray': 'from-[#121214] to-[#1A1A1E]',
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
      {/* Slider Header w/ Controls */}
      <div className="flex items-center justify-between mb-8 max-md:mb-6">
        <h2 className="text-4xl max-md:text-2xl font-serif text-[#121212]">
          {t(locale, 'categories.title_1')} <span className="italic text-[#D4AFB9]">{t(locale, 'categories.title_2')}</span>
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('prev')}
            disabled={!canScrollLeft}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#121212]/10 text-[#121212] disabled:opacity-30 hover:border-[#D4AFB9] hover:text-[#D4AFB9] transition-all duration-300"
            aria-label="Previous"
          >
            <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>
          <button
            onClick={() => scroll('next')}
            disabled={!canScrollRight}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#121212]/10 text-[#121212] disabled:opacity-30 hover:border-[#D4AFB9] hover:text-[#D4AFB9] transition-all duration-300"
            aria-label="Next"
          >
            <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative -mx-6 px-6 max-md:-mx-4 max-md:px-4">
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-8"
          style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        >
          {/* All Categories Card */}
          <Link
            href="/shop"
            className="shrink-0 w-[200px] md:w-[calc(20%-1.2rem)] group/card block"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="relative overflow-hidden aspect-[3/4] md:aspect-[4/5] bg-[#742938] flex flex-col items-center justify-center hover:shadow-2xl transition-all duration-500 ring-1 ring-[#E8E4DE]/10 cursor-pointer">
              <div className="w-16 h-16 max-md:w-12 max-md:h-12 rounded-full border border-[#D4AFB9]/30 flex items-center justify-center text-[#D4AFB9] mb-6 max-md:mb-4 group-hover/card:bg-[#D4AFB9] group-hover/card:text-white transition-colors duration-500 shadow-lg">
                <svg className="w-8 h-8 max-md:w-5 max-md:h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </div>
              <span className="text-[#F9F7F2] font-serif text-lg max-md:text-sm tracking-widest">{t(locale, 'categories.all_products')}</span>
              <span className="text-[#F9F7F2]/40 text-[10px] mt-2 tracking-[0.2em] uppercase font-light">{t(locale, 'categories.view_all')}</span>
            </div>
          </Link>

          {/* Category Cards */}
          {categories.map((cat) => {
            const gradientClass = CATEGORY_GRADIENTS[cat.slug] || 'from-[#742938] to-[#1A1A1A]';
            return (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="shrink-0 w-[200px] md:w-[calc(20%-1.2rem)] group/card block cursor-pointer"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="relative overflow-hidden aspect-[3/4] md:aspect-[4/5] bg-[#742938] ring-1 ring-[#E8E4DE]/20 hover:shadow-2xl transition-all duration-500">
                  {cat.image?.src ? (
                    <img
                      src={cat.image.src}
                      alt={cat.name}
                      className="w-full h-full object-cover opacity-90 group-hover/card:scale-110 group-hover/card:opacity-100 transition-all duration-700 ease-out"
                      loading="lazy"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center opacity-90 group-hover/card:opacity-100 transition-opacity duration-500`}>
                      <div className="text-center group-hover/card:scale-110 transition-transform duration-700">
                        <span className="text-[#D4AFB9]/20 text-8xl max-md:text-6xl font-serif italic drop-shadow-2xl">{cat.name.charAt(0)}</span>
                      </div>
                    </div>
                  )}

                  {/* Overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#742938] via-transparent to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity duration-500" />

                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 max-md:p-5 flex flex-col items-center translate-y-2 group-hover/card:translate-y-0 transition-transform duration-500">
                    <span className="w-6 h-[1px] bg-[#D4AFB9] mb-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 delay-100"></span>
                    <p className="text-[#F9F7F2] font-serif font-medium text-xl max-md:text-base leading-tight tracking-wider text-center drop-shadow-md">{cat.name}</p>
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
