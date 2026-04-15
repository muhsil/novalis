import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CurrencyOption {
  code: string;
  symbol: string;
  rate: number; // conversion rate from base currency (AED)
}

const DEFAULT_CURRENCIES: CurrencyOption[] = [
  { code: 'AED', symbol: 'د.إ', rate: 1 },
  { code: 'USD', symbol: '$', rate: 0.2723 },
  { code: 'EUR', symbol: '€', rate: 0.2513 },
  { code: 'SAR', symbol: 'ر.س', rate: 1.0208 },
  { code: 'KWD', symbol: 'د.ك', rate: 0.0834 },
  { code: 'QAR', symbol: 'ر.ق', rate: 0.9912 },
  { code: 'BHD', symbol: 'د.ب', rate: 0.1026 },
  { code: 'OMR', symbol: 'ر.ع', rate: 0.1048 },
  { code: 'GBP', symbol: '£', rate: 0.2152 },
  { code: 'INR', symbol: '₹', rate: 22.77 },
];

interface CurrencyState {
  selectedCurrency: string;
  currencies: CurrencyOption[];
  setSelectedCurrency: (code: string) => void;
  setCurrencies: (currencies: CurrencyOption[]) => void;
  convertPrice: (priceInAED: number) => number;
  getSymbol: () => string;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      selectedCurrency: 'AED',
      currencies: DEFAULT_CURRENCIES,
      setSelectedCurrency: (code: string) => set({ selectedCurrency: code }),
      setCurrencies: (currencies: CurrencyOption[]) => set({ currencies }),
      convertPrice: (priceInAED: number) => {
        const { selectedCurrency, currencies } = get();
        const curr = currencies.find((c) => c.code === selectedCurrency);
        if (!curr || curr.code === 'AED') return priceInAED;
        return Math.round(priceInAED * curr.rate * 100) / 100;
      },
      getSymbol: () => {
        const { selectedCurrency, currencies } = get();
        return currencies.find((c) => c.code === selectedCurrency)?.symbol || selectedCurrency;
      },
    }),
    {
      name: 'novalis-currency',
      partialize: (state) => ({ selectedCurrency: state.selectedCurrency }),
    }
  )
);
