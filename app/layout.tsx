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
  weight: ['300', '400', '500', '600', '700', '800'],
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
    default: 'Novalis | Luxury Perfumes with an Emirati Soul',
    template: '%s | Novalis Perfumes UAE',
  },
  description: 'Shop luxury Arabic perfumes & oud fragrances at Novalis UAE. Premium Emirati-inspired scents with free delivery across UAE, Dubai, Abu Dhabi & GCC.',
  keywords: [
    'luxury perfumes Dubai', 'oud perfume', 'musk fragrance', 'amber scent',
    'Novalis', 'Arabic perfumes', 'Emirati fragrances', 'bakhoor',
    'dehn al oud', 'niche perfumery', 'artisan fragrances',
    'premium scents UAE', 'perfume gift sets', 'authentic Arabian perfumes',
    'best Dubai perfumes', 'luxury oud fragrance', 'Arabian musk perfume',
    'AI perfumery', 'modern fragrance technology', 'perfume notes',
    'top notes', 'heart notes', 'base notes', 'unisex perfumes',
    'exclusive fragrances', 'perfume Abu Dhabi', 'luxury perfume Sharjah',
    'dokhun incense', 'oud oil Dubai', 'perfume Qatar', 'fragrance Oman',
    'luxury perfume Bahrain', 'perfume Saudi Arabia', 'GCC fragrances',
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
    title: 'Novalis | Luxury Perfumes with an Emirati Soul',
    description: 'Shop luxury Arabic perfumes & oud fragrances at Novalis UAE. Premium Emirati-inspired scents with free delivery across UAE, Dubai, Abu Dhabi & GCC.',
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Novalis Perfumes UAE | Luxury Arabic Perfume Brand',
    images: [{
      url: '/novalis-logo.png',
      width: 1200,
      height: 630,
      alt: 'Novalis Perfumes | Luxury Fragrances with an Emirati Soul',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Novalis Perfumes | Luxury Fragrances with an Emirati Soul',
    description: 'Discover Novalis luxury perfumes from Dubai - exclusive oud, musk, and amber compositions with a touch of AI innovation.',
    images: ['/novalis-logo.png'],
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
    icon: '/favicon.png',
    apple: '/favicon.png',
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
