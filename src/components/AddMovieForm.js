import React, { useState } from "react";

const AddMovieForm = ({ onAddMovie, onClose }) => {
  const [newMovie, setNewMovie] = useState({
    title: "",
    opening_text: "",
    release_date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onAddMovie(newMovie);
    setNewMovie({ title: "", opening_text: "", release_date: "" });
    onClose(); // close the form
  };

  return (
    <div className="card p-3 mb-3 shadow mx-auto" style={{ maxWidth: "600px" }}>
      <h5>Add Movie</h5>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Title"
        name="title"
        value={newMovie.title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Opening Text"
        name="opening_text"
        value={newMovie.opening_text}
        onChange={handleInputChange}
      />
      <input
        type="date"
        className="form-control mb-2"
        placeholder="Release Date"
        name="release_date"
        value={newMovie.release_date}
        onChange={handleInputChange}
      />
      <button
        className="btn btn-info w-50 mt-2 d-block mx-auto"
        onClick={handleSubmit}
      >
        Add Movie
      </button>
    </div>
  );
};

export default AddMovieForm;
