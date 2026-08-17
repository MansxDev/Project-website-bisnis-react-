import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaXmark,
  FaTrashCan,
  FaCartShopping,
  FaPlus,
  FaMinus,
  FaWhatsapp,
  FaTicket,
  FaChevronLeft,
  FaCheck,
} from 'react-icons/fa6';
import { formatCurrency } from '../../utils/format.js';
import { scrollToSection } from '../../utils/scroll.js';
import { useStore, KEYS } from '../../data/store.js';
import { useFocusTrap } from '../../hooks/useFocusTrap.js';
import toast from 'react-hot-toast';

const PAYMENT_METHODS = ['Transfer Bank', 'E-Wallet (DANA/OVO/GoPay)', 'QRIS', 'COD'];

const CartDrawer = ({
  cart,
  totalCartItems,
  totalCartPrice,
  updateQuantity,
  removeItem,
  clearCart,
  className = '',
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState('cart');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', address: '', payment: PAYMENT_METHODS[0] });
  const drawerRef = useRef(null);

  const settings = useStore(KEYS.settings);
  const promos = useStore(KEYS.promos);

  useFocusTrap(drawerRef, isOpen);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (step === 'checkout') setStep('cart');
        else setIsOpen(false);
      }
    };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, step]);

  const closeAll = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep('cart');
      setPromoCode('');
      setAppliedPromo(null);
      setForm({ name: '', phone: '', address: '', payment: PAYMENT_METHODS[0] });
    }, 200);
  };

  const closeAndShop = () => {
    setIsOpen(false);
    setTimeout(() => scrollToSection('#product-section'), 150);
  };

  const discount = appliedPromo
    ? appliedPromo.type === 'percent'
      ? (totalCartPrice * appliedPromo.value) / 100
      : Math.min(appliedPromo.value, totalCartPrice)
    : 0;
  const finalTotal = Math.max(totalCartPrice - discount, 0);

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (!code) return;
    const promo = promos.find((p) => p.code.toUpperCase() === code);
    if (!promo || !promo.active) {
      toast.error('Kode promo tidak valid.');
      setAppliedPromo(null);
      return;
    }
    if (totalCartPrice < (promo.minOrder || 0)) {
      toast.error(`Minimal belanja ${formatCurrency(promo.minOrder)} untuk kode ini.`);
      return;
    }
    setAppliedPromo(promo);
    toast.success(`Kode ${promo.code} berhasil diterapkan!`);
  };

  const handleCheckout = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      toast.error('Lengkapi nama, no. WhatsApp, dan alamat Anda.');
      return;
    }
    const lines = [
      `Halo ${settings.businessName || 'MansX.Dev'}, saya ingin memesan:`,
      '',
      ...cart.map(
        (item, i) => `${i + 1}. ${item.name} x${item.quantity} - ${formatCurrency(item.price * item.quantity)}`
      ),
      '',
      `Subtotal: ${formatCurrency(totalCartPrice)}`,
      appliedPromo ? `Kupon (${appliedPromo.code}): -${formatCurrency(discount)}` : null,
      `Total: ${formatCurrency(finalTotal)}`,
      '',
      `Nama: ${form.name}`,
      `No. WhatsApp: ${form.phone}`,
      `Alamat: ${form.address}`,
      `Metode Pembayaran: ${form.payment}`,
    ].filter(Boolean);

    const message = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${settings.phone}?text=${message}`, '_blank', 'noopener,noreferrer');
    clearCart();
    toast.success('Pesanan berhasil dikirim ke WhatsApp!');
    closeAll();
  };

  return (
    <>
      <button
        className={className}
        style={style}
        onClick={() => setIsOpen(true)}
        aria-label="Buka keranjang"
      >
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          {totalCartItems > 0 && (
            <span className="badge badge-sm indicator-item bg-error text-error-content border-none">
              {totalCartItems}
            </span>
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[1900] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => (step === 'checkout' ? setStep('cart') : setIsOpen(false))}
            />
            <motion.aside
              ref={drawerRef}
              className="fixed inset-y-0 right-0 z-[2000] w-full max-w-md bg-base-100 shadow-2xl flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              role="dialog"
              aria-label="Keranjang belanja"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-base-200">
                <h3 className="text-lg font-bold font-display flex items-center gap-2">
                  {step === 'checkout' && (
                    <button
                      className="btn btn-ghost btn-sm btn-circle"
                      onClick={() => setStep('cart')}
                      aria-label="Kembali ke keranjang"
                    >
                      <FaChevronLeft className="w-4 h-4" />
                    </button>
                  )}
                  {step === 'checkout' ? 'Checkout' : 'Keranjang'}
                  <span className="badge badge-primary badge-sm">{totalCartItems}</span>
                </h3>
                <button
                  className="btn btn-ghost btn-sm btn-circle"
                  onClick={closeAll}
                  aria-label="Tutup keranjang"
                >
                  <FaXmark className="w-5 h-5" />
                </button>
              </div>

              {step === 'cart' ? (
                <>
                  {/* Items */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {cart.length === 0 ? (
                      <div className="flex flex-col items-center justify-center text-center h-full py-16">
                        <div className="w-20 h-20 rounded-full bg-base-200 flex items-center justify-center mb-4">
                          <FaCartShopping className="w-9 h-9 text-base-content/40" />
                        </div>
                        <h4 className="font-bold font-display mb-1">Keranjang kosong</h4>
                        <p className="text-sm text-base-content/60 mb-5">
                          Yuk mulai belanja kebutuhan digitalmu!
                        </p>
                        <button className="btn btn-primary btn-sm" onClick={closeAndShop}>
                          Mulai Belanja
                        </button>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div key={item.id} className="flex gap-3 p-3 bg-base-200/60 rounded-2xl">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-cover shrink-0"
                            loading="lazy"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-semibold text-sm truncate">{item.name}</p>
                              <button
                                className="text-base-content/50 hover:text-error transition-colors"
                                onClick={() => removeItem(item.id)}
                                aria-label={`Hapus ${item.name}`}
                              >
                                <FaTrashCan className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-xs text-base-content/60 mt-0.5">
                              {formatCurrency(item.price)}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center border border-base-300 rounded-full overflow-hidden bg-base-100">
                                <button
                                  className="w-7 h-7 inline-flex items-center justify-center text-base-content/70 hover:text-primary transition-colors"
                                  onClick={() => updateQuantity(item.id, -1)}
                                  aria-label={`Kurangi ${item.name}`}
                                >
                                  <FaMinus className="w-3 h-3" />
                                </button>
                                <span className="w-8 text-center text-sm font-semibold">
                                  {item.quantity}
                                </span>
                                <button
                                  className="w-7 h-7 inline-flex items-center justify-center text-base-content/70 hover:text-primary transition-colors"
                                  onClick={() => updateQuantity(item.id, 1)}
                                  aria-label={`Tambah ${item.name}`}
                                >
                                  <FaPlus className="w-3 h-3" />
                                </button>
                              </div>
                              <span className="font-bold text-primary text-sm">
                                {formatCurrency(item.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Footer */}
                  {cart.length > 0 && (
                    <div className="border-t border-base-200 p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <FaTicket className="w-4 h-4 text-primary shrink-0" />
                        <input
                          type="text"
                          className="input input-sm input-bordered flex-1"
                          placeholder="Kode promo (mis. MANSX10)"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <button className="btn btn-primary btn-sm" onClick={applyPromo}>
                          Pakai
                        </button>
                      </div>

                      {appliedPromo && (
                        <div className="flex items-center justify-between text-sm bg-success/10 text-success px-3 py-2 rounded-lg">
                          <span className="font-semibold">
                            <FaCheck className="inline w-3 h-3 mr-1" />
                            {appliedPromo.code} · -{formatCurrency(discount)}
                          </span>
                          <button
                            className="text-error hover:underline text-xs"
                            onClick={() => {
                              setAppliedPromo(null);
                              setPromoCode('');
                            }}
                          >
                            Hapus
                          </button>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-base-content/70">Subtotal</span>
                        <span className="font-bold font-display">{formatCurrency(totalCartPrice)}</span>
                      </div>
                      {appliedPromo && (
                        <div className="flex items-center justify-between text-success text-sm">
                          <span>Diskon</span>
                          <span>-{formatCurrency(discount)}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between border-t border-base-200 pt-3">
                        <span className="text-base-content/70">Total</span>
                        <span className="text-xl font-bold font-display text-primary">
                          {formatCurrency(finalTotal)}
                        </span>
                      </div>
                      <button
                        className="btn btn-primary w-full"
                        onClick={() => setStep('checkout')}
                      >
                        Lanjut Checkout
                      </button>
                      <button
                        className="btn btn-ghost btn-sm w-full text-base-content/60"
                        onClick={clearCart}
                      >
                        <FaTrashCan className="w-3.5 h-3.5" />
                        Kosongkan Keranjang
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Checkout form */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    <div className="space-y-3">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold">Nama Lengkap</span>
                        </label>
                        <input
                          type="text"
                          className="input input-bordered"
                          placeholder="Nama Anda"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold">No. WhatsApp</span>
                        </label>
                        <input
                          type="tel"
                          className="input input-bordered"
                          placeholder="08xxxxxxxxxx"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold">Alamat</span>
                        </label>
                        <textarea
                          className="textarea textarea-bordered"
                          rows={3}
                          placeholder="Alamat lengkap pengiriman"
                          value={form.address}
                          onChange={(e) => setForm({ ...form, address: e.target.value })}
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-semibold">Metode Pembayaran</span>
                        </label>
                        <select
                          className="select select-bordered"
                          value={form.payment}
                          onChange={(e) => setForm({ ...form, payment: e.target.value })}
                        >
                          {PAYMENT_METHODS.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="bg-base-200/60 rounded-2xl p-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-base-content/70">Subtotal</span>
                        <span>{formatCurrency(totalCartPrice)}</span>
                      </div>
                      {appliedPromo && (
                        <div className="flex justify-between text-success">
                          <span>Diskon ({appliedPromo.code})</span>
                          <span>-{formatCurrency(discount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-base pt-2 border-t border-base-300">
                        <span>Total</span>
                        <span className="text-primary">{formatCurrency(finalTotal)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-base-200 p-4">
                    <button className="btn btn-success w-full" onClick={handleCheckout}>
                      <FaWhatsapp className="w-4 h-4" />
                      Kirim Pesanan via WhatsApp
                    </button>
                  </div>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartDrawer;