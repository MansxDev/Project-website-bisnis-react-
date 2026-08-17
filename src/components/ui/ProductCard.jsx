import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';
import { formatCurrency } from '../../utils/format.js';
import { categoryLabels } from '../../data/products.js';

const BADGE_COLORS = {
  vps: 'badge-primary',
  'bot-wa': 'badge-secondary',
  website: 'badge-accent',
};

const ProductCard = ({ product, addToCart, onOpenDetail }) => {
  const [elementRef, isVisible] = useScrollAnimation(0.15);

  const badgeColor = BADGE_COLORS[product.category] || 'badge-neutral';
  const badgeLabel = categoryLabels[product.category] || product.category;
  const isMonthly = product.category === 'vps' || product.category === 'bot-wa';
  const isServiceProduct = product.category === 'website';

  return (
    <div
      ref={elementRef}
      className={`card w-80 shrink-0 scroll-animation bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${
        isVisible ? 'show' : ''
      }`}
    >
      <div className="relative cursor-pointer" onClick={() => onOpenDetail?.(product)}>
        <div className={`badge absolute right-3 top-3 z-10 ${badgeColor}`}>{badgeLabel}</div>
        <figure className="px-4 pt-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-44 object-cover rounded-xl"
            loading="lazy"
          />
        </figure>
      </div>
      <div className="card-body">
        <h3
          className="card-title cursor-pointer hover:text-primary transition-colors"
          onClick={() => onOpenDetail?.(product)}
        >
          {product.name}
        </h3>
        <p className="text-sm text-base-content/70 line-clamp-2">{product.description}</p>

        {product.features?.length > 0 && (
          <ul className="text-xs text-base-content/60 space-y-1">
            {product.features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-3">
          <span className="text-2xl font-bold text-primary">
            {formatCurrency(product.price)}
          </span>
          {isMonthly && <span className="text-sm text-base-content/60">/bulan</span>}
        </div>

        <div className="card-actions justify-end mt-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => addToCart(product)}
          >
            {isServiceProduct ? 'Pesan' : 'Beli'} Sekarang
          </button>
          <button
            className="btn btn-ghost btn-circle btn-sm tooltip"
            data-tip="Detail"
            onClick={() => onOpenDetail?.(product)}
            aria-label={`Lihat detail ${product.name}`}
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

export default ProductCard;