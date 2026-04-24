"use client";

import React, { createContext, useContext } from 'react';

interface StoreSettingsContextType {
  currency: string;
  numDecimals: number;
  freeDeliveryThreshold: number;
  storeCity: string;
  storeAddress: string;
}

const StoreSettingsContext = createContext<StoreSettingsContextType>({
  currency: 'AED',
  numDecimals: 0,
  freeDeliveryThreshold: 100,
  storeCity: 'Dubai',
  storeAddress: 'Dubai, United Arab Emirates',
});

export function useStoreSettings() {
  return useContext(StoreSettingsContext);
}

interface StoreSettingsProviderProps {
  currency: string;
  numDecimals: number;
  freeDeliveryThreshold: number;
  storeCity: string;
  storeAddress: string;
  children: React.ReactNode;
}

export default function StoreSettingsProvider({
  currency,
  numDecimals,
  freeDeliveryThreshold,
  storeCity,
  storeAddress,
  children,
}: StoreSettingsProviderProps) {
  return (
    <StoreSettingsContext.Provider value={{ currency, numDecimals, freeDeliveryThreshold, storeCity, storeAddress }}>
      {children}
    </StoreSettingsContext.Provider>
  );
}
