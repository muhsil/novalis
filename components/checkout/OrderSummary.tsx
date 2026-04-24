"use client";

import React from 'react';
import { CartItem } from '@/store/useCartStore';
import { useCurrencyStore, useCurrencyLabel } from '@/store/useCurrencyStore';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
}

export default function OrderSummary({ items, subtotal }: OrderSummaryProps) {
  const { selectedCurrency, convertPrice } = useCurrencyStore();
  const currSymbol = useCurrencyLabel();
  const disp = (n: number) => selectedCurrency !== 'AED' ? convertPrice(n) : n;

  return (
    <div className="bg-white border border-[#E8E4DE]">
      <div className="px-5 py-4 border-b border-[#E8E4DE] flex items-center justify-between">
        <div>
          <span className="text-[10px] text-[#D4AFB9] font-semibold tracking-[0.25em] uppercase">Your Order</span>
          <h3 className="text-base font-serif text-[#121212] mt-0.5">Summary</h3>
        </div>
        <span className="text-[11px] text-[#121212]/60 font-semibold tracking-[0.15em] uppercase">{items.length} item{items.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="px-5 py-4 max-h-[42vh] overflow-y-auto divide-y divide-[#F5F0EA]">
        {items.map((item, idx) => {
          const line = disp(item.price * item.quantity);
          return (
            <div key={idx} className="flex gap-3 py-3 first:pt-0 last:pb-0">
              {item.image ? (
                <div className="w-14 h-14 bg-[#F9F7F2] flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply p-1" />
                </div>
              ) : (
                <div className="w-14 h-14 bg-[#F9F7F2] flex-shrink-0 flex items-center justify-center text-[#D4AFB9]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.21 0-4 2.015-4 4.5S9.79 17 12 17s4-2.015 4-4.5S14.21 8 12 8zm0 0V3m0 14v4" /></svg>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-serif text-[#121212] truncate">{item.name}</p>
                {item.variant && <p className="text-[11px] text-[#121212]/50 font-light mt-0.5">{item.variant}</p>}
                <p className="text-[11px] text-[#121212]/50 font-light mt-1">Qty {item.quantity}</p>
              </div>
              <p className="text-sm font-semibold text-[#742938] whitespace-nowrap">
                {currSymbol} {line.toFixed(0)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="px-5 py-4 border-t border-[#E8E4DE] space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-[#121212]/60 font-light">Subtotal</span>
          <span className="text-[#121212] font-semibold">{currSymbol} {disp(subtotal).toFixed(0)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#121212]/60 font-light">Delivery</span>
          <span className="text-[#1B4332] font-semibold text-xs tracking-[0.1em] uppercase">Free</span>
        </div>
        <div className="flex justify-between items-baseline pt-3 mt-2 border-t border-[#E8E4DE]">
          <span className="text-[11px] text-[#121212]/60 font-semibold tracking-[0.2em] uppercase">Total</span>
          <span className="text-xl font-serif text-[#742938]">{currSymbol} {disp(subtotal).toFixed(0)}</span>
        </div>
      </div>
    </div>
  );
}
