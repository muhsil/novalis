"use client";

import { useEffect, useState } from 'react';
import { useLocaleStore } from '@/store/useLocaleStore';

interface LocalizedTextProps {
  /** Default (English) text — always present; used when AR is missing or locale is EN. */
  en: string;
  /** Optional Arabic text (from WC meta *_ar). Falls back to `en` when empty. */
  ar?: string;
  /** Render as HTML (e.g. WC description content). Defaults to plain text. */
  html?: boolean;
  className?: string;
}

/**
 * Client-side locale switcher for a single string. Renders the English value
 * during SSR (so search engines and first paint see English), then swaps to
 * Arabic once the persisted locale hydrates.
 */
export default function LocalizedText({ en, ar, html, className }: LocalizedTextProps) {
  const locale = useLocaleStore((s) => s.locale);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);

  const value = hydrated && locale === 'ar' && ar && ar.trim() ? ar : en;

  if (html) {
    return (
      <div
        className={className}
        // eslint-disable-next-line react/no-danger -- source is WC description meta; editor-supplied
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  }
  return <span className={className}>{value}</span>;
}
