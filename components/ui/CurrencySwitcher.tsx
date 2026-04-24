"use client";

import { useEffect, useState } from 'react';
import { useCurrencyStore } from '@/store/useCurrencyStore';

interface CurrencySwitcherProps {
  variant?: 'compact' | 'full' | 'dark';
}

export default function CurrencySwitcher({ variant = 'compact' }: CurrencySwitcherProps) {
  const { selectedCurrency, currencies, setSelectedCurrency } = useCurrencyStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const current = currencies.find((c) => c.code === selectedCurrency) || currencies[0];

  const triggerCls =
    variant === 'full'
      ? 'flex items-center gap-2 px-3 py-2 hover:bg-[#FAF6F0] transition-colors text-sm font-serif font-medium text-[#121212]'
      : variant === 'dark'
        ? 'flex items-center gap-1 px-2 py-1 hover:text-[#D4AFB9] transition-colors text-[10px] uppercase font-bold text-white/70'
        : 'flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-[#f8f8f8] transition-colors text-[10px] uppercase font-bold text-[#555] hover:text-[#742938] border border-[#eee]';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={triggerCls}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Change currency"
      >
        <span>{current.code}</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12a9 9 0 1018 0 9 9 0 00-18 0zm9-9v18m-9-9h18" />
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Select currency"
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
        >
          <div
            className="absolute inset-0 bg-[#121212]/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative bg-white w-full max-w-md max-h-[80vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E4DE]">
              <div>
                <span className="text-[10px] text-[#742938] font-semibold tracking-[0.3em] uppercase">Currency</span>
                <h2 className="font-serif text-xl text-[#121212] mt-0.5">Select currency</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="w-9 h-9 flex items-center justify-center border border-[#E8E4DE] text-[#121212] hover:bg-[#742938] hover:text-white hover:border-[#742938] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto divide-y divide-[#E8E4DE]">
              {currencies.map((c) => {
                const isActive = c.code === selectedCurrency;
                return (
                  <button
                    key={c.code}
                    onClick={() => {
                      setSelectedCurrency(c.code);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors ${
                      isActive ? 'bg-[#FAF6F0]' : 'hover:bg-[#F9F7F2]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`inline-flex items-center justify-center w-10 h-10 text-sm font-serif ${
                        isActive ? 'bg-[#742938] text-white' : 'bg-[#F9F7F2] text-[#742938]'
                      }`}>
                        {c.symbol}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#121212]">{c.code}</p>
                        <p className="text-xs text-[#121212]/50 font-light">{c.symbol}</p>
                      </div>
                    </div>
                    {isActive && (
                      <svg className="w-5 h-5 text-[#742938]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
