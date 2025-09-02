// src/pages/ContactUs.js
import React, { useState } from "react";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(false);

  const dbUrl = "https://ecommerce1-ec0a2-default-rtdb.asia-southeast1.firebasedatabase.app/contacts.json";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newContact = { name, email, phone };

    try {
      const res = await fetch(dbUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact),
      });
      if (!res.ok) throw new Error("Failed to submit");

      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
    } catch (err) {
      console.error("Error submitting contact:", err);
      setSuccess(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Contact Us</h2>
      <div className="card p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>

          {success && (
            <p className="text-success mt-3 text-center">
              Contact submitted successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
