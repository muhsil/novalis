"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/free-mode';

interface ProductSliderProps {
  products: Record<string, unknown>[];
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
  title1,
  title2,
  viewAllLink,
  viewAllText,
}: ProductSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  if (!products || products.length === 0) return null;

  const isRTL = locale === 'ar';
  const navBtnCls = "w-10 h-10 flex items-center justify-center rounded-full border border-[#121212]/20 text-[#121212] hover:border-[#D4AFB9] hover:bg-[#742938] hover:text-white transition-all duration-300";

  return (
    <section className="fade-up max-w-7xl mx-auto px-6 max-md:px-4 py-8">
      <div className="flex items-center justify-between mb-8 max-md:mb-6">
        <h2 className="text-4xl max-md:text-2xl font-serif text-[#121212]">
          {title1} {title2 && <span className="italic text-[#D4AFB9]">{title2}</span>}
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={() => swiperRef.current?.slidePrev()} className={navBtnCls} aria-label="Previous">
            <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button onClick={() => swiperRef.current?.slideNext()} className={navBtnCls} aria-label="Next">
            <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <Swiper
        modules={[A11y, FreeMode]}
        dir={isRTL ? 'rtl' : 'ltr'}
        key={isRTL ? 'rtl' : 'ltr'}
        spaceBetween={16}
        slidesPerView={2.2}
        freeMode={{ enabled: true, momentum: true, momentumRatio: 0.6 }}
        speed={600}
        grabCursor
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 24 },
          1280: { slidesPerView: 5, spaceBetween: 24 },
        }}
        className="!pb-2"
      >
        {products.map((p) => {
          const prod = p as {
            id: number; slug: string; name: string; price?: string;
            regular_price?: string; images?: { src: string }[];
            categories?: { name: string; meta_data?: { key?: string; value?: unknown }[] }[];
            on_sale?: boolean; featured?: boolean;
            meta_data?: { key?: string; value?: unknown }[];
          };
          const readMeta = (meta: typeof prod.meta_data, key: string): string | undefined => {
            const hit = meta?.find((m) => m?.key === key);
            const v = hit?.value;
            return typeof v === 'string' && v.trim() ? v : undefined;
          };
          const nameAr = readMeta(prod.meta_data, 'name_ar');
          const categoryNameAr = readMeta(prod.categories?.[0]?.meta_data, 'name_ar');
          return (
            <SwiperSlide key={prod.id} className="h-auto">
              <ProductCard
                slug={prod.slug}
                name={prod.name}
                nameAr={nameAr}
                price={parseFloat(prod.price || '0')}
                regularPrice={prod.regular_price ? parseFloat(prod.regular_price) : null}
                imageSrc={prod.images?.[0]?.src}
                categoryName={prod.categories?.[0]?.name}
                categoryNameAr={categoryNameAr}
                onSale={prod.on_sale}
                featured={prod.featured}
                productId={prod.id}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {viewAllLink && viewAllText && (
        <div className="flex justify-center mt-6">
          <Link
            href={viewAllLink}
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#742938] hover:text-[#D4AFB9] transition-colors group"
          >
            {viewAllText}
            <svg className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
}
