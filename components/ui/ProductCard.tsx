"use client";

import Link from 'next/link';
import React from 'react';
import WishlistButton from '@/components/ui/WishlistButton';

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
  const discount = onSale && regularPrice ? Math.round(((regularPrice - price) / regularPrice) * 100) : 0;

  return (
    <Link href={`/product/${slug}`} className="product-card group block bg-white rounded-lg overflow-hidden border border-[#f0f0f0] hover:border-[#e0dbd3] hover:shadow-md transition-all duration-300">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4] bg-[#fafafa]">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FAF6F0] to-[#f0ebe0]">
            <svg className="w-16 h-16 max-md:w-10 max-md:h-10 text-[#C9A96E]/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 8c-2.21 0-4 2.015-4 4.5S9.79 17 12 17s4-2.015 4-4.5S14.21 8 12 8zm0 0V3m0 14v4" /></svg>
          </div>
        )}

        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute top-2.5 left-2.5 bg-[#1A1A2E] text-white text-[10px] font-semibold px-2 py-0.5 rounded tracking-wider">
            -{discount}%
          </span>
        )}

        {/* New badge for featured */}
        {featured && !discount && (
          <span className="absolute top-2.5 left-2.5 bg-[#C9A96E] text-white text-[10px] font-semibold px-2 py-0.5 rounded tracking-wider">
            New
          </span>
        )}

        {/* Wishlist heart */}
        <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-md:opacity-100">
          <WishlistButton
            item={{ id: productId || 0, name, price, image: imageSrc, slug }}
            size="sm"
          />
        </div>
      </div>

      {/* Card body */}
      <div className={variant === 'compact' ? 'px-3 py-3' : 'px-4 py-3.5 max-md:px-3 max-md:py-3'}>
        {/* Category */}
        {categoryName && (
          <span className="text-[9px] font-medium text-[#C9A96E] tracking-[0.15em] uppercase mb-1 block">
            {categoryName}
          </span>
        )}

        {/* Product name */}
        <h3 className="font-serif text-sm max-md:text-[13px] text-[#191919] line-clamp-1 leading-snug mb-2">
          {name}
        </h3>

        {/* Price row */}
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-[#191919]">
            {currency} {price.toFixed(0)}
          </span>
          {onSale && regularPrice && (
            <>
              <span className="text-[11px] text-[#ccc] line-through">
                {currency} {regularPrice.toFixed(0)}
              </span>
              {discount > 0 && (
                <span className="text-[10px] font-semibold text-[#C9A96E]">
                  Save {discount}%
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
