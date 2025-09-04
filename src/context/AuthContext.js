// src/context/AuthContext.js
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (idToken) => {
    setToken(idToken);
    localStorage.setItem("token", idToken); // persist
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    alert("logout Done");
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
