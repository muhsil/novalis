import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  productId?: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variant?: string;
}

interface CartState {
  items: CartItem[];
  deliveryDate: string | null;
  deliveryTime: string | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  setDelivery: (date: string, time: string) => void;
  clearCart: () => void;
}

// Legacy localStorage keys from previous rebrands
const LEGACY_CART_KEYS = ['shapehive-cart', 'balloonsmall-cart'];

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      deliveryDate: null,
      deliveryTime: null,
      addToCart: (item) => set((state) => {
        const existing = state.items.find((i) => i.id === item.id);
        if (existing) {
          return {
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          };
        }
        return { items: [...state.items, item] };
      }),
      removeFromCart: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) => set((state) => ({
        items: quantity <= 0
          ? state.items.filter((i) => i.id !== id)
          : state.items.map((i) => i.id === id ? { ...i, quantity } : i)
      })),
      setDelivery: (date, time) => set({ deliveryDate: date, deliveryTime: time }),
      clearCart: () => set({ items: [], deliveryDate: null, deliveryTime: null }),
    }),
    {
      name: 'novalis-cart',
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name);
          if (value) return JSON.parse(value);
          for (const key of LEGACY_CART_KEYS) {
            const legacy = localStorage.getItem(key);
            if (legacy) {
              localStorage.setItem(name, legacy);
              localStorage.removeItem(key);
              return JSON.parse(legacy);
            }
          }
          return null;
        },
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
