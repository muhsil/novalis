"use client";
import { useCartStore } from '@/store/useCartStore';
import { toast } from '@/components/ui/Toast';
import Link from 'next/link';
import CartItemCard from '@/components/ui/CartItemCard';
import { useStoreSettings } from '@/components/providers/StoreSettingsProvider';
import { useCurrencyStore } from '@/store/useCurrencyStore';

const FREE_DELIVERY_THRESHOLD_AED = 100;

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity } = useCartStore();
  const { currency } = useStoreSettings();
  const { selectedCurrency, convertPrice, getSymbol } = useCurrencyStore();
  const currSymbol = selectedCurrency !== 'AED' ? getSymbol() : currency;

  const subtotalAED = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const subtotal = selectedCurrency !== 'AED' ? convertPrice(subtotalAED) : subtotalAED;
  const threshold = selectedCurrency !== 'AED' ? convertPrice(FREE_DELIVERY_THRESHOLD_AED) : FREE_DELIVERY_THRESHOLD_AED;
  const remaining = Math.max(0, threshold - subtotal);
  const progress = Math.min(100, (subtotal / threshold) * 100);

  const handleRemove = (id: number, name: string) => {
    removeFromCart(id);
    toast(`"${name}" removed from cart`, 'info');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-[90] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 end-0 h-full w-full max-w-sm bg-white z-[100] shadow-2xl flex flex-col
        transition-transform duration-300 ${open ? 'translate-x-0' : 'ltr:translate-x-full rtl:-translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0f0f0]">
          <h2 className="font-serif text-lg text-[#191919]">Your Cart <span className="text-[#C9A96E] font-light">({items.length})</span></h2>
          <button onClick={onClose} className="p-2 hover:bg-[#f5f5f5] transition-colors">
            <svg className="w-5 h-5 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Free delivery progress */}
        {items.length > 0 && (
          <div className="px-5 py-3 bg-[#FAF6F0] border-b border-[#f0ebe0]">
            {remaining > 0 ? (
              <>
                <p className="text-xs text-[#666] font-light mb-2">
                  Add <span className="font-semibold text-[#C9A96E]">{currSymbol} {remaining.toFixed(0)}</span> more for free delivery
                </p>
                <div className="w-full h-1.5 bg-[#e8e4dc] rounded-full overflow-hidden">
                  <div className="h-full bg-[#C9A96E] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </>
            ) : (
              <p className="text-xs text-[#00B578] font-medium flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                You qualify for free delivery!
              </p>
            )}
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-3">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-4 text-[#ddd]">
                <svg className="w-14 h-14 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-[#666] font-light text-sm mb-1">Your cart is empty</p>
              <p className="text-[#bbb] text-xs font-light mb-4">Discover our luxury fragrances</p>
              <button onClick={onClose} className="text-[#C9A96E] font-semibold text-xs tracking-[0.1em] uppercase hover:underline">
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <CartItemCard
                key={item.id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                image={item.image}
                variantLabel={item.variant}
                variant="drawer"
                onQuantityChange={(q) => updateQuantity(item.id, q)}
                onRemove={() => handleRemove(item.id, item.name)}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#f0f0f0] px-5 py-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[#666] text-sm font-light">Subtotal</span>
              <span className="text-lg font-medium text-[#191919]">{currSymbol} {subtotal.toFixed(0)}</span>
            </div>
            <Link href="/checkout" onClick={onClose}
              className="block w-full text-center bg-[#C9A96E] text-white text-xs font-semibold tracking-[0.15em] uppercase py-3.5 hover:bg-[#B8985D] transition-colors">
              Proceed to Checkout
            </Link>
            <button onClick={onClose}
              className="w-full text-center text-xs text-[#999] hover:text-[#666] py-1 transition-colors font-light">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
