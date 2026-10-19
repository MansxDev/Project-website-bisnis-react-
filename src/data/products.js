export const allProductData = [
  {
    id: 'vps-basic',
    name: 'VPS Basic',
    description: '1 vCPU, 1GB RAM, 20GB SSD',
    image: `${process.env.PUBLIC_URL}/produk/vps-basic.svg`,
    price: 50000,
    category: 'vps',
  },
  {
    id: 'vps-medium',
    name: 'VPS Medium',
    description: '2 vCPU, 4GB RAM, 50GB SSD',
    image: `${process.env.PUBLIC_URL}/produk/vps-medium.svg`,
    price: 150000,
    category: 'vps',
  },
  {
    id: 'vps-pro',
    name: 'VPS Pro',
    description: '4 vCPU, 8GB RAM, 100GB SSD',
    image: `${process.env.PUBLIC_URL}/produk/vps-pro.svg`,
    price: 300000,
    category: 'vps',
  },
  {
    id: 'bot-wa-marketing',
    name: 'Bot Marketing WA',
    description: 'Auto-reply & Broadcast Message',
    image: `${process.env.PUBLIC_URL}/produk/bot-wa-marketing.svg`,
    price: 150000,
    category: 'bot-wa',
  },
  {
    id: 'bot-wa-support',
    name: 'Bot Support WA',
    description: 'Customer Service Otomatis',
    image: `${process.env.PUBLIC_URL}/produk/bot-wa-support.svg`,
    price: 200000,
    category: 'bot-wa',
  },
  {
    id: 'website-toko',
    name: 'Website Toko',
    description: 'Full CMS & Payment Gateway',
    image: `${process.env.PUBLIC_URL}/produk/website-toko.svg`,
    price: 2500000,
    category: 'website',
  },
  {
    id: 'website-perusahaan',
    name: 'Website Perusahaan',
    description: 'Profil Perusahaan Profesional',
    image: `${process.env.PUBLIC_URL}/produk/website-perusahaan.svg`,
    price: 5000000,
    category: 'website',
  },
];

export const categories = [
  { id: 'all', label: 'Semua' },
  { id: 'vps', label: 'VPS' },
  { id: 'bot-wa', label: 'Bot WhatsApp' },
  { id: 'website', label: 'Website' },
];

export const categoryLabels = {
  vps: 'VPS',
  'bot-wa': 'Bot WA',
  website: 'Website',
};
