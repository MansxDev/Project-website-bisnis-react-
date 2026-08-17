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
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        const updatedCart = prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        toast.success(
          `Berhasil menambahkan ${product.name} ke keranjang! Kuantitas: ${existingItem.quantity + 1}`
        );
        return updatedCart;
      }
      const newCart = [...prevCart, { ...product, quantity: 1 }];
      toast.success(`Berhasil menambahkan ${product.name} ke keranjang!`);
      return newCart;
    });
  };

  const updateQuantity = (itemId, change) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.id === itemId);
      if (itemIndex === -1) return prevCart;

      const newCart = [...prevCart];
      newCart[itemIndex] = { ...newCart[itemIndex], quantity: newCart[itemIndex].quantity + change };

      if (newCart[itemIndex].quantity <= 0) {
        const removedItem = newCart[itemIndex];
        toast.error(`Item "${removedItem.name}" dihapus dari keranjang.`);
        return newCart.filter((item) => item.id !== itemId);
      }
      toast(`Kuantitas "${newCart[itemIndex].name}" diperbarui menjadi ${newCart[itemIndex].quantity}`, {
        icon: '🛒',
      });
      return newCart;
    });
  };

  const removeItem = (itemId) => {
    setCart((prevCart) => {
      const removedItem = prevCart.find((item) => item.id === itemId);
      if (removedItem) {
        toast.error(`Item "${removedItem.name}" dihapus dari keranjang.`);
      }
      return prevCart.filter((item) => item.id !== itemId);
    });
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