import React from 'react';

import {
  useScrollAnimation
} from '../utils/utils.js';



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
        <h3 className="card-title text-white">{product.name}</h3>
        <p className="text-sm text-white ">{product.description}</p>

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

export default ProductCard;