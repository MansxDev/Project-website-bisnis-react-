import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaXmark, FaPlus, FaMinus, FaWhatsapp, FaCartPlus, FaCheck } from 'react-icons/fa6';
import { formatCurrency } from '../../utils/format.js';
import { categoryLabels } from '../../data/products.js';
import { useStore, KEYS } from '../../data/store.js';
import { useFocusTrap } from '../../hooks/useFocusTrap.js';

const ProductDetailDrawer = ({ product, isOpen, onClose, addToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const drawerRef = useRef(null);
  const settings = useStore(KEYS.settings);

  useFocusTrap(drawerRef, isOpen);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!product) return null;

  const badgeLabel = categoryLabels[product.category] || product.category;
  const isMonthly = product.category === 'vps' || product.category === 'bot-wa';

  const orderViaWhatsApp = () => {
    const lines = [
      `Halo ${settings.businessName || 'MansX.Dev'}, saya ingin memesan:`,
      '',
      `1. ${product.name} x${quantity} - ${formatCurrency(product.price * quantity)}`,
      '',
      `Total: ${formatCurrency(product.price * quantity)}`,
    ];
    const message = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${settings.phone}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[2100] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            ref={drawerRef}
            className="fixed inset-y-0 right-0 z-[2200] w-full max-w-md bg-base-100 shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            role="dialog"
            aria-label={product.name}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-base-200">
              <h3 className="text-lg font-bold font-display truncate">{product.name}</h3>
              <button
                className="btn btn-ghost btn-sm btn-circle shrink-0"
                onClick={onClose}
                aria-label="Tutup"
              >
                <FaXmark className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <span className="badge badge-primary absolute top-3 left-3">{badgeLabel}</span>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <span className="text-3xl font-bold font-display text-primary">
                    {formatCurrency(product.price)}
                  </span>
                  {isMonthly && <span className="text-base-content/60">/bulan</span>}
                </div>

                <p className="text-base-content/70 leading-relaxed">{product.description}</p>

                {product.features?.length > 0 && (
                  <div>
                    <h4 className="font-bold font-display mb-2">Spesifikasi</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <span className="w-5 h-5 rounded-full bg-success/15 text-success inline-flex items-center justify-center">
                            <FaCheck className="w-2.5 h-2.5" />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between bg-base-200/60 rounded-2xl p-3">
                  <span className="font-semibold">Jumlah</span>
                  <div className="flex items-center border border-base-300 rounded-full overflow-hidden bg-base-100">
                    <button
                      className="w-8 h-8 inline-flex items-center justify-center hover:text-primary transition-colors"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Kurangi jumlah"
                    >
                      <FaMinus className="w-3 h-3" />
                    </button>
                    <span className="w-10 text-center font-semibold">{quantity}</span>
                    <button
                      className="w-8 h-8 inline-flex items-center justify-center hover:text-primary transition-colors"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Tambah jumlah"
                    >
                      <FaPlus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-base-200 p-4 space-y-2">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-base-content/70">Total</span>
                <span className="font-bold font-display text-primary text-lg">
                  {formatCurrency(product.price * quantity)}
                </span>
              </div>
              <button
                className="btn btn-primary w-full"
                onClick={() => {
                  for (let i = 0; i < quantity; i++) addToCart(product);
                  onClose();
                }}
              >
                <FaCartPlus className="w-4 h-4" />
                Tambah ke Keranjang
              </button>
              <button className="btn btn-success w-full" onClick={orderViaWhatsApp}>
                <FaWhatsapp className="w-4 h-4" />
                Beli Langsung via WhatsApp
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailDrawer;