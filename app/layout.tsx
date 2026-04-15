import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { OrganizationJsonLd, WebSiteJsonLd, LocalBusinessJsonLd } from '@/components/seo/JsonLd';
import GoogleAnalytics from '@/components/seo/GoogleAnalytics';
import { GoogleTagManagerScript, GoogleTagManagerNoScript } from '@/components/seo/GoogleTagManager';
import StoreSettingsProvider from '@/components/providers/StoreSettingsProvider';
import { getStoreSettings } from '@/lib/store-settings';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const SITE_URL = 'https://shapehive.in';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1A1A2E',
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Novalis – Luxury Arabic Perfumes & Fragrances | UAE',
    template: '%s | Novalis – Luxury Perfumes UAE',
  },
  description: 'Discover exquisite Arabic perfumes, oud collections, and luxury fragrances from Novalis. Handcrafted scents inspired by Emirati heritage. Shop premium perfumes with delivery across the UAE.',
  keywords: [
    'luxury perfume UAE', 'Arabic perfume Dubai', 'oud perfume UAE',
    'premium fragrance Dubai', 'Novalis perfume', 'Arabian oud Dubai',
    'luxury fragrance online UAE', 'perfume delivery Dubai', 'niche perfume UAE',
    'dokhun incense Dubai', 'Arabic incense UAE', 'oud oil Dubai',
    'perfume shop Dubai', 'luxury scent UAE', 'designer perfume Dubai',
    'bakhoor Dubai', 'Arabian perfume online', 'perfume gift set UAE',
    'oud collection Dubai', 'premium oud UAE', 'fragrance Dubai',
    'perfume Abu Dhabi', 'luxury perfume Sharjah', 'Arabic scent UAE',
    'Emirati perfume', 'traditional perfume Dubai', 'perfume oil UAE',
    'luxury body spray Dubai', 'perfume delivery Abu Dhabi',
    'Arabic fragrance GCC', 'oud perfume Saudi Arabia',
    'luxury perfume Bahrain', 'perfume Qatar', 'fragrance Oman',
  ],
  authors: [{ name: 'Novalis', url: SITE_URL }],
  creator: 'Novalis',
  publisher: 'Novalis',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Novalis – Luxury Arabic Perfumes & Fragrances | UAE',
    description: 'Discover exquisite Arabic perfumes, oud collections, and luxury fragrances from Novalis. Handcrafted scents with delivery across the UAE.',
    type: 'website',
    locale: 'en_AE',
    url: SITE_URL,
    siteName: 'Novalis',
    images: [{
      url: '/hero-balloons.png',
      width: 1200,
      height: 630,
      alt: 'Novalis – Luxury Arabic Perfumes & Fragrances',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Novalis – Luxury Arabic Perfumes & Fragrances | UAE',
    description: 'Discover exquisite Arabic perfumes, oud collections, and luxury fragrances from Novalis. Delivery across the UAE.',
    images: ['/hero-balloons.png'],
    creator: '@novalis_ae',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'T-lkfUmRMEleqb_qAZ-QUihAOyNjxu1SLrrE6kfVpkQ',
  },
  category: 'shopping',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getStoreSettings();

  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <GoogleTagManagerNoScript />
        <GoogleTagManagerScript />
        <GoogleAnalytics />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <LocalBusinessJsonLd currency={settings.currency} />
        <StoreSettingsProvider currency={settings.currency} numDecimals={settings.numDecimals}>
          {children}
        </StoreSettingsProvider>
      </body>
    </html>
  );
}
