"use client";

import React, { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { toast } from '@/components/ui/Toast';
import { useStoreSettings } from '@/components/providers/StoreSettingsProvider';

interface StickyAddToCartProps {
  productId: number;
  name: string;
  price: number;
  image?: string;
}

export default function StickyAddToCart({ productId, name, price, image }: StickyAddToCartProps) {
  const [added, setAdded] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const { currency } = useStoreSettings();

  const handleAdd = () => {
    addToCart({ id: productId, name, price, quantity: 1, image });
    toast(`Added ${name} to cart!`, 'success');
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="md:hidden fixed bottom-[60px] left-0 right-0 z-70 bg-[#742938] border-t border-t-[#D4AFB9]/20 px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.15)] flex justify-between items-center">
      <div className="flex items-center gap-3 w-full">
        <div className="flex-1 min-w-0">
          <div className="text-xs text-[#F9F7F2]/60 truncate font-light">{name}</div>
          <div className="text-[15px] font-serif text-[#D4AFB9]">{currency} {price.toFixed(0)}</div>
        </div>
        <button
          onClick={handleAdd}
          className={`px-8 py-2.5 rounded-none text-xs font-semibold tracking-widest uppercase transition-all shrink-0 ${
            added
              ? 'bg-[#5c1f2c] text-white border border-[#F9F7F2]/30'
              : 'bg-white text-[#742938] hover:bg-[#F9F7F2] active:scale-[0.98]'
          }`}
        >
          {added ? (<span className="inline-flex items-center gap-2"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Added</span>) : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
