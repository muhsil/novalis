import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthCustomer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface AuthState {
  customer: AuthCustomer | null;
  isLoggedIn: boolean;
  login: (customer: AuthCustomer) => void;
  logout: () => void;
  updateCustomer: (updates: Partial<AuthCustomer>) => void;
}

// Legacy localStorage keys from previous rebrands
const LEGACY_AUTH_KEYS = ['shapehive-auth', 'balloonsmall-auth'];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      customer: null,
      isLoggedIn: false,
      login: (customer) => set({ customer, isLoggedIn: true }),
      logout: () => set({ customer: null, isLoggedIn: false }),
      updateCustomer: (updates) =>
        set((state) => ({
          customer: state.customer ? { ...state.customer, ...updates } : null,
        })),
    }),
    {
      name: 'novalis-auth',
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name);
          if (value) return JSON.parse(value);
          // Migrate from legacy keys
          for (const key of LEGACY_AUTH_KEYS) {
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
