"use client";

import React, { useState } from 'react';
import DealBadge from '@/components/ui/DealBadge';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

interface ProductImageGalleryProps {
  images: { id: number; src: string }[];
  name: string;
  discount?: number;
  fallbackIcon?: string;
}

export default function ProductImageGallery({ images, name, discount }: ProductImageGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const hasImages = images && images.length > 0;

  if (!hasImages) {
    return (
      <div className="w-full">
        <div className="w-full bg-[#F9F7F2] aspect-[4/5] md:aspect-[3/4] flex items-center justify-center relative overflow-hidden">
          <svg className="w-24 h-24 text-[#E8E4DE]" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.21 0-4 2.015-4 4.5S9.79 17 12 17s4-2.015 4-4.5S14.21 8 12 8zm0 0V3m0 14v4" /></svg>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main Image Swiper */}
      <div className="relative group/gallery">
        <Swiper
          modules={[Navigation, Pagination, Thumbs, A11y]}
          spaceBetween={0}
          slidesPerView={1}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          navigation={{
            prevEl: '.gallery-prev',
            nextEl: '.gallery-next',
          }}
          pagination={{ clickable: true, el: '.gallery-pagination' }}
          speed={500}
          grabCursor
          className="w-full bg-[#F9F7F2] aspect-[4/5] md:aspect-[3/4]"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={img.id || idx}>
              <div className="w-full h-full flex items-center justify-center">
                <img src={img.src} alt={`${name} ${idx + 1}`} className="w-full h-full object-contain p-8 mix-blend-multiply" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Discount badge */}
        {discount !== undefined && discount > 0 && (
          <div className="absolute top-4 start-4 z-10">
            <DealBadge text={`-${discount}%`} variant="red" />
          </div>
        )}

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              className="gallery-prev absolute top-1/2 -translate-y-1/2 start-3 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-[#E8E4DE] text-[#121212] flex items-center justify-center opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 hover:bg-white"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
            <button
              className="gallery-next absolute top-1/2 -translate-y-1/2 end-3 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-[#E8E4DE] text-[#121212] flex items-center justify-center opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 hover:bg-white"
              aria-label="Next image"
            >
              <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
          </>
        )}

        {/* Pagination dots — visible on mobile */}
        {images.length > 1 && (
          <div className="gallery-pagination absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5 md:hidden" />
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          slidesPerView={5}
          watchSlidesProgress
          freeMode
          className="mt-4 !hidden md:!block product-thumbs"
          breakpoints={{
            1024: { slidesPerView: 6 },
          }}
        >
          {images.map((img, idx) => (
            <SwiperSlide key={img.id || idx} className="cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden border border-transparent thumb-slide">
                <img src={img.src} alt={`${name} ${idx + 1}`} className="w-full h-full object-contain p-2 mix-blend-multiply bg-[#F9F7F2]" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
