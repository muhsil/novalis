"use client";

import React, { useEffect, useRef, useState, useCallback, MouseEvent } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';

interface ProductSliderProps {
  products: any[];
  locale?: string;
  currSymbol?: string;
  title1: string;
  title2?: string;
  viewAllLink?: string;
  viewAllText?: string;
}

export default function ProductSlider({
  products,
  locale = 'en',
  currSymbol = 'AED',
  title1,
  title2,
  viewAllLink,
  viewAllText
}: ProductSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  
  // Mouse Drag State
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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

  const handleMouseDown = (e: MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  const handleMouseUp = () => {
    setIsDown(false);
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="fade-up max-w-7xl mx-auto px-6 max-md:px-4 py-8">
      {/* Section header */}
      <div className="flex items-center justify-between mb-8 max-md:mb-6">
        <h2 className="text-4xl max-md:text-2xl font-serif text-[#121212]">
          {title1} {title2 && <span className="italic text-[#D4AFB9]">{title2}</span>}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('prev')}
            disabled={!canScrollPrev}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#121212]/20 text-[#121212] disabled:opacity-30 hover:border-[#D4AFB9] hover:bg-[#742938] hover:text-white transition-all duration-300"
            aria-label="Previous"
          >
            <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>
          <button
            onClick={() => scroll('next')}
            disabled={!canScrollNext}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#121212]/20 text-[#121212] disabled:opacity-30 hover:border-[#D4AFB9] hover:bg-[#742938] hover:text-white transition-all duration-300"
            aria-label="Next"
          >
            <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="relative -mx-6 px-6 max-md:-mx-4 max-md:px-4">
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-8 cursor-grab ${isDown ? 'scroll-auto' : 'scroll-smooth'}`}
          style={{ scrollSnapType: isDown ? 'none' : 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        >
          {products.map((p: any) => (
            <div key={p.id} className="shrink-0 w-[200px] md:w-[calc(20%-1.2rem)] select-none pointer-events-auto" style={{ scrollSnapAlign: isDown ? 'none' : 'start' }}>
               <div className={isDown ? "pointer-events-none" : ""}>
                <ProductCard
                  slug={p.slug}
                  name={p.name}
                  price={parseFloat(p.price || '0')}
                  regularPrice={p.regular_price ? parseFloat(p.regular_price) : null}
                  imageSrc={p.images?.[0]?.src}
                  categoryName={p.categories?.[0]?.name}
                  onSale={p.on_sale}
                  featured={p.featured}
                  currency={currSymbol}
                  productId={p.id}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {viewAllLink && viewAllText && (
        <div className="text-center mt-8 md:hidden">
          <Link href={viewAllLink} className="inline-flex items-center gap-3 text-[#121212] font-semibold text-xs tracking-widest uppercase hover:text-[#D4AFB9] transition-colors">
            {viewAllText}
            <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6" /></svg>
          </Link>
        </div>
      )}
    </section>
  );
}
