import React, { createContext, useState } from "react";

// Create context
export const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [cartElements, setCartElements] = useState([]);

  // Add to cart function
  const addToCart = (product) => {
    setCartElements((prevCart) => {
      const existingItem = prevCart.find((item) => item.title === product.title);
      if (existingItem) {
        return prevCart.map((item) =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove from cart function
  const removeFromCart = (title) => {
    setCartElements((prevCart) => prevCart.filter((item) => item.title !== title));
  };

  // Update quantity function
  const updateQuantity = (title, newQuantity) => {
    setCartElements((prev) =>
      prev.map((item) =>
        item.title === title ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear cart function
  const clearCart = () => {
    setCartElements([]); // Reset cart
  };

  // Count total items
  const cartCount = cartElements.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartElements, addToCart, removeFromCart, updateQuantity, cartCount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
