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
  perfumes: 'from-[#1A1A2E] to-[#2A2A4E]',
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

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
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

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <div className="relative group">
      {/* Section Header */}
      <div className="text-center mb-8 max-md:mb-5">
        <h2 className="font-serif text-3xl max-md:text-xl font-normal text-[#191919]">
          {t(locale, 'categories.title_1')}{' '}
          <span className="italic text-[#C9A96E]">{t(locale, 'categories.title_2')}</span>
        </h2>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 items-center justify-center text-gray-600 hover:text-[#C9A96E] hover:border-[#C9A96E]/20 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Scroll left"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>
        )}

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
            <div className="relative overflow-hidden aspect-[4/5] bg-gradient-to-br from-[#1A1A2E] to-[#2A2A4E] flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300 group-hover/card:-translate-y-1">
              <div className="w-14 h-14 max-md:w-11 max-md:h-11 rounded-full bg-[#C9A96E]/15 flex items-center justify-center text-[#C9A96E] mb-4">
                <svg className="w-7 h-7 max-md:w-5 max-md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </div>
              <span className="text-white font-semibold text-sm max-md:text-xs tracking-wide">{t(locale, 'categories.all_products')}</span>
              <span className="text-white/30 text-[10px] mt-1 tracking-widest uppercase">{t(locale, 'categories.view_all')}</span>
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
                <div className="relative overflow-hidden aspect-[4/5] shadow-sm hover:shadow-lg transition-all duration-300 group-hover/card:-translate-y-1">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 max-md:p-3">
                    <p className="text-white font-semibold text-sm max-md:text-xs leading-tight">{cat.name}</p>
                    <div className="w-6 h-px bg-[#C9A96E] mt-2 group-hover/card:w-10 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-100 items-center justify-center text-gray-600 hover:text-[#C9A96E] hover:border-[#C9A96E]/20 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Scroll right"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>
        )}
      </div>
    </div>
  );
}
