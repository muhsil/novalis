"use client";

import { useEffect } from 'react';
import { useLocaleStore } from '@/store/useLocaleStore';

export default function LocaleHydrator() {
  const locale = useLocaleStore((s) => s.locale);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  return null;
}
