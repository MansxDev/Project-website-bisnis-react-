import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js';
import { formatCurrency } from '../../utils/format.js';
import { categoryLabels } from '../../data/products.js';
import { FaCheck } from 'react-icons/fa6';

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
      className={`card w-80 shrink-0 scroll-animation bg-base-100 shadow-sm border border-base-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
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
        <div className="flex flex-wrap justify-between items-start gap-2">
          <h2
            className="text-xl font-bold font-display leading-tight cursor-pointer hover:text-primary transition-colors"
            onClick={() => onOpenDetail?.(product)}
          >
            {product.name}
          </h2>
          <span className="text-lg font-bold text-primary whitespace-nowrap">
            {formatCurrency(product.price)}
            {isMonthly && <span className="text-xs font-medium text-base-content/50">/bulan</span>}
          </span>
        </div>
        <p className="text-xs text-base-content/70 line-clamp-2">{product.description}</p>

        {product.features?.length > 0 && (
          <ul className="mt-2 flex flex-col gap-2 text-xs">
            {product.features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-start gap-2">
                <FaCheck className="size-4 mt-0.5 text-success shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4">
          <button className="btn btn-primary btn-block" onClick={() => addToCart(product)}>
            {isServiceProduct ? 'Pesan' : 'Beli'} Sekarang
          </button>
          <button
            className="btn btn-ghost btn-block mt-2"
            onClick={() => onOpenDetail?.(product)}
          >
            Lihat Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;