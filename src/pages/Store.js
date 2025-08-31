import React, { useState, useContext, useEffect } from "react";
import "../head/Head.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "../head/CartContext";

const productsArr = [
  {
    title: "Colors",
    price: 12.99,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
  },
  {
    title: "Black and white Colors",
    price: 9.99,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
  },
  {
    title: "Yellow and Black Colors",
    price: 11.99,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  },
  {
    title: "Blue Color",
    price: 14.99,
    imageUrl: "https://prasadyash2411.github.io/ecom-website/img/Album%204.png",
  },
];

const Store = () => {
  const { addToCart } = useContext(CartContext);
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);
  const [cancelRetry, setCancelRetry] = useState(false);

  const fetchFilms = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) throw new Error("API failed");
      const data = await response.json();

      // Map fetched data to products images & price
      const filmsWithImages = data.results.map((film, index) => ({
        ...film,
        imageUrl: productsArr[index % productsArr.length].imageUrl,
        title: productsArr[index % productsArr.length].title,
        price: productsArr[index % productsArr.length].price,
      }));

      setFilms(filmsWithImages);
      setRetrying(false); // stop retrying on success
    } catch (err) {
      setError("Something went wrong ....Retrying");
      setRetrying(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Retry effect
  useEffect(() => {
    let timer;
    if (retrying && !cancelRetry) {
      timer = setTimeout(() => {
        fetchFilms();
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [retrying, cancelRetry]);

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

          {/* Fetch Button */}
          <button
            className="btn btn-primary my-3"
            onClick={() => {
              setCancelRetry(false);
              fetchFilms();
            }}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load Films"}
          </button>

          {/* Cancel Retry Button */}
          {retrying && !cancelRetry && (
            <button
              className="btn btn-danger ms-3"
              onClick={() => setCancelRetry(true)}
            >
              Cancel Retry
            </button>
          )}

          {/* Loader */}
          {isLoading && (
            <div className="d-flex justify-content-center mt-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {/* Error */}
          {error && !cancelRetry && (
            <p className="text-danger mt-2">{error}</p>
          )}

          {/* Products Grid */}
          <div className="row mt-4">
            {productsArr.map((product, index) => (
              <div className="col-md-6 mb-4" key={index}>
                <h5 className="mb-3">Album {index + 1}</h5>
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="d-block mx-auto img-fluid"
                  style={{ maxHeight: "300px" }}
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

                  {/* Show fetched film info below product */}
                  {films[index] && (
                    <div className="mt-3 text-start">
                      <p>
                        <strong>Episode:</strong> {films[index].episode_id}
                      </p>
                      <p>
                        <strong>Director:</strong> {films[index].director}
                      </p>
                      <p>
                        <strong>Release Date:</strong> {films[index].release_date}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

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
