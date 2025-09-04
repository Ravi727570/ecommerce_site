import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./head/Navbar";
import About from "./pages/About";
import Store from "./pages/Store";
import Home from "./pages/Home";
import Cart from "./head/Cart";
import AuthPage from "./pages/AuthPage"; // AuthPage import
import { CartProvider } from "./head/CartContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
  <AuthProvider>
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/auth/*" element={<AuthPage />}/>
          <Route
            path="/*"
            element={
              <>
                <Navbar setCartOpen={setCartOpen} />
                <Cart show={cartOpen} handleClose={() => setCartOpen(false)} />
                <Routes>
                  <Route path="/" element={<Navigate to="/store" replace />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/store" element={<Store />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  </AuthProvider>
  );
}

export default App;
