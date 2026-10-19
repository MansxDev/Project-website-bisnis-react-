import React, { useEffect, useState, lazy, Suspense } from 'react';
import ThemedToaster from './components/ui/ThemedToaster.jsx';
import PillNav from './components/layout/PillNav.jsx';
import UtilityCluster from './components/layout/UtilityCluster.jsx';
import ThemeToggle from './components/layout/ThemeToggle.jsx';
import CartDrawer from './components/layout/CartDrawer.jsx';
import Footer from './components/layout/Footer.jsx';
import HeroSection from './components/sections/HeroSection.jsx';
import ProductSection from './components/sections/ProductSection.jsx';
import ServiceSection from './components/sections/ServiceSection.jsx';
import TestimonialSection from './components/sections/TestimonialSection.jsx';
import FaqSection from './components/sections/FaqSection.jsx';
import ContactSection from './components/sections/ContactSection.jsx';
import { scrollToSection } from './utils/scroll.js';
import { useCollection, KEYS } from './data/store.js';
import { useCart } from './hooks/useCart.js';
import { useTheme } from './hooks/useTheme.js';

const AdminPanel = lazy(() => import('./components/layout/AdminPanel.jsx'));

const NAV_ITEMS = [
  { label: 'Beranda', href: '#top' },
  { label: 'Produk', href: '#product-section' },
  { label: 'Layanan', href: '#service-section' },
  { label: 'Kontak', href: '#contact' },
];

const NAV_COLORS = {
  dark: {
    baseColor: '#e2e8f0',
    pillColor: '#0b1120',
    pillTextColor: '#e2e8f0',
    hoveredPillTextColor: '#0b1120',
  },
  light: {
    baseColor: '#0b1120',
    pillColor: '#ffffff',
    pillTextColor: '#0b1120',
    hoveredPillTextColor: '#ffffff',
  },
};

const SECTION_IDS = ['#product-section', '#service-section', '#contact'];

function App() {
  const { theme, toggleTheme } = useTheme();
  const {
    cart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    totalCartItems,
    totalCartPrice,
  } = useCart();
  const products = useCollection(KEYS.products).data;
  const services = useCollection(KEYS.services).data;

  const [activeSection, setActiveSection] = useState('#top');
  const [isAdmin, setIsAdmin] = useState(() => window.location.hash === '#admin');

  useEffect(() => {
    const onHash = () => setIsAdmin(window.location.hash === '#admin');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      let current = '#top';
      for (const id of SECTION_IDS) {
        const el = document.querySelector(id);
        if (el && el.getBoundingClientRect().top <= 150) current = id;
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAdmin) {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-base-100 text-base-content flex items-center justify-center">
            Memuat panel admin...
          </div>
        }
      >
        <AdminPanel
          onExit={() => {
            window.location.hash = '';
          }}
        />
      </Suspense>
    );
  }

  const colors = NAV_COLORS[theme];

  const cartProps = {
    cart,
    totalCartItems,
    totalCartPrice,
    updateQuantity,
    removeItem,
    clearCart,
  };

  return (
    <div id="top" className="min-h-screen bg-base-100 text-base-content">
      <PillNav
        logo={`${process.env.PUBLIC_URL}/logo-mansx.svg`}
        logoAlt="MansX.Dev"
        items={NAV_ITEMS}
        activeHref={activeSection}
        baseColor={colors.baseColor}
        pillColor={colors.pillColor}
        pillTextColor={colors.pillTextColor}
        hoveredPillTextColor={colors.hoveredPillTextColor}
        ease="power3.easeOut"
        initialLoadAnimation
        actions={
          <>
            <ThemeToggle
              theme={theme}
              toggleTheme={toggleTheme}
              className="btn btn-ghost btn-circle"
              style={{ color: 'var(--pill-bg)' }}
            />
            <CartDrawer
              {...cartProps}
              className="btn btn-ghost btn-circle"
              style={{ color: 'var(--pill-bg)' }}
            />
          </>
        }
      />
      <UtilityCluster {...cartProps} theme={theme} toggleTheme={toggleTheme} />
      <main>
        <HeroSection
          scrollToSection={scrollToSection}
          jumlahProduk={products.length}
          jumlahLayanan={services.length}
        />
        <ProductSection products={products} addToCart={addToCart} />
        <ServiceSection services={services} />
        <TestimonialSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <ThemedToaster />
    </div>
  );
}

export default App;