import React, { useState, useMemo } from 'react';
import ProductCard from '../ui/ProductCard.jsx';
import ProductDetailDrawer from '../ui/ProductDetailDrawer.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import { categories } from '../../data/products.js';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const SORT_OPTIONS = [
  { id: 'default', label: 'Default' },
  { id: 'price-asc', label: 'Harga Terendah' },
  { id: 'price-desc', label: 'Harga Tertinggi' },
  { id: 'name-asc', label: 'Nama A-Z' },
];

const ProductSection = ({ products, addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    let result =
      selectedCategory === 'all'
        ? products
        : products.filter((product) => product.category === selectedCategory);

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    switch (sort) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return result;
  }, [products, selectedCategory, search, sort]);

  return (
    <section className="container mx-auto px-4 py-10" id="product-section">
      <SectionHeading
        title="Produk Kami"
        subtitle="Pilih kebutuhan digitalmu, mulai dari VPS, bot WhatsApp, hingga pembuatan website."
      />

      <div className="flex flex-col md:flex-row gap-3 items-center justify-between mb-6">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={`btn btn-sm rounded-full ${
                selectedCategory === category.id ? 'btn-primary' : 'btn-outline'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-56">
            <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
            <input
              type="search"
              className="input input-sm input-bordered pl-9 w-full"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Cari produk"
            />
          </div>
          <select
            className="select select-sm select-bordered"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Urutkan produk"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 text-base-content/60">
          <p className="text-lg font-semibold">Produk tidak ditemukan</p>
          <p className="text-sm">Coba ubah kata kunci atau kategori.</p>
        </div>
      ) : (
        <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-4 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              onOpenDetail={setSelectedProduct}
            />
          ))}
        </div>
      )}

      <ProductDetailDrawer
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        addToCart={addToCart}
      />
    </section>
  );
};

export default ProductSection;