import React, { useState, useEffect } from "react";

const AddMovieForm = () => {
  const [title, setTitle] = useState("");
  const [openingText, setOpeningText] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [movies, setMovies] = useState([]);

  const dbUrl = "https://ecommerce1-ec0a2-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json"; // 🔥 replace with Firebase/DB URL

  // Fetch movies on component load
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await fetch(dbUrl);
      const data = await res.json();

      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({ id: key, ...data[key] });
      }
      setMovies(loadedMovies);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  // Add Movie
  const addMovieHandler = async (e) => {
    e.preventDefault();
    const newMovie = {
      title,
      opening_text: openingText,
      release_date: releaseDate,
    };

    try {
      const res = await fetch(dbUrl, {
        method: "POST",
        body: JSON.stringify(newMovie),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      setMovies((prev) => [...prev, { id: data.name, ...newMovie }]);

      // Clear input fields
      setTitle("");
      setOpeningText("");
      setReleaseDate("");
    } catch (err) {
      console.error("Error adding movie:", err);
    }
  };

  // Delete Movie
  const deleteMovieHandler = async (id) => {
    try {
      await  fetch(
      `https://ecommerce1-ec0a2-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${id}.json`,
      { method: "DELETE" }
    );
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    } catch (err) {
      console.error("Error deleting movie:", err);
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow p-4 mb-4">
        <h4 className="mb-3">Add New Movie</h4>
        <form onSubmit={addMovieHandler}>
  <div className="mb-3 row align-items-center">
    <label className="col-sm-3 col-form-label">Title:</label>
    <div className="col-sm-9">
      <input
        type="text"
        className="form-control"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
    </div>
  </div>

  <div className="mb-3 row align-items-center">
    <label className="col-sm-3 col-form-label">Opening Text:</label>
    <div className="col-sm-9">
      <textarea
        className="form-control"
        value={openingText}
        onChange={(e) => setOpeningText(e.target.value)}
        required
      />
    </div>
  </div>

  <div className="mb-3 row align-items-center">
    <label className="col-sm-3 col-form-label">Release Date:</label>
    <div className="col-sm-9">
      <input
        type="date"
        className="form-control"
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
        required
      />
    </div>
  </div>

  <button type="submit" className="btn btn-success">
    Add Movie
  </button>
</form>
      </div>

      {/* Movie List with Delete Button */}
      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-4 mb-3">
            <div className="card shadow p-3 h-100">
              <h5>{movie.title}</h5>
              <p>{movie.opening_text}</p>
              <p>
                <strong>Release:</strong> {movie.release_date}
              </p>
              <button
                className="btn btn-danger"
                onClick={() => deleteMovieHandler(movie.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddMovieForm;
