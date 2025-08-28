
import React, { useState } from "react";
import "./Head.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Cart from "./Cart";

const productsArr = [
  {
    title: "Colors",
    price: 12.99,
    imageUrl:
      "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
  },
  {
    title: "Black and white Colors",
    price: 9.99,
    imageUrl:
      "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
  },
  {
    title: "Yellow and Black Colors",
    price: 11.99,
    imageUrl:
      "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  },
  {
    title: "Blue Color",
    price: 14.99,
    imageUrl:
      "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
  },
];

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">
            The Generics
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link text-white" href="/">HOME</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/store">STORE</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/about">ABOUT</a>
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
              0
            </span>
          </button>
        </div>
      </nav>

      {/* Product Section */}
      <section className="container my-5 text-center">
        <h2 className="fw-bold">MUSIC</h2>
        <div className="row mt-4">
          {productsArr.map((product, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <h5 className="mb-3">Album {index + 1}</h5>
              <img
                src={product.imageUrl}
                alt={product.title}
                className="d-block mx-auto product-image"
              />
              <div className="card-body">
                <h5 className="card-title m-3">{product.title}</h5>
                <div
                  className="d-flex justify-content-between align-items-center mx-auto mt-2"
                  style={{ width: "250px" }}
                >
                  <p className="fw-bold mb-0">${product.price}</p>
                  <button className="btn btn-info text-white fw-bold">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Modal */}
      <Cart show={cartOpen} handleClose={() => setCartOpen(false)} />
    </div>
  );
};

export default App;
