import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  /* =========================
     ADD TO CART
  ========================= */

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      /* EXISTS */

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
        );
      }

      /* NEW */

      return [
        ...prev,

        {
          ...product,
          qty: 1,
        },
      ];
    });
  };

  /* =========================
     REMOVE
  ========================= */

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  /* =========================
     UPDATE QTY
  ========================= */

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,

            qty: Math.max(1, item.qty + delta),
          };
        }

        return item;
      })
    );
  };

  /* =========================
     CLEAR
  ========================= */

  const clearCart = () => {
    setCartItems([]);
  };

  /* =========================
     PROVIDER
  ========================= */

  return (
    <CartContext.Provider
      value={{
        cartItems,

        addToCart,

        removeFromCart,

        updateQty,

        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* =========================
   HOOK
========================= */

export function useCart() {
  return useContext(CartContext);
}
