// src/head/CartContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // get user email

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartElements, setCartElements] = useState([]);
  const { email } = useContext(AuthContext);

  // ⚠️ Replace with fresh CrudCrud API key every 24 hours
  const API_BASE = "https://crudcrud.com/892526a85b114eb59379a98cd66015a4"; 

  // Convert email to URL-safe string (remove @ and .)
  const getUserCartId = (email) => email?.replace(/[.@]/g, "");

  // ✅ Fetch cart from CrudCrud when user logs in or refreshes page
  useEffect(() => {
    if (!email) return;

    const fetchCart = async () => {
      try {
        const res = await fetch(`${API_BASE}/cart${getUserCartId(email)}`);
        if (!res.ok) throw new Error("Failed to fetch cart");
        const data = await res.json();

        // Ensure every item has a quantity
        setCartElements(data.map(item => ({ ...item, quantity: item.quantity || 1 })));
      } catch (err) {
        console.error("Failed to fetch cart", err);
      }
    };

    fetchCart();
  }, [email]);

  // ✅ Add to cart
  const addToCart = async (product) => {
    const existingItem = cartElements.find((item) => item.title === product.title);

    if (existingItem) {
      // Item exists → increase quantity
      updateQuantity(product.title, existingItem.quantity + 1);
    } else {
      // New item → save to backend
      const newItem = { ...product, quantity: 1 };
      if (email) {
        try {
          const res = await fetch(`${API_BASE}/cart${getUserCartId(email)}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newItem),
          });
          const savedItem = await res.json(); // contains _id from CrudCrud
          setCartElements((prev) => [...prev, savedItem]);
        } catch (err) {
          console.error("Failed to save new cart item", err);
        }
      } else {
        setCartElements((prev) => [...prev, newItem]);
      }
    }
  };

  // ✅ Remove from cart
  const removeFromCart = async (title) => {
    const item = cartElements.find((i) => i.title === title);

    // Remove locally
    setCartElements((prevCart) => prevCart.filter((i) => i.title !== title));

    // Remove from CrudCrud
    if (email && item?._id) {
      try {
        await fetch(`${API_BASE}/cart${getUserCartId(email)}/${item._id}`, {
          method: "DELETE",
        });
      } catch (err) {
        console.error("Failed to delete cart item from backend", err);
      }
    }
  };

  // ✅ Update quantity
  const updateQuantity = async (title, newQuantity) => {
    const item = cartElements.find((i) => i.title === title);
    if (!item) return;

    // Update locally
    setCartElements((prev) =>
      prev.map((i) => (i.title === title ? { ...i, quantity: newQuantity } : i))
    );

    // Update CrudCrud
    if (email && item._id) {
      try {
        await fetch(`${API_BASE}/cart${getUserCartId(email)}/${item._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...item, quantity: newQuantity }),
        });
      } catch (err) {
        console.error("Failed to update quantity in backend", err);
      }
    }
  };

  // ✅ Clear cart (purchase)
  const clearCart = async () => {
    setCartElements([]); // reset local cart

    if (email) {
      try {
        const res = await fetch(`${API_BASE}/cart${getUserCartId(email)}`);
        const data = await res.json();

        // Delete all items in backend
        await Promise.all(
          data.map((item) =>
            fetch(`${API_BASE}/cart${getUserCartId(email)}/${item._id}`, {
              method: "DELETE",
            })
          )
        );
      } catch (err) {
        console.error("Failed to clear cart in backend", err);
      }
    }
  };

  // ✅ Cart item count
  const cartCount = cartElements.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartElements,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
