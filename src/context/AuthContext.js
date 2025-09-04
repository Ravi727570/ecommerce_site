// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize token from localStorage and check auto-logout
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    const loginTime = localStorage.getItem("loginTime");

    const FIVE_MINUTES = 5 * 60 * 1000;

    if (storedToken && loginTime) {
      const now = Date.now();
      if (now - parseInt(loginTime) < FIVE_MINUTES) {
        return storedToken; // Token still valid
      }
    }

    // Token expired
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    localStorage.removeItem("refreshToken");
    return null;
  });

  const login = (idToken) => {
    setToken(idToken);
    localStorage.setItem("token", idToken);
    localStorage.setItem("loginTime", Date.now()); // store login timestamp
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    localStorage.removeItem("refreshToken");
  };

  const isLoggedIn = !!token;

  // Auto-logout timer (optional, logs out even without page refresh)
  useEffect(() => {
    if (!token) return;

    const FIVE_MINUTES = 5 * 60 * 1000;
    const loginTime = parseInt(localStorage.getItem("loginTime")) || Date.now();
    const timeLeft = FIVE_MINUTES - (Date.now() - loginTime);

    const timer = setTimeout(() => {
      logout();
      alert("Session expired! Please log in again.");
    }, timeLeft);

    return () => clearTimeout(timer);
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
