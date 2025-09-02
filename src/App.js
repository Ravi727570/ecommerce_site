import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./head/Navbar";
import About from "./pages/About";
import Store from "./pages/Store";
import Home from "./pages/Home";
import Cart from "./head/Cart";
import { CartProvider } from "./head/CartContext";
import ContactUs from "./pages/ContactUs";
import ProductPage from "./pages/ProductPage"; // new page

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <Navbar setCartOpen={setCartOpen} />
        <Cart show={cartOpen} handleClose={() => setCartOpen(false)} />
        <Routes>
          {/* Redirect root (/) to /store */}
          <Route path="/" element={<Navigate to="/store" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
