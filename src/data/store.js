import { useSyncExternalStore } from 'react';
import { allProductData } from './products.js';
import { serviceData } from './services.js';
import { testimonialData } from './testimonials.js';
import { faqData } from './faqs.js';
import { promoData } from './promos.js';

export const KEYS = {
  products: 'mansx_products',
  services: 'mansx_services',
  testimonials: 'mansx_testimonials',
  faqs: 'mansx_faqs',
  promos: 'mansx_promos',
  messages: 'mansx_messages',
  settings: 'mansx_settings',
  audit: 'mansx_audit',
};

export const DEFAULTS = {
  products: allProductData,
  services: serviceData,
  testimonials: testimonialData,
  faqs: faqData,
  promos: promoData,
  messages: [],
  audit: [],
  settings: {
    businessName: 'MansX.Dev',
    tagline: 'Memberikan solusi digital terbaik sejak 2025.',
    phone: '6281546543913',
    email: 'mansx.develover@gmail.com',
    instagram: 'https://instagram.com/shophosting',
    facebook: 'https://facebook.com/shophosting',
    github: 'https://github.com',
  },
};

const listeners = new Set();
const cache = new Map();

const clone = (value) => JSON.parse(JSON.stringify(value));

function readAll() {
  Object.entries(KEYS).forEach(([short, key]) => {
    try {
      const raw = localStorage.getItem(key);
      cache.set(key, raw ? JSON.parse(raw) : clone(DEFAULTS[short]));
    } catch {
      cache.set(key, clone(DEFAULTS[short]));
    }
  });
}

readAll();

export const store = {
  get(key) {
    return cache.get(key);
  },
  set(key, value) {
    cache.set(key, value);
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage penuh / tidak tersedia — biarkan tetap di memori
    }
    listeners.forEach((fn) => fn());
  },
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  resetAll() {
    Object.entries(KEYS).forEach(([short, key]) => store.set(key, clone(DEFAULTS[short])));
  },
  exportAll() {
    return Object.entries(KEYS).reduce((acc, [short, key]) => {
      acc[short] = cache.get(key);
      return acc;
    }, {});
  },
  importAll(payload) {
    Object.entries(KEYS).forEach(([short, key]) => {
      if (payload && payload[short] !== undefined) {
        let value = payload[short];
        if (short === 'settings') {
          const { adminPassword, ...clean } = value;
          value = clean;
        }
        store.set(key, value);
      }
    });
  },
};

export function useStore(key) {
  return useSyncExternalStore(
    store.subscribe,
    () => store.get(key),
    () => store.get(key)
  );
}

export function useCollection(key) {
  const data = useStore(key);
  return {
    data,
    add(item) {
      store.set(key, [...data, item]);
    },
    update(id, patch) {
      store.set(
        key,
        data.map((item) => (item.id === id ? { ...item, ...patch } : item))
      );
    },
    remove(id) {
      store.set(
        key,
        data.filter((item) => item.id !== id)
      );
    },
    replace(items) {
      store.set(key, items);
    },
    reset() {
      store.set(key, clone(DEFAULTS[key]));
    },
  };
}