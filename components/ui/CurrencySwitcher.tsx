"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useCurrencyStore } from '@/store/useCurrencyStore';

interface CurrencySwitcherProps {
  variant?: 'compact' | 'full' | 'dark';
}

export default function CurrencySwitcher({ variant = 'compact' }: CurrencySwitcherProps) {
  const { selectedCurrency, currencies, setSelectedCurrency } = useCurrencyStore();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        ? 'flex items-center gap-1.5 px-2 py-1 hover:text-[#D4AFB9] transition-colors text-[10px] uppercase font-bold text-white/70'
        : 'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-[#f8f8f8] transition-colors text-[10px] uppercase font-bold text-[#555] hover:text-[#742938] border border-[#eee]';

  const modal = open && mounted ? (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Select currency"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-[#121212]/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative bg-white w-full max-w-sm max-h-[85vh] flex flex-col shadow-2xl rounded-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E4DE]">
          <div>
            <span className="text-[10px] text-[#742938] font-semibold tracking-[0.3em] uppercase">Currency</span>
            <h2 className="font-serif text-lg text-[#121212] mt-0.5">Select currency</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="w-8 h-8 flex items-center justify-center border border-[#E8E4DE] text-[#121212] hover:bg-[#742938] hover:text-white hover:border-[#742938] transition-colors rounded-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto divide-y divide-[#E8E4DE]" dir="ltr">
          {currencies.map((c) => {
            const isActive = c.code === selectedCurrency;
            return (
              <button
                key={c.code}
                onClick={() => {
                  setSelectedCurrency(c.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-3 px-5 py-3.5 text-left transition-colors ${
                  isActive ? 'bg-[#FAF6F0]' : 'hover:bg-[#F9F7F2]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`inline-flex items-center justify-center w-10 h-10 text-base font-serif rounded-sm shrink-0 ${
                    isActive ? 'bg-[#742938] text-white' : 'bg-[#F9F7F2] text-[#742938]'
                  }`}>
                    <bdi>{c.symbol}</bdi>
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#121212] leading-tight">
                      <span className="font-mono tracking-wider">{c.code}</span>
                      <span className="ms-2 text-[#121212]/55 font-sans font-normal">
                        <bdi>{c.symbol}</bdi>
                      </span>
                    </p>
                    <p className="text-xs text-[#121212]/55 font-light truncate mt-0.5">{c.name}</p>
                  </div>
                </div>
                {isActive && (
                  <svg className="w-5 h-5 text-[#742938] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  ) : null;

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
        <span className="font-mono tracking-wider">{current.code}</span>
        <span className="text-[11px] font-sans opacity-70"><bdi>{current.symbol}</bdi></span>
      </button>

      {modal && createPortal(modal, document.body)}
    </>
  );
}
