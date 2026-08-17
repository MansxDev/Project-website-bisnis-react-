import React from 'react';
import ThemeToggle from './ThemeToggle.jsx';
import CartDrawer from './CartDrawer.jsx';

const UtilityCluster = ({
  cart,
  totalCartItems,
  totalCartPrice,
  updateQuantity,
  removeItem,
  clearCart,
  theme,
  toggleTheme,
}) => {
  const buttonClass = 'btn btn-circle btn-ghost shadow-lg bg-base-100/80 backdrop-blur-md';

  return (
    <div className="hidden md:flex fixed z-[1000] right-4 top-4 items-center gap-2">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} className={buttonClass} />
      <CartDrawer
        cart={cart}
        totalCartItems={totalCartItems}
        totalCartPrice={totalCartPrice}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        clearCart={clearCart}
        className={buttonClass}
      />
    </div>
  );
};

export default UtilityCluster;