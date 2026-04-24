import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CurrencyOption {
  code: string;
  symbol: string;
  /** English display name, e.g. "UAE Dirham". */
  name: string;
  /** Conversion rate from base currency (AED). */
  rate: number;
}

const DEFAULT_CURRENCIES: CurrencyOption[] = [
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', rate: 1 },
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 0.2723 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.2513 },
  { code: 'GBP', symbol: '£', name: 'Pound Sterling', rate: 0.2152 },
  { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal', rate: 1.0208 },
  { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar', rate: 0.0834 },
  { code: 'QAR', symbol: 'ر.ق', name: 'Qatari Riyal', rate: 0.9912 },
  { code: 'BHD', symbol: 'د.ب', name: 'Bahraini Dinar', rate: 0.1026 },
  { code: 'OMR', symbol: 'ر.ع', name: 'Omani Rial', rate: 0.1048 },
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
      // Drop INR from any previously persisted selection and re-home to AED.
      migrate: (persisted) => {
        const p = persisted as { selectedCurrency?: string } | undefined;
        if (p?.selectedCurrency === 'INR') return { selectedCurrency: 'AED' };
        return p;
      },
      version: 2,
    }
  )
);
