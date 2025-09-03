import { useState, useRef } from "react";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const switchAuthModeHandler = () => {
    setIsLogin((prev) => !prev);
    setError(null);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsProcessing(true);
    setError(null);

    if (!isLogin) {
      // Sign Up
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCtwLDyIgie3wiULpZiBj8FP6cFbJ3QSqs",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((res) => {
          setIsProcessing(false);
          if (res.ok) {
            alert("Sign up successful!");
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed!";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              alert(errorMessage);
            });
          }
        })
        .catch((err) => {
          setIsProcessing(false);
          setError(err.message || "Something went wrong!");
        });
    } else {
      // Login logic placeholder
      setIsProcessing(false);
      alert("Login clicked");
    }
  };

  return (
    <div className="card mx-auto shadow p-4 bg-primary text-white" style={{ maxWidth: "400px" }}>
      <h1 className="mb-4">{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label className="form-label">Your Email:</label>
          <input type="email" className="form-control" ref={emailInputRef} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Your Password:</label>
          <input type="password" className="form-control" ref={passwordInputRef} required />
        </div>

        {error && <p className="text-danger">{error}</p>}

            <button type="button" className="btn btn-secondary mb-2" onClick={switchAuthModeHandler}>
            {isLogin ? "Create New Account" : "Login with Existing Account"}
            </button>
          <button type="submit" className="btn btn-info mb-2 " disabled={isProcessing}>
            {isProcessing ? "Sending request..." : isLogin ? "Login" : "Create Account"}
          </button>

      </form>
    </div>
  );
};

export default AuthForm;
