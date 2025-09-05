import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "./CartContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ setCartOpen }) => {
  const { cartCount } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink to="/home" className="nav-link text-white p-4 fw-bold">HOME</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/store" className="nav-link text-white p-4 fw-bold">STORE</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link text-white p-4 fw-bold">ABOUT</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link text-white p-4 fw-bold">CONTACT US</NavLink>
            </li>
            {/* New Login Tab */}
            <li className="nav-item">
              <NavLink to="/login" className="nav-link text-white p-4 fw-bold">
                {isLoggedIn ? "PROFILE" : "LOGIN"}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/auth" className="nav-link text-white p-4 fw-bold">AUTHENTICATION</NavLink>
            </li>
          </ul>
        </div>

        {/* Cart Button */}
        <button
          className="btn btn-outline-info position-relative"
          onClick={() => setCartOpen(true)}
        >
          Cart
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cartCount}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
