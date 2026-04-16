"use client";

import { useLocaleStore } from '@/store/useLocaleStore';
import type { Locale } from '@/lib/i18n/translations';

interface LanguageSwitcherProps {
  variant?: 'compact' | 'full' | 'dark';
}

export default function LanguageSwitcher({ variant = 'compact' }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocaleStore();

  const toggle = () => {
    const next: Locale = locale === 'en' ? 'ar' : 'en';
    setLocale(next);
    document.documentElement.lang = next;
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
  };

  if (variant === 'full') {
    return (
      <button
        onClick={toggle}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#f8f8f8] transition-colors text-sm font-medium text-[#555]"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span>{locale === 'en' ? 'العربية' : 'English'}</span>
      </button>
    );
  }

  const isDark = variant === 'dark';

  return (
    <button
      onClick={toggle}
      className={isDark
        ? 'flex items-center gap-1 px-2 py-1 hover:bg-white/10 transition-colors text-xs font-medium text-white/70 hover:text-white'
        : 'flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-[#f8f8f8] transition-colors text-xs font-semibold text-[#555] border border-[#eee]'
      }
      title={locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
      <span>{locale === 'en' ? 'AR' : 'EN'}</span>
    </button>
  );
}
