"use client";

import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { toast } from '@/components/ui/Toast';
import QuantitySelector from '@/components/ui/QuantitySelector';
import EmptyCart from '@/components/checkout/EmptyCart';
import { useStoreSettings } from '@/components/providers/StoreSettingsProvider';
import { useCurrencyStore, useCurrencyLabel } from '@/store/useCurrencyStore';

import { useAuthStore } from '@/store/useAuthStore';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity } = useCartStore();
  const { freeDeliveryThreshold } = useStoreSettings();
  const { selectedCurrency, convertPrice } = useCurrencyStore();
  const currSymbol = useCurrencyLabel();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  const subtotalAED = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const subtotal = selectedCurrency !== 'AED' ? convertPrice(subtotalAED) : subtotalAED;
  const threshold = selectedCurrency !== 'AED' ? convertPrice(freeDeliveryThreshold) : freeDeliveryThreshold;
  const remaining = Math.max(0, threshold - subtotal);
  const progress = Math.min(100, (subtotal / threshold) * 100);
  const qualifies = remaining <= 0 && subtotal > 0;

  const handleRemove = (id: number, name: string) => {
    removeFromCart(id);
    toast(`"${name}" removed from cart`, 'info');
  };

  if (items.length === 0) return <EmptyCart />;

  return (
    <div className="min-h-screen bg-[#FCFAF7] py-6 max-md:py-4">
      <div className="max-w-6xl mx-auto px-6 max-md:px-4">
        {/* Header */}
        <div className="mb-6 max-md:mb-4">
          <nav className="flex items-center gap-2 text-[11px] text-[#121212]/50 tracking-widest uppercase">
            <Link href="/" className="hover:text-[#742938]">Home</Link>
            <span>/</span>
            <span className="text-[#742938]">Cart</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-serif text-[#121212] mt-1">
            Your <span className="italic text-[#742938]">Cart</span>
            <span className="text-[#121212]/50 font-sans text-base ml-3">
              ({items.length} {items.length === 1 ? 'item' : 'items'})
            </span>
          </h1>
          {!isLoggedIn && (
            <p className="text-[11px] text-[#121212]/60 font-light mt-2 tracking-wide">
              Checking out as a guest is totally fine.{' '}
              <Link href="/account/login" className="text-[#742938] font-medium hover:underline">
                Sign in
              </Link>
              {' '}or{' '}
              <Link href="/account/register" className="text-[#742938] font-medium hover:underline">
                create an account
              </Link>
              {' '}for faster checkout and order tracking.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Items */}
          <div className="lg:col-span-8 bg-white border border-[#E8E4DE] divide-y divide-[#E8E4DE]">
            {items.map((item) => {
              const lineAED = item.price * item.quantity;
              const lineDisp = selectedCurrency !== 'AED' ? convertPrice(lineAED) : lineAED;
              return (
                <div key={item.id} className="flex gap-4 px-5 py-4">
                  <div className="w-24 h-24 max-md:w-20 max-md:h-20 bg-[#F9F7F2] flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply p-1.5" />
                    ) : (
                      <svg className="w-8 h-8 text-[#D4AFB9]" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.21 0-4 2.015-4 4.5S9.79 17 12 17s4-2.015 4-4.5S14.21 8 12 8zm0 0V3m0 14v4" /></svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <p className="font-serif text-base max-md:text-sm text-[#121212] leading-snug line-clamp-2 pr-1">{item.name}</p>
                      <button onClick={() => handleRemove(item.id, item.name)} aria-label="Remove" className="text-[#121212]/40 hover:text-[#742938] flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                    {item.variant && <p className="text-[11px] text-[#121212]/50 font-light mt-0.5">{item.variant}</p>}
                    <div className="flex items-center justify-between mt-3">
                      <QuantitySelector value={item.quantity} onChange={(q) => updateQuantity(item.id, q)} size="sm" />
                      <p className="font-semibold text-base text-[#742938]">{currSymbol} {lineDisp.toFixed(0)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <div className="bg-white border border-[#E8E4DE] p-5">
              <h2 className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#121212]/60 mb-4">Order Summary</h2>

              {qualifies ? (
                <p className="text-xs text-[#1B4332] font-semibold tracking-[0.15em] uppercase flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  Free delivery unlocked
                </p>
              ) : (
                <div className="mb-4">
                  <p className="text-xs text-[#121212]/70 font-light mb-2">
                    Add <span className="font-semibold text-[#742938]">{currSymbol} {remaining.toFixed(0)}</span> more for free delivery
                  </p>
                  <div className="w-full h-[3px] bg-[#F0EBE0] overflow-hidden">
                    <div className="h-full bg-[#742938] transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              <div className="flex justify-between items-baseline py-3 border-t border-[#E8E4DE]">
                <span className="text-[11px] text-[#121212]/60 font-semibold tracking-[0.2em] uppercase">Subtotal</span>
                <span className="text-xl font-serif text-[#742938]">{currSymbol} {subtotal.toFixed(0)}</span>
              </div>
              <p className="text-[11px] text-[#121212]/50 font-light mb-4">Taxes and final delivery fees calculated at checkout.</p>

              <Link href="/checkout"
                className="block w-full text-center bg-[#742938] text-white text-xs font-semibold tracking-[0.25em] uppercase py-4 hover:bg-[#5c1f2c] transition-colors">
                Proceed to Checkout
              </Link>
              <Link href="/shop"
                className="block w-full text-center text-[11px] text-[#121212]/60 hover:text-[#742938] py-3 transition-colors font-light tracking-[0.15em] uppercase">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
