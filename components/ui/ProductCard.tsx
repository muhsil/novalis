"use client";

import Link from 'next/link';
import React from 'react';
import WishlistButton from '@/components/ui/WishlistButton';
import PriceDisplay from '@/components/ui/PriceDisplay';
import { useLocaleStore } from '@/store/useLocaleStore';
import { t } from '@/lib/i18n/translations';

interface ProductCardProps {
  slug: string;
  name: string;
  price: number;
  regularPrice?: number | null;
  imageSrc?: string;
  categoryName?: string;
  onSale?: boolean;
  featured?: boolean;
  variant?: 'default' | 'compact';
  currency?: string;
  productId?: number;
}

export default function ProductCard({
  slug,
  name,
  price,
  regularPrice,
  imageSrc,
  categoryName,
  onSale,
  featured,
  variant = 'default',
  currency = 'AED',
  productId,
}: ProductCardProps) {
  const locale = useLocaleStore((s) => s.locale);
  const discount = onSale && regularPrice ? Math.round(((regularPrice - price) / regularPrice) * 100) : 0;
  return (
    <Link href={`/product/${slug}`} className="product-card group block bg-transparent transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/5] bg-[#F9F7F2]">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-contain p-6 mix-blend-multiply group-hover:scale-110 transition-transform duration-1000 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#F9F7F2]">
            <svg className="w-16 h-16 max-md:w-10 max-md:h-10 text-[#E8E4DE]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-2.21 0-4 2.015-4 4.5S9.79 17 12 17s4-2.015 4-4.5S14.21 8 12 8zm0 0V3m0 14v4" /></svg>
          </div>
        )}

        {/* Minimalist Tags */}
        <div className="absolute top-3 start-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="bg-white/90 backdrop-blur-sm text-[#8B0000] text-[9px] font-semibold px-2 py-0.5 tracking-[0.1em] uppercase border border-[#E8E4DE]">
              -{discount}%
            </span>
          )}

          {featured && (
            <span className="bg-[#D4AFB9] text-white text-[9px] font-semibold px-2 py-0.5 tracking-[0.1em] uppercase">
              {t(locale, 'product.new')}
            </span>
          )}
        </div>

        {/* Wishlist heart */}
        <div className="absolute top-3 end-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 max-md:opacity-100">
          <WishlistButton
            item={{ id: productId || 0, name, price, image: imageSrc, slug }}
            size="sm"
          />
        </div>
      </div>

      {/* Card body */}
      <div className="px-2 pt-3 pb-3 text-center">
        {categoryName && (
          <p className="text-[8px] text-[#D4AFB9] mb-1 font-bold tracking-[0.2em] uppercase">
            {categoryName}
          </p>
        )}
        <h3 className="text-[13px] md:text-[15px] text-[#121212] line-clamp-2 leading-snug mb-1.5 font-serif font-medium group-hover:text-[#742938] transition-colors duration-300">
          {name}
        </h3>
        <PriceDisplay
          amount={price}
          originalAmount={regularPrice}
          onSale={onSale}
          size="sm"
          className="justify-center mt-1"
        />
      </div>
    </Link>
  );
}
