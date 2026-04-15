import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image?: string;
  slug: string;
}

interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  toggleItem: (item: WishlistItem) => void;
  clearWishlist: () => void;
}

// Legacy localStorage keys from previous rebrands
const LEGACY_WISHLIST_KEYS = ['shapehive-wishlist', 'balloonsmall-wishlist'];

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          if (state.items.some((i) => i.id === item.id)) return state;
          return { items: [...state.items, item] };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      isInWishlist: (id) => get().items.some((i) => i.id === id),
      toggleItem: (item) => {
        const exists = get().items.some((i) => i.id === item.id);
        if (exists) {
          set((state) => ({ items: state.items.filter((i) => i.id !== item.id) }));
        } else {
          set((state) => ({ items: [...state.items, item] }));
        }
      },
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'novalis-wishlist',
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name);
          if (value) return JSON.parse(value);
          for (const key of LEGACY_WISHLIST_KEYS) {
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
