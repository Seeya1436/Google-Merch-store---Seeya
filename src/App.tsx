import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/home/HeroSection';
import { ShopByCategory } from './components/home/ShopByCategory';
import { JustDroppedCarousel } from './components/home/JustDroppedCarousel';
import { EditorialSection } from './components/home/EditorialSection';
import { BestSellersGrid } from './components/home/BestSellersGrid';
import { FindYourFit } from './components/home/FindYourFit';
import { PromoBanner } from './components/home/PromoBanner';
import { NewsletterSection } from './components/home/NewsletterSection';
import { ProductGrid } from './components/shop/ProductGrid';
import { ProductDetailView } from './components/product/ProductDetailView';
import { QuickAddModal } from './components/common/QuickAddModal';
import { SizeGuideModal } from './components/common/SizeGuideModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { AccountModal } from './components/account/AccountModal';
import { SearchOverlay } from './components/shop/SearchOverlay';
import { ToastContainer } from './components/common/ToastContainer';

const MainContent: React.FC = () => {
  const { activeView } = useShop();

  return (
    <main className="flex-1">
      {activeView === 'home' && (
        <>
          <HeroSection />
          <ShopByCategory />
          <JustDroppedCarousel />
          <EditorialSection />
          <BestSellersGrid />
          <FindYourFit />
          <PromoBanner />
          <NewsletterSection />
        </>
      )}

      {activeView === 'plp' && <ProductGrid />}

      {activeView === 'pdp' && <ProductDetailView />}
    </main>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
        <AnnouncementBar />
        <Header />
        <MainContent />
        <Footer />

        {/* Global Modals & Drawers */}
        <QuickAddModal />
        <SizeGuideModal />
        <CartDrawer />
        <CheckoutModal />
        <AccountModal />
        <SearchOverlay />
        <ToastContainer />
      </div>
    </ShopProvider>
  );
}
