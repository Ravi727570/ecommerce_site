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
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/auth/*" element={<AuthPage />}/>
          <Route path="/auth/profile" element={<ProfilePage />} />
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
                  <Route path="/login" element={<LoginPage />} />
                    <Route path="/contact" element={<ContactUs/>}/>
                    <Route path="/products/:id" element={<ProductPage />} />
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
