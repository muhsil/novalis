"use client";

import React from 'react';
import { useCurrencyStore } from '@/store/useCurrencyStore';

interface PriceDisplayProps {
  amount: number;
  originalAmount?: number | null;
  onSale?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function PriceDisplay({
  amount,
  originalAmount,
  onSale,
  className = '',
  size = 'md',
}: PriceDisplayProps) {
  const { convertPrice, getSymbol } = useCurrencyStore();
  
  const displayAmount = convertPrice(amount);
  const displayOriginal = originalAmount ? convertPrice(originalAmount) : null;
  const curr = getSymbol();

  const sizeClasses = {
    sm: 'text-[15px]',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  return (
    <div className={`flex items-baseline gap-3 ${className}`}>
      {onSale && displayOriginal ? (
        <>
          <span className={`${sizeClasses[size]} font-serif font-medium text-[#121212] tracking-wide`}>
            {curr} {displayAmount.toFixed(0)}
          </span>
          <span className="text-[13px] md:text-sm text-[#888888] line-through font-light">
            {curr} {displayOriginal.toFixed(0)}
          </span>
        </>
      ) : (
        <span className={`${sizeClasses[size]} font-serif font-medium text-[#121212] tracking-wide`}>
          {curr} {displayAmount.toFixed(0)}
        </span>
      )}
    </div>
  );
}
