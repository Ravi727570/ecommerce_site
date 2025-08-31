import React, { useContext, useState } from "react";
import "../head/Head.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "../head/CartContext";

const Store = () => {
  const { addToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Simulated fetch API (async/await)
  const fetchProducts = async () => {
    try {
      setIsLoading(true);

      // simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // your same products
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

      setProducts(productsArr);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <header className="bg-secondary text-center py-5">
        <h1 className="display-3 fw-bold text-white">The Generics</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow-1">
        <section className="container my-5 text-center">
          <h2 className="fw-bold">MUSIC</h2>

          <button
            className="btn btn-primary fw-bold mt-3"
            onClick={fetchProducts}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load Products"}
          </button>

          <div className="row mt-4">
            {isLoading && (
              <p className="text-muted mt-3">Fetching products...</p>
            )}

            {!isLoading &&
              products.map((product, index) => (
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
                      <button
                        className="btn btn-info text-white fw-bold"
                        onClick={() => addToCart(product)}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </main>

      {/* Sticky Footer */}
      <footer className="bg-info py-3 mt-auto">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="display-3 fw-bold text-white m-0">The Generics</h1>
          <div className="d-flex gap-4">
            <i className="fa-brands fa-youtube fa-lg m-3 text-white"></i>
            <i className="fa-brands fa-facebook fa-lg m-3 text-white"></i>
            <i className="fa-brands fa-linkedin fa-lg m-3 text-white"></i>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Store;
