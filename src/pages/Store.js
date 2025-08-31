import React, { useState, useContext, useCallback, useMemo, useEffect } from "react";
import "../head/Head.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "../head/CartContext";
import AddMovieForm from "../components/AddMovieForm";


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
  const [showMovies, setShowMovies] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [cancelRetry, setCancelRetry] = useState(false);
  const [showForm, setShowForm] = useState(false);

  

  // Form state
  

  const fetchFilms = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) throw new Error("API failed");
      const data = await response.json();

      const filmsWithImages = data.results.map((film, index) => ({
        ...film,
        imageUrl: productsArr[index % productsArr.length].imageUrl,
        title: productsArr[index % productsArr.length].title,
        price: productsArr[index % productsArr.length].price,
      }));

      setFilms(filmsWithImages);
      setRetrying(false);
      setShowMovies(true);
    } catch (err) {
      setError("Something went wrong ....Retrying");
      setRetrying(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Retry logic
  useEffect(() => {
    let timer;
    if (retrying && !cancelRetry) {
      timer = setTimeout(fetchFilms, 5000);
    }
    return () => clearTimeout(timer);
  }, [retrying, cancelRetry, fetchFilms]);

  const productElements = useMemo(() => {
    return productsArr.map((product, index) => (
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

          {/* Display movies info below images only if Load Movies clicked */}
          {showMovies && films[index] && (
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
    ));
  }, [films, addToCart, showMovies]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="bg-secondary text-center py-5">
        <h1 className="display-3 fw-bold text-white">The Generics</h1>
      </header>

      <main className="flex-grow-1">
        <section className="container my-5 text-center">
  <h2 className="fw-bold">MUSIC</h2>

  {/* Add Movie Button */}
  <div className="mb-3">
    <button
      className="btn btn-success"
      style={{ width: "15%" }}
      onClick={() => setShowForm(prev => !prev)}
    >
      {showForm ? "Hide Form" : "Add Movie"}
    </button>
  </div>

  {/* Add Movie Form */}
  {showForm && (
  <AddMovieForm
    onAddMovie={(movie) => {
      console.log("New Movie Added:", movie);
      // Optional: add to films array
      // setFilms((prev) => [...prev, movie]);
    }}
    onClose={() => setShowForm(false)}
  />
)}


  {/* Load Movies Button */}
  <div className="mb-3">
    <button
      className="btn btn-primary"
      style={{ width: "15%" }}
      onClick={() => {
        setShowMovies(true);
        setCancelRetry(false);
        fetchFilms();
      }}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : "Load Movies"}
    </button>
  </div>

  {/* Retry / Error messages */}
  {retrying && !cancelRetry && (
    <button
      className="btn btn-danger mb-3"
      onClick={() => setCancelRetry(true)}
    >
      Cancel Retry
    </button>
  )}
  {error && !cancelRetry && <p className="text-danger mt-2">{error}</p>}

  {/* Product / Movies Grid */}
  <div className="row mt-4">{productElements}</div>
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
