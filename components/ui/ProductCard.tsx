"use client";

import Link from 'next/link';
import React from 'react';
import WishlistButton from '@/components/ui/WishlistButton';
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
    <Link href={`/product/${slug}`} className="product-card group block bg-[#f9f9f9] overflow-hidden transition-all duration-300">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-[#f9f9f9]">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#f0f0f0]">
            <svg className="w-16 h-16 max-md:w-10 max-md:h-10 text-[#C9A96E]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 8c-2.21 0-4 2.015-4 4.5S9.79 17 12 17s4-2.015 4-4.5S14.21 8 12 8zm0 0V3m0 14v4" /></svg>
          </div>
        )}

        {/* Badge: HIT for on-sale, NEW for featured */}
        {discount > 0 && (
          <span className="absolute top-2.5 start-2.5 bg-[#4caf50] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-sm tracking-wide uppercase">
            {t(locale, 'product.hit')}
          </span>
        )}

        {featured && !discount && (
          <span className="absolute top-2.5 start-2.5 bg-[#4caf50] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-sm tracking-wide uppercase">
            {t(locale, 'product.new')}
          </span>
        )}

        {/* Wishlist heart */}
        <div className="absolute top-2.5 end-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-md:opacity-100">
          <WishlistButton
            item={{ id: productId || 0, name, price, image: imageSrc, slug }}
            size="sm"
          />
        </div>
      </div>

      {/* Card body */}
      <div className={variant === 'compact' ? 'px-2.5 py-3' : 'px-2.5 py-3 max-md:py-2.5'}>
        {/* Product name */}
        <h3 className="text-[13px] max-md:text-[12px] text-[#191919] line-clamp-2 leading-snug mb-0.5 font-medium">
          {name}
        </h3>

        {/* Category as brand/type */}
        {categoryName && (
          <p className="text-[11px] text-[#888] mb-2 line-clamp-1">
            {categoryName}
          </p>
        )}

        {/* Price row */}
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-[14px] font-bold text-[#191919]">
            {currency} {price.toFixed(0)}
          </span>
          {onSale && regularPrice && (
            <span className="text-[12px] text-[#aaa] line-through">
              {currency} {regularPrice.toFixed(0)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
