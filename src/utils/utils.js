import { useRef, useState, useEffect } from 'react';

// Fungsi Pendukung
export function formatCurrency(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

// Hook Kustom
export const useScrollAnimation = (threshold = 0.2) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    const currentElement = elementRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  return [elementRef, isVisible];
};

// Fungsi Pendukung
export const scrollToSection = (id) => {
  const element = document.querySelector(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Data Produk dan Layanan (Diperbarui dengan properti 'image')
export const allProductData = [
    { id: 'vps-basic', name: 'VPS Basic', description: '1 vCPU, 1GB RAM, 20GB SSD', image: 'https://files.catbox.moe/31synt.jpg', price: 50000, category: 'vps' },
    { id: 'vps-medium', name: 'VPS Medium', description: '2 vCPU, 4GB RAM, 50GB SSD', image: 'https://files.catbox.moe/31synt.jpg', price: 150000, category: 'vps' },
    { id: 'vps-pro', name: 'VPS Pro', description: '4 vCPU, 8GB RAM, 100GB SSD', image: 'https://files.catbox.moe/31synt.jpg', price: 300000, category: 'vps' },
    { id: 'bot-wa-marketing', name: 'Bot Marketing WA', description: 'Auto-reply & Broadcast Message', image: 'https://files.catbox.moe/31synt.jpg', price: 150000, category: 'bot-wa' },
    { id: 'bot-wa-support', name: 'Bot Support WA', description: 'Customer Service Otomatis', image: 'https://files.catbox.moe/31synt.jpg', price: 200000, category: 'bot-wa' },
    { id: 'website-toko', name: 'Website Toko', description: 'Full CMS & Payment Gateway', image: 'https://files.catbox.moe/31synt.jpg', price: 2500000, category: 'website' },
    { id: 'website-perusahaan', name: 'Website Perusahaan', description: 'Profil Perusahaan Profesional', image: 'https://files.catbox.moe/31synt.jpg', price: 5000000, category: 'website' },
];

export const serviceData = [
    { id: 'web-dev-custom', name: 'Pengembangan Web Kustom', description: 'Buat website impian Anda dari nol', image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg', price: 5000000, features: ['Analisis Kebutuhan', 'Desain & Development', 'Testing & Deployment'] },
    { id: 'seo', name: 'Optimisasi Mesin Pencari (SEO)', description: 'Tingkatkan visibilitas website Anda', image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg', price: 1000000, interval: '/bulan', features: ['Riset Keyword', 'Optimisasi On-Page', 'Strategi Off-Page'] },
    { id: 'sosial-media', name: 'Manajemen Media Sosial', description: 'Kelola dan kembangkan media sosial Anda', image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg', price: 2000000, interval: '/bulan', features: ['Pembuatan Konten', 'Penjadwalan Posting', 'Analisis Performa'] },
    { id: 'graphic-design', name: 'Jasa Desain Grafis', description: 'Buat visual branding yang menarik', image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg', price: 500000, interval: '/item', features: ['Desain Logo', 'Banner & Poster', 'Material Promosi'] },
    { id: 'hosting', name: 'Layanan Hosting', description: 'Hosting cepat dan andal', image: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg', price: 100000, interval: '/bulan', features: ['SSL Gratis', 'Backup Harian', 'Support 24/7'] },
];
