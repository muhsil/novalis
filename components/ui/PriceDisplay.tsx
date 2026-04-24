"use client";

import React from 'react';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { useLocaleStore } from '@/store/useLocaleStore';

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
  const { convertPrice, selectedCurrency, currencies } = useCurrencyStore();
  const locale = useLocaleStore((s) => s.locale);

  const displayAmount = convertPrice(amount);
  const displayOriginal = originalAmount ? convertPrice(originalAmount) : null;

  // EN → always show Roman currency code (AED, USD, OMR, SAR, …) so the
  // shopper never sees an unfamiliar Arabic-script symbol. AR → keep the
  // localized symbol (د.إ, ر.س, …).
  const currObj = currencies.find((c) => c.code === selectedCurrency) || currencies[0];
  const curr = locale === 'ar' ? currObj?.symbol || selectedCurrency : selectedCurrency;

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
            <bdi>{curr}</bdi> {displayAmount.toFixed(0)}
          </span>
          <span className="text-[13px] md:text-sm text-[#888888] line-through font-light">
            <bdi>{curr}</bdi> {displayOriginal.toFixed(0)}
          </span>
        </>
      ) : (
        <span className={`${sizeClasses[size]} font-serif font-medium text-[#121212] tracking-wide`}>
          <bdi>{curr}</bdi> {displayAmount.toFixed(0)}
        </span>
      )}
    </div>
  );
}
