import React, { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCtwLDyIgie3wiULpZiBj8FP6cFbJ3QSqs",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        const message = data?.error?.message || "Login failed!";
        setError(message);
        throw new Error(message);
      }

      // Successful login
      login(data.idToken,enteredEmail);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/store"); // redirect to products page

      emailRef.current.value = "";
      passwordRef.current.value = "";
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="card mx-auto shadow p-4 bg-primary text-white" style={{ maxWidth: "400px" }}>
      <h3 className="mb-4">Login</h3>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" className="form-control" ref={emailRef} required />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input type="password" className="form-control" ref={passwordRef} required />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-info w-100" disabled={isProcessing}>
          {isProcessing ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
