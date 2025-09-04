import React from "react";
import { NavLink } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AuthPage = () => {
  const { logout, isLoggedIn } = useContext(AuthContext);
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* 🔹 Custom Header */}
      <header className="bg-dark py-3 shadow">
        <div className="container d-flex justify-content-between align-items-center text-white">
          <h1 className="fw-bold m-0">Auth Page</h1>
          <div className="d-flex gap-4">
            <NavLink to="/auth/profile" className="text-white fw-bold p-3 text-decoration-none">
              Profile
            </NavLink>
            <NavLink to="/auth/login" className="text-white fw-bold p-3 text-decoration-none">
              Login
            </NavLink>
            <NavLink to="/auth/logout" className="text-white fw-bold p-3 text-decoration-none">
              Logout
            </NavLink>
          </div>
        </div>
      </header>

      {/* Nested Routes Render */}
      <main className="flex-grow-1 container my-5 text-center">
        <AuthForm />
      </main>
    </div>
  );
};

export default AuthPage;


