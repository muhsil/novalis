"use client";

import React from 'react';
import { useLocaleStore } from '@/store/useLocaleStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { useStoreSettings } from '@/components/providers/StoreSettingsProvider';
import { t } from '@/lib/i18n/translations';

const TRUST_ICONS = {
  shipping: <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>,
  delivery: <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  returns: <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  quality: <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
};

export default function TrustBanner() {
  const locale = useLocaleStore((s) => s.locale);
  const { convertPrice, getSymbol } = useCurrencyStore();
  const { freeDeliveryThreshold } = useStoreSettings();
  const currSymbol = getSymbol();
  const convertedThreshold = String(Math.round(convertPrice(freeDeliveryThreshold)));

  const trustItems = [
    { icon: TRUST_ICONS.shipping, title: t(locale, 'trust.free_delivery'), subtitle: t(locale, 'trust.free_delivery_sub', { currency: currSymbol, threshold: convertedThreshold }) },
    { icon: TRUST_ICONS.delivery, title: t(locale, 'trust.gcc_shipping'), subtitle: t(locale, 'trust.gcc_shipping_sub') },
    { icon: TRUST_ICONS.returns, title: t(locale, 'trust.returns'), subtitle: t(locale, 'trust.returns_sub') },
    { icon: TRUST_ICONS.quality, title: t(locale, 'trust.quality'), subtitle: t(locale, 'trust.quality_sub') },
  ];

  return (
    <div className="bg-[#742938] border-b border-[#F9F7F2]/10 py-1 border-t">
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between max-md:justify-start max-md:gap-6 max-md:overflow-x-auto no-scrollbar pb-1">
          {trustItems.map((item, i) => (
            <div key={item.title} className="flex items-center gap-3 shrink-0">
              <span className="text-[#d2c7bf]">{item.icon}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-[11px] font-bold text-[#F9F7F2] tracking-[0.08em] uppercase">{item.title}</span>
                <span className="hidden md:inline text-[10px] text-[#F9F7F2]/70 font-light tracking-wide">{item.subtitle}</span>
              </div>
              {i < trustItems.length - 1 && (
                <div className="hidden md:block w-px h-4 bg-[#d2c7bf]/30 ml-5" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
