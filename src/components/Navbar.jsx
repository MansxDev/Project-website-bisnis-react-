import React from 'react';
import {
  formatCurrency
  } from '../utils/utils.js';

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
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100  rounded-box w-72 text-white">
                <h4 className="font-bold px-4 py-2 border-b border-gray-200 ">Keranjang Belanja</h4>
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
        {/* Tambahkan href untuk aksesibilitas */}
        <a className="btn btn-ghost normal-case text-lg sm:text-xl md:text-2xl"
           href="#top" // <--- Tambahkan href di sini
           onClick={() => scrollToSection('#top')}>WebMansX</a>
      </div>
      <div className="flex-none">
        <CartDropdown cart={cart} totalCartItems={totalCartItems} updateQuantity={updateQuantity} removeItem={removeItem} />

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100  rounded-box w-52 text-white">
            {/* Tambahkan href untuk setiap item menu */}
            <li><a href="#product-section" onClick={() => scrollToSection('#product-section')} className="nav-link">Produk</a></li>
            <li><a href="#service-section" onClick={() => scrollToSection('#service-section')} className="nav-link">Layanan</a></li>
            <li><a href="#contact" onClick={() => scrollToSection('#contact')} className="nav-link">Kontak</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
