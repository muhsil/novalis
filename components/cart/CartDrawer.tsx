"use client";
import { useCartStore } from '@/store/useCartStore';
import { toast } from '@/components/ui/Toast';
import Link from 'next/link';
import QuantitySelector from '@/components/ui/QuantitySelector';
import { useStoreSettings } from '@/components/providers/StoreSettingsProvider';
import { useCurrencyStore } from '@/store/useCurrencyStore';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity } = useCartStore();
  const { currency, freeDeliveryThreshold } = useStoreSettings();
  const { selectedCurrency, convertPrice, getSymbol } = useCurrencyStore();
  const currSymbol = selectedCurrency !== 'AED' ? getSymbol() : currency;

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

  return (
    <>
      <div
        className={`fixed inset-0 bg-[#121212]/40 backdrop-blur-sm z-[90] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div className={`fixed top-0 end-0 h-full w-full max-w-md bg-[#FCFAF7] z-[100] shadow-2xl flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full rtl:-translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E4DE] bg-white">
          <div>
            <span className="text-[10px] text-[#D4AFB9] font-semibold tracking-[0.3em] uppercase">Your Cart</span>
            <h2 className="font-serif text-xl text-[#121212] mt-0.5">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </h2>
          </div>
          <button onClick={onClose} aria-label="Close" className="w-10 h-10 flex items-center justify-center border border-[#E8E4DE] text-[#121212] hover:bg-[#742938] hover:text-white hover:border-[#742938] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Free delivery progress */}
        {items.length > 0 && (
          <div className="px-6 py-4 bg-white border-b border-[#E8E4DE]">
            {qualifies ? (
              <p className="text-xs text-[#1B4332] font-semibold tracking-[0.15em] uppercase flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Free delivery unlocked
              </p>
            ) : (
              <>
                <p className="text-xs text-[#121212]/70 font-light mb-2">
                  Add <span className="font-semibold text-[#742938]">{currSymbol} {remaining.toFixed(0)}</span> more for free delivery
                </p>
                <div className="w-full h-[3px] bg-[#F0EBE0] overflow-hidden">
                  <div className="h-full bg-[#742938] transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </>
            )}
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-20 px-6">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#F9F7F2] flex items-center justify-center text-[#D4AFB9]">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="font-serif text-xl text-[#121212] mb-2">Your cart is empty</p>
              <p className="text-xs text-[#121212]/50 font-light mb-6">Discover our luxury fragrances</p>
              <button onClick={onClose} className="text-[#742938] font-semibold text-[11px] tracking-[0.25em] uppercase hover:text-[#D4AFB9] transition-colors">
                Continue shopping
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#E8E4DE]">
              {items.map((item) => {
                const lineAED = item.price * item.quantity;
                const lineDisp = selectedCurrency !== 'AED' ? convertPrice(lineAED) : lineAED;
                return (
                  <div key={item.id} className="flex gap-4 px-6 py-4 bg-white">
                    <div className="w-20 h-20 bg-[#F9F7F2] flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply p-1.5" />
                      ) : (
                        <svg className="w-8 h-8 text-[#D4AFB9]" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.21 0-4 2.015-4 4.5S9.79 17 12 17s4-2.015 4-4.5S14.21 8 12 8zm0 0V3m0 14v4" /></svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <p className="font-serif text-sm text-[#121212] leading-snug line-clamp-2 pr-1">{item.name}</p>
                        <button onClick={() => handleRemove(item.id, item.name)} aria-label="Remove" className="text-[#121212]/30 hover:text-[#742938] flex-shrink-0 -mt-0.5 -me-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                      {item.variant && <p className="text-[11px] text-[#121212]/50 font-light mt-0.5">{item.variant}</p>}
                      <div className="flex items-center justify-between mt-3">
                        <QuantitySelector value={item.quantity} onChange={(q) => updateQuantity(item.id, q)} size="sm" />
                        <p className="font-semibold text-sm text-[#742938]">{currSymbol} {lineDisp.toFixed(0)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#E8E4DE] bg-white px-6 py-5 space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-[11px] text-[#121212]/60 font-semibold tracking-[0.2em] uppercase">Subtotal</span>
              <span className="text-xl font-serif text-[#742938]">{currSymbol} {subtotal.toFixed(0)}</span>
            </div>
            <p className="text-[11px] text-[#121212]/50 font-light">Taxes and final delivery fees calculated at checkout.</p>
            <Link href="/checkout" onClick={onClose}
              className="block w-full text-center bg-[#742938] text-white text-xs font-semibold tracking-[0.25em] uppercase py-4 hover:bg-[#5c1f2c] transition-colors">
              Proceed to Checkout
            </Link>
            <Link href="/cart" onClick={onClose}
              className="block w-full text-center border border-[#742938] text-[#742938] text-xs font-semibold tracking-[0.25em] uppercase py-3 hover:bg-[#742938] hover:text-white transition-colors">
              View Cart
            </Link>
            <button onClick={onClose}
              className="w-full text-center text-[11px] text-[#121212]/60 hover:text-[#742938] py-1 transition-colors font-light tracking-[0.15em] uppercase">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
