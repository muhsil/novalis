"use client";

import React, { useState } from 'react';
import DealBadge from '@/components/ui/DealBadge';

interface ProductImageGalleryProps {
  images: { id: number; src: string }[];
  name: string;
  discount?: number;
  fallbackIcon?: string;
}

export default function ProductImageGallery({ images, name, discount }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasImages = images && images.length > 0;
  const activeSrc = hasImages ? images[activeIndex]?.src : null;

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="w-full bg-[#F9F7F2] aspect-[4/5] md:aspect-[3/4] flex items-center justify-center relative rounded-none overflow-hidden group">
        {activeSrc ? (
          <img src={activeSrc} alt={name} className="w-full h-full object-contain p-8 mix-blend-multiply transition-transform duration-700 ease-in-out group-hover:scale-105" />
        ) : (
          <svg className="w-24 h-24 text-[#E8E4DE]" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.21 0-4 2.015-4 4.5S9.79 17 12 17s4-2.015 4-4.5S14.21 8 12 8zm0 0V3m0 14v4" /></svg>
        )}
        {discount !== undefined && discount > 0 && (
          <div className="absolute top-4 start-4 z-10">
            <DealBadge text={`-${discount}%`} variant="red" />
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {hasImages && images.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto no-scrollbar pb-2">
          {images.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-20 h-24 shrink-0 transition-all aspect-[3/4] overflow-hidden ${
                idx === activeIndex
                  ? 'border border-[#D4AFB9] opacity-100'
                  : 'border border-transparent bg-[#F9F7F2] opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img.src} alt={`${name} ${idx + 1}`} className="w-full h-full object-contain p-2 mix-blend-multiply" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
