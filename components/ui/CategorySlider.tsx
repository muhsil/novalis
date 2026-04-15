"use client";

import Link from 'next/link';
import React, { useRef, useState, useEffect, useCallback } from 'react';

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

export default function CategorySlider({ categories }: CategorySliderProps) {
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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-[#C9A96E] rounded-full" />
          <h2 className="text-base font-bold text-[#191919]">Shop by Category</h2>
        </div>
        <Link href="/shop" className="text-xs font-medium text-[#999] hover:text-[#C9A96E] transition-colors flex items-center gap-1">
          View All
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </Link>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white rounded-full shadow-lg border border-gray-100 items-center justify-center text-gray-600 hover:text-[#C9A96E] hover:border-[#C9A96E]/20 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Scroll left"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>
        )}

        {/* Scrollable Track */}
        <div
          ref={scrollRef}
          className="flex gap-3 max-md:gap-2 overflow-x-auto no-scrollbar scroll-smooth pb-1"
          style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        >
          {/* All Categories Card */}
          <Link
            href="/shop"
            className="shrink-0 w-[160px] max-md:w-[120px] group/card"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-gradient-to-br from-[#1A1A2E] to-[#2A2A4E] flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all group-hover/card:-translate-y-0.5">
              <div className="w-12 h-12 max-md:w-10 max-md:h-10 rounded-full bg-[#C9A96E]/20 flex items-center justify-center text-[#C9A96E] mb-3">
                <svg className="w-6 h-6 max-md:w-5 max-md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </div>
              <span className="text-white font-semibold text-sm max-md:text-xs">All Products</span>
            </div>
          </Link>

          {/* Category Cards */}
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="shrink-0 w-[160px] max-md:w-[120px] group/card"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-[#f5f5f5] shadow-sm hover:shadow-md transition-all group-hover/card:-translate-y-0.5">
                {/* Category Image */}
                {cat.image?.src ? (
                  <img
                    src={cat.image.src}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#FAF6F0] to-[#f0ebe0] flex items-center justify-center">
                    <span className="text-[#C9A96E]/30 text-5xl max-md:text-4xl font-light">{cat.name.charAt(0)}</span>
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-3 max-md:p-2">
                  <p className="text-white font-semibold text-sm max-md:text-xs leading-tight line-clamp-2">{cat.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white rounded-full shadow-lg border border-gray-100 items-center justify-center text-gray-600 hover:text-[#C9A96E] hover:border-[#C9A96E]/20 transition-all opacity-0 group-hover:opacity-100"
            aria-label="Scroll right"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>
        )}
      </div>
    </div>
  );
}
