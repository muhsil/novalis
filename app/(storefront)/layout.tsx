import Navbar from '@/components/ui/Navbar';
import WhatsAppFab from '@/components/ui/WhatsAppFab';
import MobileBottomNav from '@/components/ui/mobile/MobileBottomNav';
import LocaleUtilityBar from '@/components/ui/LocaleUtilityBar';
import Footer from '@/components/ui/Footer';
import { Suspense } from 'react';

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 mobile-body-padding">{children}</main>
      <Footer />
      <WhatsAppFab />
      <LocaleUtilityBar />
      <Suspense fallback={null}>
        <MobileBottomNav />
      </Suspense>
    </div>
  );
}
