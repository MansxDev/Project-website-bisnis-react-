import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CART_KEY = 'mansx_cart';

const loadCart = () => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const useCart = () => {
  const [cart, setCart] = useState(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      // storage tidak tersedia — biarkan di memori
    }
  }, [cart]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      toast.success(`Kuantitas ${product.name} menjadi ${existingItem.quantity + 1}.`);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      toast.success(`${product.name} berhasil ditambahkan ke keranjang!`);
    }
  };

  const updateQuantity = (itemId, change) => {
    const item = cart.find((i) => i.id === itemId);
    if (!item) return;

    const nextQuantity = item.quantity + change;
    if (nextQuantity <= 0) {
      setCart(cart.filter((i) => i.id !== itemId));
      toast.error(`Item "${item.name}" dihapus dari keranjang.`);
      return;
    }
    setCart(cart.map((i) => (i.id === itemId ? { ...i, quantity: nextQuantity } : i)));
    toast(`Kuantitas "${item.name}" menjadi ${nextQuantity}`, { icon: '🛒' });
  };

  const removeItem = (itemId) => {
    const removedItem = cart.find((i) => i.id === itemId);
    setCart(cart.filter((i) => i.id !== itemId));
    if (removedItem) {
      toast.error(`Item "${removedItem.name}" dihapus dari keranjang.`);
    }
  };

  const clearCart = () => {
    setCart([]);
    toast('Keranjang dikosongkan.', { icon: '🗑️' });
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    cart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    totalCartItems,
    totalCartPrice,
  };
};