export const allProductData = [
  {
    id: 'vps-basic',
    name: 'VPS Basic',
    description: '1 vCPU, 1GB RAM, 20GB SSD',
    image: 'https://files.catbox.moe/31synt.jpg',
    price: 50000,
    category: 'vps',
  },
  {
    id: 'vps-medium',
    name: 'VPS Medium',
    description: '2 vCPU, 4GB RAM, 50GB SSD',
    image: 'https://files.catbox.moe/31synt.jpg',
    price: 150000,
    category: 'vps',
  },
  {
    id: 'vps-pro',
    name: 'VPS Pro',
    description: '4 vCPU, 8GB RAM, 100GB SSD',
    image: 'https://files.catbox.moe/31synt.jpg',
    price: 300000,
    category: 'vps',
  },
  {
    id: 'bot-wa-marketing',
    name: 'Bot Marketing WA',
    description: 'Auto-reply & Broadcast Message',
    image: 'https://files.catbox.moe/31synt.jpg',
    price: 150000,
    category: 'bot-wa',
  },
  {
    id: 'bot-wa-support',
    name: 'Bot Support WA',
    description: 'Customer Service Otomatis',
    image: 'https://files.catbox.moe/31synt.jpg',
    price: 200000,
    category: 'bot-wa',
  },
  {
    id: 'website-toko',
    name: 'Website Toko',
    description: 'Full CMS & Payment Gateway',
    image: 'https://files.catbox.moe/31synt.jpg',
    price: 2500000,
    category: 'website',
  },
  {
    id: 'website-perusahaan',
    name: 'Website Perusahaan',
    description: 'Profil Perusahaan Profesional',
    image: 'https://files.catbox.moe/31synt.jpg',
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
