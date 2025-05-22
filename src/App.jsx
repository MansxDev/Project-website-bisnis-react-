import React, { useState, useEffect, useRef } from 'react';
import './output.css';
import { Toaster } from 'react-hot-toast'; 
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import ProductSection from './components/ProductSection.jsx';
import ServiceSection from './components/ServiceSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import {
    scrollToSection,
    allProductData,
    serviceData,
    useCart 
} from './utils/utils.js'; 

const Footer = () => {
  return (
    <footer className="footer footer-center p-6 sm:p-8 md:p-10 bg-gray-500 text-white">
        <aside>
            <p className="font-bold text-base sm:text-lg md:text-xl">
                MANSX <br />
                WEB DEVELOPER
            </p>
            <p className="text-sm sm:text-base">Memberikan solusi digital terbaik sejak 2025.</p>
        </aside>
        <nav>
            <div className="grid grid-flow-col gap-3 sm:gap-4">
                 <a href="https://instagram.com/shophosting" target="_blank" rel="noreferrer" className="link link-hover tooltip" data-tip="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.07 4.85-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.205 0-3.584-.012-4.85-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.068-1.644-.068-4.85 0-3.204.012-3.584.07-4.85.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.668.014-4.949.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.69-.073 4.949 0 3.259.014 3.668.072 4.949.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.69.073 4.949.073 3.259 0 3.668-.014 4.949-.072 4.354-.2 6.78-2.618 6.979-6.98.059-1.281.073-1.69.073-4.949 0-3.259-.014-3.668-.072-4.949-.199-4.358-2.618-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162S15.403 5.838 12 5.838zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm7.846-10.405c0-.795-.646-1.44-1.44-1.44s-1.44.645-1.44 1.44.646 1.44 1.44 1.44 1.44-.645 1.44-1.44z"/></svg>
                </a>
                 <a href="https://facebook.com/shophosting" target="_blank" rel="noreferrer" className="link link-hover tooltip" data-tip="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.246 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
                </a>
                 <a href="https://github.com" target="_blank" rel="noreferrer" className="link link-hover tooltip" data-tip="GitHub">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.903.162 1.231-.332 1.231-.739 0-.365-.013-1.303-.026-2.511-3.338.724-4.042-1.61-4.042-1.61-.542-1.368-1.328-1.737-1.328-1.737-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.177.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .409.329.914 1.242.739 4.769-1.57 8.197-6.094 8.197-11.387c0-6.627-5.373-12-12-12z"></path></svg>
                </a>
            </div>
        </nav>
        <aside>
            <p className="text-xs sm:text-sm">Copyright © 2025 - All right reserved by MansX.Dev</p>
        </aside>
    </footer>
  );
};

function App() {
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());

  const { cart, addToCart, updateQuantity, removeItem, totalCartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentScrollTime = Date.now();

      setIsNavbarScrolled(window.scrollY > 50);
      lastScrollY.current = currentScrollY;
      lastScrollTime.current = currentScrollTime;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="top" className="bg-base-200 font-bold text-gray-800 dark:text-white">
      <Navbar
        totalCartItems={totalCartItems}
        cart={cart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        isScrolled={isNavbarScrolled}
        scrollToSection={scrollToSection}
      />
      <HeroSection scrollToSection={scrollToSection} />
      <ProductSection products={allProductData} addToCart={addToCart} />
      <ServiceSection services={serviceData} />
      <ContactSection />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;