"use client";

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import CurrencySwitcher from '@/components/ui/CurrencySwitcher';
import { useLocaleStore } from '@/store/useLocaleStore';
import { t } from '@/lib/i18n/translations';

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function LocaleUtilityBar() {
  const locale = useLocaleStore((s) => s.locale);
  const hydrated = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!hydrated || locale !== 'ar') return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 hidden md:block pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 pointer-events-none">
        <div className="pointer-events-auto bg-[#742938] text-[#F9F7F2] shadow-lg rounded-full border border-white/10">
          <div className="px-5 h-10 flex items-center justify-end gap-5 text-[10px] tracking-[0.15em] uppercase font-medium">
            <Link href="/about" className="hover:text-[#D4AFB9] transition-colors">
              {t(locale, 'footer.about_us')}
            </Link>
            <div className="w-[1px] h-3 bg-white/20" />
            <div className="flex items-center gap-4">
              <LanguageSwitcher variant="dark" />
              <CurrencySwitcher variant="dark" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
