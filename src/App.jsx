import React, { useState, useEffect, useRef } from 'react';
import './output.css';
import BlurText from './components/animations/BlurText.js'; 
import RotatingText from './components/animations/RotatingText'; 

import {
    formatCurrency,
    useScrollAnimation,
    scrollToSection,
    allProductData,
    serviceData
} from './utils/utils.js'; 

const CartDropdown = ({ cart, totalCartItems, updateQuantity, removeItem }) => {
    const totalCartPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="dropdown dropdown-end mr-2">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                   </svg>
                    <span id="cart-item-count" className={`badge badge-sm indicator-item bg-red-500 text-white ${totalCartItems === 0 ? 'hidden' : ''}`}>
                        {totalCartItems}
                    </span>
                </div>
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 dark:bg-gray-700 rounded-box w-72 text-gray-800 dark:text-white">
                <h4 className="font-bold px-4 py-2 border-b border-gray-200 dark:border-gray-600">Keranjang Belanja</h4>
                <div>
                    {cart.length === 0 ? (
                        <li className="px-4 py-2 text-center text-gray-500 dark:text-gray-400">Keranjang kosong</li>
                    ) : (
                        cart.map(item => (
                            <li key={item.id} className="border-b border-gray-200 dark:border-gray-600 py-2 px-4 flex items-center justify-between">
                                <div>
                                    <span className="font-semibold">{item.name}</span>
                                    <br/>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{formatCurrency(item.price)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="btn btn-xs btn-outline btn-circle decrease-quantity" onClick={() => updateQuantity(item.id, -1)}>-</button>
                                    <span className="text-sm">{item.quantity}</span>
                                    <button className="btn btn-xs btn-outline btn-circle increase-quantity" onClick={() => updateQuantity(item.id, 1)}>+</button>
                                    <button className="btn btn-xs btn-ghost text-error remove-item tooltip" data-tip="Hapus Item" onClick={() => removeItem(item.id)}>
                                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                           <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.927a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.141-2.043-2.242H10.51c-1.133.101-2.043 1.06-2.043 2.242v.916m-.75 0H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621.504-1.125-1.125-1.125Z" />
                                       </svg>
                                    </button>
                                </div>
                            </li>
                        ))
                    )}
                </div>
                <div className="divider my-1"></div>
                <div className="flex justify-between items-center px-4 py-2">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-primary">{formatCurrency(totalCartPrice)}</span>
                </div>
            </ul>
        </div>
    );
};

const Navbar = ({ totalCartItems, cart, updateQuantity, removeItem, isScrolled, scrollToSection }) => {
  return (
    <div className={`navbar sticky top-0 z-50 shadow text-white backdrop-blur-sm rounded transition-colors duration-300 ${isScrolled ? 'bg-opacity-90' : 'bg-opacity-70'}
              px-4 sm:px-6 md:px-8 lg:px-12
    `}>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-lg sm:text-xl md:text-2xl" onClick={() => scrollToSection('#top')}>WebMansX</a>
      </div>
      <div className="flex-none">
        <CartDropdown cart={cart} totalCartItems={totalCartItems} updateQuantity={updateQuantity} removeItem={removeItem} />

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 dark:bg-gray-700 rounded-box w-52 text-gray-800 dark:text-white">
            <li><a onClick={() => scrollToSection('#product-section')} className="nav-link">Produk</a></li>
            <li><a onClick={() => scrollToSection('#service-section')} className="nav-link">Layanan</a></li>
            <li><a onClick={() => scrollToSection('#contact')} className="nav-link">Kontak</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const HeroSection = ({ scrollToSection }) => {
    const handleBlurAnimationComplete = () => {
        console.log('Animation completed!');
    };

  return (

    <div className="hero min-h-screen text-gray-800 dark:text-white py-10 flex items-center justify-center">
      <div className="hero-content text-center">

        <div className="max-w-xs sm:max-w-md md:max-w-lg mx-auto">

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">Halo Semuanya</h1>


          <p className="py-4 sm:py-6 text-base sm:text-lg md:text-xl leading-relaxed mb-8">
             <BlurText
                text="Website Yang Menyediakan all kebutuhan kamu"
                delay={150}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleBlurAnimationComplete}
                className="inline-block"
             />
             
             <RotatingText
                texts={['klik', 'tombol', 'di', 'bawah']}
                mainClassName="px-2 sm:px-2 md:px-3 bg-yellow-500 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
            />
           </p>

          <button className="btn btn-primary animated-glow" onClick={() => scrollToSection('#product-section')}>Mulai Sekarang</button>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, addToCart }) => {
  const [elementRef, isVisible] = useScrollAnimation(0.2);

  const animationClasses = isVisible ? 'show' : '';

  const getBadgeColor = (category) => {
    switch (category) {
        case 'vps': return 'badge-primary';
        case 'bot-wa': return 'badge-secondary';
        case 'website': return 'badge-accent';
        default: return 'badge-neutral';
    }
  };

  const cardClasses = `card w-80 shrink-0 product-card scroll-animation bg-base-100 shadow-xl ${animationClasses}
  category-${product.category}`;

  return (
    <div ref={elementRef} className={cardClasses} data-product-id={product.id}>
      <div className={`badge absolute right-2 top-2 ${getBadgeColor(product.category)}`}>
          {product.category === 'vps' ? 'VPS' : product.category === 'bot-wa' ? 'Bot WA' : product.category === 'website' ? 'Website' : product.category}
      </div>
      <figure><img src={product.image} alt={product.name} className="min-w-full h-48
      object-cover rounded-lg card-side"/></figure>
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">{product.description}</p>

        <span className="text-2xl font-bold text-white mt-4 block">{`Rp${product.price.toLocaleString('id-ID')}`} {product.category === 'vps' || product.category === 'bot-wa' ? '/bulan' : ''}</span>

        <div className="card-actions flex items-center gap-2 mt-2 justify-end">
          <button className="btn btn-primary btn-sm buy-now-btn">
               {product.category === 'website' ? 'Pesan' : 'Beli'} Sekarang
           </button>
          <button
            className="btn btn-ghost btn-circle btn-sm add-to-cart-btn tooltip"
            data-tip="Tambah ke Keranjang"
            onClick={() => addToCart(product)}
          >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
               <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
             </svg>
          </button>
        </div>
      </div>
    </div>
  );
};



const ProductSection = ({ products, addToCart }) => { 
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <section className="container mx-auto px-4 py-10" id="product-section">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">Produk Kami</h2>

      <div className="flex justify-center mb-8">
        <div className="dropdown">
          <label tabIndex={0} className="btn m-1 bg-base-100 dark:bg-gray-800 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600">
            {selectedCategory === 'all' ? 'Semua' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace('-', ' ')} ▼
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 dark:bg-gray-700 rounded-box w-52 text-gray-800 dark:text-white">
            <li><a onClick={() => setSelectedCategory('all')} className={`category-filter ${selectedCategory === 'all' ? 'active' : ''}`}>Semua</a></li>
            <li><a onClick={() => setSelectedCategory('vps')} className={`category-filter ${selectedCategory === 'vps' ? 'active' : ''}`}>VPS</a></li>
            <li><a onClick={() => setSelectedCategory('bot-wa')} className={`category-filter ${selectedCategory === 'bot-wa' ? 'active' : ''}`}>Bot WhatsApp</a></li>
            <li><a onClick={() => setSelectedCategory('website')} className={`category-filter ${selectedCategory === 'website' ? 'active' : ''}`}>Website</a></li>
          </ul>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-4 scrollbar-hide space-x-4
                  md:grid md:grid-cols-2 md:gap-6 md:space-x-0
                  lg:grid-cols-3 lg:gap-8">
        {filteredProducts.map(product => (
           <div key={product.id} className="shrink-0 w-80 md:w-auto">
             <ProductCard
               product={product}
               addToCart={addToCart}
             />
           </div>
        ))}
      </div>


    </section>
  );
};


const ServiceCard = ({ service }) => {
    const [elementRef, isVisible] = useScrollAnimation(0.2);

    const animationClasses = isVisible ? 'show' : '';

    const cardClasses = `card w-80 shrink-0 scroll-animation bg-base-100 dark:bg-gray-800 shadow-xl ${animationClasses}`;

  return (
    <div ref={elementRef} className={cardClasses}>
      {/* Menggunakan service.image di sini */}
      <figure><img src={service.image} alt={service.name} className="min-w-full h-48 object-cover"/></figure>
      <div className="card-body">
        <h3 className="card-title">{service.name}</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">{service.description}</p>
        <ul className="list-disc list-inside text-sm mt-2 text-gray-700 dark:text-gray-300">
           {service.features.map((feature, index) => (
               <li key={index}>{feature}</li>
           ))}
        </ul>
        <div className="mt-4">
          <span className="text-xl font-bold text-primary">{`Mulai Rp${service.price.toLocaleString('id-ID')}${service.interval || ''}`}</span>
          <button className="btn btn-primary btn-sm mt-2">Konsultasi Sekarang</button>
        </div>
      </div>
    </div>
  );
};

const ServiceSection = ({ services }) => {
  return (
    <section className="container mx-auto px-4 py-10" id="service-section">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">Layanan Kami</h2>

      <div className="flex overflow-x-auto pb-4 scrollbar-hide space-x-4
                  md:grid md:grid-cols-2 md:gap-6 md:space-x-0
                  lg:grid-cols-3 lg:gap-8">
        {services.map(service => (
          <div key={service.id} className="shrink-0 w-80 md:w-auto">
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [box1Ref, isBox1Visible] = useScrollAnimation(0.2);
  const [box2Ref, isBox2Visible] = useScrollAnimation(0.2);

  return (
    <section className="py-10 sm:py-12 md:py-16 text-gray-800 dark:text-white" id="contact">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">Hubungi Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 max-w-2xl mx-auto">
          {/* Email Box */}
          <div
            ref={box1Ref}
            className={`flex flex-col items-center p-4 sm:p-6 bg-base-100 dark:bg-gray-800 rounded-lg shadow-xl scroll-animation ${
              isBox1Visible ? 'show' : ''
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Email</h3>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
              Kirimkan pesan Anda melalui email.
            </p>
            <a
              href="mailto:mansx.develover@gmail.com"
              className="btn btn-primary btn-sm mt-4 text-xs sm:text-sm"
            >
              mansx.develover@gmail.com
            </a>
          </div>

          
          <div
            ref={box2Ref}
            className={`flex flex-col items-center p-4 sm:p-6 bg-base-100 dark:bg-gray-800 rounded-lg shadow-xl scroll-animation ${
              isBox2Visible ? 'show' : ''
            }`}
          >
            <svg
              viewBox="0 0 256 259"
              width="64"
              height="64"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
              className="w-10 h-10 sm:w-12 sm:h-12 mb-4"
            >
              <path
                d="m67.663 221.823 4.185 2.093c17.44 10.463 36.971 15.346 56.503 15.346 61.385 0 111.609-50.224 111.609-111.609 0-29.297-11.859-57.897-32.785-78.824-20.927-20.927-48.83-32.785-78.824-32.785-61.385 0-111.61 50.224-110.912 112.307 0 20.926 6.278 41.156 16.741 58.594l2.79 4.186-11.16 41.156 41.853-10.464Z"
                fill="#00E676"
              />
              <path
                d="M219.033 37.668C195.316 13.254 162.531 0 129.048 0 57.898 0 .698 57.897 1.395 128.35c0 22.322 6.278 43.947 16.742 63.478L0 258.096l67.663-17.439c18.834 10.464 39.76 15.347 60.688 15.347 70.453 0 127.653-57.898 127.653-128.35 0-34.181-13.254-66.269-36.97-89.986ZM129.048 234.38c-18.834 0-37.668-4.882-53.712-14.648l-4.185-2.093-40.458 10.463 10.463-39.76-2.79-4.186C7.673 134.63 22.322 69.058 72.546 38.365c50.224-30.692 115.097-16.043 145.79 34.181 30.692 50.224 16.043 115.097-34.18 145.79-16.045 10.463-35.576 16.043-55.108 16.043Zm61.385-77.428-7.673-3.488s-11.16-4.883-18.136-8.371c-.698 0-1.395-.698-2.093-.698-2.093 0-3.488.698-4.883 1.396 0 0-.697.697-10.463 11.858-.698 1.395-2.093 2.093-3.488 2.093h-.698c-.697 0-2.092-.698-2.79-1.395l-3.488-1.395c-7.673-3.488-14.648-7.674-20.229-13.254-1.395-1.395-3.488-2.79-4.883-4.185-4.883-4.883-9.766-10.464-13.253-16.742l-.698-1.395c-.697-.698-.697-1.395-1.395-2.79 0-1.395 0-2.79.698-3.488 0 0 2.79-3.488 4.882-5.58 1.396-1.396 2.093-3.488 3.488-4.883 1.395-2.093 2.093-4.883 1.395-6.976-.697-3.488-9.068-22.322-11.16-26.507-1.396-2.093-2.79-2.79-4.883-3.488H83.01c-1.396 0-2.79.698-4.186.698l-.698.697c-1.395.698-2.79 2.093-4.185 2.79-1.395 1.396-2.093 2.79-3.488 4.186-4.883 6.278-7.673 13.951-7.673 21.624 0 5.58 1.395 11.161 3.488 16.044l.698 2.093c6.278 13.253 14.648 25.112 25.81 35.575l2.79 2.79c2.092 2.093 4.185 3.488 5.58 5.58 14.649 12.557 31.39 21.625 50.224 26.508 2.093.697 4.883.697 6.976 1.395h6.975c3.488 0 7.673-1.395 10.464-2.79 2.092-1.395 3.487-1.395 4.882-2.79l1.396-1.396c1.395-1.395 2.79-2.092 4.185-3.487 1.395-1.395 2.79-2.79 3.488-4.186 1.395-2.79 2.092-6.278 2.79-9.765v-4.883s-.698-.698-2.093-1.395Z"
                fill="#FFF"
              />
            </svg>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">WhatsApp</h3>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
              Hubungi kami langsung via WhatsApp.
            </p>
            <a
              href="https://wa.me/6281546543913"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success btn-sm mt-4 text-xs sm:text-sm"
            >
              +62 815-4654-3913
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

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
                 <a href="https://instagram.com/shophosting" target="_blank" className="link link-hover tooltip" data-tip="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.07 4.85-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.205 0-3.584-.012-4.85-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.068-1.644-.068-4.85 0-3.204.012-3.584.07-4.85.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.668.014-4.949.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.69-.073 4.949 0 3.259.014 3.668.072 4.949.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.69.073 4.949.073 3.259 0 3.668-.014 4.949-.072 4.354-.2 6.78-2.618 6.979-6.98.059-1.281.073-1.69.073-4.949 0-3.259-.014-3.668-.072-4.949-.199-4.358-2.618-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162S15.403 5.838 12 5.838zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm7.846-10.405c0-.795-.646-1.44-1.44-1.44s-1.44.645-1.44 1.44.646 1.44 1.44 1.44 1.44-.645 1.44-1.44z"/></svg>
                </a>
                 <a href="https://facebook.com/shophosting" target="_blank" className="link link-hover tooltip" data-tip="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.246 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
                </a>
                 <a href="https://github.com" target="_blank" className="link link-hover tooltip" data-tip="GitHub">
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
  const [cart, setCart] = useState([]);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentScrollTime = Date.now();
      const deltaTime = currentScrollTime - lastScrollTime.current;
      const deltaY = currentScrollY - lastScrollY.current;


      if (deltaTime > 0) {
      }

      setIsNavbarScrolled(window.scrollY > 50);
      lastScrollY.current = currentScrollY;
      lastScrollTime.current = currentScrollTime;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

   const updateQuantity = (itemId, change) => {
       setCart(prevCart => {
           const itemIndex = prevCart.findIndex(item => item.id === itemId);
           if (itemIndex === -1) return prevCart;

           const newCart = [...prevCart];
           newCart[itemIndex] = { ...newCart[itemIndex], quantity: newCart[itemIndex].quantity + change };

           if (newCart[itemIndex].quantity <= 0) {
               return newCart.filter(item => item.id !== itemId);
           } else {
               return newCart;
           }
       });
   };

   const removeItem = (itemId) => {
       setCart(prevCart => prevCart.filter(item => item.id !== itemId));
   };

   const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

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
    </div>
  );
}

export default App;
