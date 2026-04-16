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
    <Link href={`/product/${slug}`} className="product-card group block bg-white overflow-hidden transition-all duration-300">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-[#f7f7f7]">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#f5f5f5]">
            <svg className="w-16 h-16 max-md:w-10 max-md:h-10 text-[#ddd]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 8c-2.21 0-4 2.015-4 4.5S9.79 17 12 17s4-2.015 4-4.5S14.21 8 12 8zm0 0V3m0 14v4" /></svg>
          </div>
        )}

        {/* Badge: HIT for on-sale, NEW for featured */}
        {discount > 0 && (
          <span className="absolute top-2 start-2 bg-[#4caf50] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm tracking-wide uppercase">
            {t(locale, 'product.hit')}
          </span>
        )}

        {featured && !discount && (
          <span className="absolute top-2 start-2 bg-[#4caf50] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm tracking-wide uppercase">
            {t(locale, 'product.new')}
          </span>
        )}

        {/* Wishlist heart */}
        <div className="absolute top-2 end-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-md:opacity-100">
          <WishlistButton
            item={{ id: productId || 0, name, price, image: imageSrc, slug }}
            size="sm"
          />
        </div>
      </div>

      {/* Card body */}
      <div className={variant === 'compact' ? 'px-1 pt-2.5 pb-3' : 'px-1 pt-2.5 pb-3 max-md:pt-2 max-md:pb-2.5'}>
        {/* Product name */}
        <h3 className="text-[13px] max-md:text-[12px] text-[#191919] line-clamp-1 leading-snug mb-0.5 font-medium">
          {name}
        </h3>

        {/* Category as brand/type subtitle */}
        {categoryName && (
          <p className="text-[11px] text-[#999] mb-2 max-md:mb-1.5 line-clamp-1">
            {categoryName}
          </p>
        )}

        {/* Price row - makeup.ae style: sale price in red, original strikethrough */}
        <div className="flex items-baseline gap-1.5 flex-wrap">
          {onSale && regularPrice ? (
            <>
              <span className="text-[13px] font-bold text-[#d32f2f]">
                {price.toFixed(0)} {currency}
              </span>
              <span className="text-[12px] text-[#bbb] line-through">
                {regularPrice.toFixed(0)} {currency}
              </span>
            </>
          ) : (
            <span className="text-[13px] font-bold text-[#191919]">
              {price.toFixed(0)} {currency}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
