import React, { useState } from 'react';
import ProductCard from './ProduckCard.jsx'


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
            <li>
              <button
                type="button" 
                onClick={() => setSelectedCategory('all')}
                className={`category-filter ${selectedCategory === 'all' ? 'active' : ''} w-full text-left p-2 block hover:bg-gray-200 dark:hover:bg-gray-600 rounded`}
              >
                Semua
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setSelectedCategory('vps')}
                className={`category-filter ${selectedCategory === 'vps' ? 'active' : ''} w-full text-left p-2 block hover:bg-gray-200 dark:hover:bg-gray-600 rounded`}
              >
                VPS
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setSelectedCategory('bot-wa')}
                className={`category-filter ${selectedCategory === 'bot-wa' ? 'active' : ''} w-full text-left p-2 block hover:bg-gray-200 dark:hover:bg-gray-600 rounded`}
              >
                Bot WhatsApp
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setSelectedCategory('website')}
                className={`category-filter ${selectedCategory === 'website' ? 'active' : ''} w-full text-left p-2 block hover:bg-gray-200 dark:hover:bg-gray-600 rounded`}
              >
                Website
              </button>
            </li>
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

export default ProductSection;
