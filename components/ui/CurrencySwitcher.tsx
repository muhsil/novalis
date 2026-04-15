"use client";

import { useState, useRef, useEffect } from 'react';
import { useCurrencyStore } from '@/store/useCurrencyStore';

interface CurrencySwitcherProps {
  variant?: 'compact' | 'full';
}

export default function CurrencySwitcher({ variant = 'compact' }: CurrencySwitcherProps) {
  const { selectedCurrency, currencies, setSelectedCurrency } = useCurrencyStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = currencies.find((c) => c.code === selectedCurrency) || currencies[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={
          variant === 'full'
            ? 'flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#f8f8f8] transition-colors text-sm font-medium text-[#555]'
            : 'flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-[#f8f8f8] transition-colors text-xs font-semibold text-[#555] border border-[#eee]'
        }
      >
        <span>{current.code}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border border-[#eee] py-1 z-50 min-w-[140px] max-h-[300px] overflow-y-auto">
          {currencies.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                setSelectedCurrency(c.code);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-[#FAF6F0] transition-colors flex items-center justify-between ${
                c.code === selectedCurrency ? 'text-[#C9A96E] font-semibold bg-[#FAF6F0]' : 'text-[#333]'
              }`}
            >
              <span>{c.code}</span>
              <span className="text-xs text-[#999]">{c.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
