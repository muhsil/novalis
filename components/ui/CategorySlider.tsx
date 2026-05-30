"use client";

import Link from 'next/link';
import React, { useRef } from 'react';
import { useLocaleStore } from '@/store/useLocaleStore';
import { t } from '@/lib/i18n/translations';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/free-mode';

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
  'natural-oud': 'from-[#121110] to-[#1C1A18]',
  'oud-dakhoon': 'from-[#0A0A0A] to-[#141414]',
  oils: 'from-[#101211] to-[#181C1A]',
  dokhun: 'from-[#141212] to-[#1E1A1A]',
  'all-over-spray': 'from-[#121214] to-[#1A1A1E]',
};

export default function CategorySlider({ categories }: CategorySliderProps) {
  const locale = useLocaleStore((s) => s.locale);
  const swiperRef = useRef<SwiperType | null>(null);
  const isRTL = locale === 'ar';
  const navBtnCls = "w-10 h-10 flex items-center justify-center rounded-full border border-[#121212]/10 text-[#121212] hover:border-[#D4AFB9] hover:text-[#D4AFB9] transition-all duration-300";

  return (
    <div className="relative group">
      {/* Slider Header w/ Controls */}
      <div className="flex items-center justify-between mb-8 max-md:mb-4">
        <h2 className="text-4xl max-md:text-xl font-serif text-[#121212]">
          {t(locale, 'categories.title_1')} <span className="italic text-[#D4AFB9]">{t(locale, 'categories.title_2')}</span>
        </h2>
        <div className="flex items-center gap-2">
          <button onClick={() => swiperRef.current?.slidePrev()} className={navBtnCls} aria-label="Previous">
            <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>
          <button onClick={() => swiperRef.current?.slideNext()} className={navBtnCls} aria-label="Next">
            <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
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
          1024: { slidesPerView: 5, spaceBetween: 24 },
        }}
        className="!pb-2"
      >
        {/* Category Cards */}
        {categories.map((cat) => {
          const gradientClass = CATEGORY_GRADIENTS[cat.slug] || 'from-[#742938] to-[#1A1A1A]';
          return (
            <SwiperSlide key={cat.id} className="h-auto">
              <Link href={`/shop?category=${cat.slug}`} className="group/card block cursor-pointer">
                <div className="relative overflow-hidden aspect-square md:aspect-[4/5] bg-[#742938] ring-1 ring-[#E8E4DE]/20 hover:shadow-2xl transition-all duration-500">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#742938] via-transparent to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 max-md:p-5 flex flex-col items-center translate-y-2 group-hover/card:translate-y-0 transition-transform duration-500">
                    <span className="w-6 h-[1px] bg-[#D4AFB9] mb-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 delay-100"></span>
                    <p className="text-[#F9F7F2] font-serif font-medium text-xl max-md:text-base leading-tight tracking-wider text-center drop-shadow-md">{cat.name}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
