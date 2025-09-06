import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./head/Navbar";
import About from "./pages/About";
import Store from "./pages/Store";
import Home from "./pages/Home";
import Cart from "./head/Cart";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import ContactUs from "./pages/ContactUs";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import { CartProvider } from "./head/CartContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar setCartOpen={setCartOpen} />
          <Cart show={cartOpen} handleClose={() => setCartOpen(false)} />

          <Routes>
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/store" replace />} />
            

            {/* Public routes */}
            <Route path="/store" element={<Store />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/*" element={<AuthPage />} />

            {/* Protected routes */}
            <Route
              path="/products/:id"
              element={
                <ProtectedRoute>
                  <ProductPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/auth/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/store" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
