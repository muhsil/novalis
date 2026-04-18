"use client";

import { useState, useRef, useEffect } from 'react';
import { useCurrencyStore } from '@/store/useCurrencyStore';

interface CurrencySwitcherProps {
  variant?: 'compact' | 'full' | 'dark';
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
            ? 'flex items-center gap-2 px-3 py-2 hover:bg-[#FAF6F0] transition-colors text-sm font-serif font-medium text-[#121212]'
            : variant === 'dark'
              ? 'flex items-center gap-1 px-2 py-1 hover:text-[#D4AFB9] transition-colors text-[10px] uppercase font-bold text-white/70'
              : 'flex items-center gap-1 px-2 py-1.5 transition-colors text-[10px] uppercase font-bold text-[#F9F7F2] hover:text-[#D4AFB9]'
        }
      >
        <span>{current.code}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full end-0 mt-2 bg-[#742938] border border-[#E8E4DE]/20 shadow-2xl py-2 z-[9999] min-w-[140px] max-h-[300px] overflow-y-auto no-scrollbar rounded-md">
          {currencies.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                setSelectedCurrency(c.code);
                setOpen(false);
              }}
              className={`w-full text-start px-4 py-2 text-[10px] tracking-widest uppercase hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between ${
                c.code === selectedCurrency ? 'text-[#D4AFB9] font-bold' : 'text-[#F9F7F2]/60'
              }`}
            >
              <span>{c.code}</span>
              <span className="opacity-50">{c.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
