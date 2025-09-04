import { useState, useRef,useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
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

    // Decide URL based on login/signup
    const url = isLogin
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCtwLDyIgie3wiULpZiBj8FP6cFbJ3QSqs"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCtwLDyIgie3wiULpZiBj8FP6cFbJ3QSqs";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setIsProcessing(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            setError(errorMessage);
            alert(errorMessage);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        if (isLogin) {
          login(data.idToken);
          localStorage.setItem("refreshToken", data.refreshToken); 
          alert("Login successful!");
          emailInputRef.current.value = "";
          passwordInputRef.current.value = "";
        } else {
          alert("Sign Up successful!");
          emailInputRef.current.value = "";
          passwordInputRef.current.value = "";
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="card mx-auto shadow p-4 bg-primary text-white" style={{ maxWidth: "400px" }}>
      <h3 className="mb-4">{isLogin ? "Login" : "Sign Up"}</h3>
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

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-info flex-fill" disabled={isProcessing}>
            {isProcessing ? "Sending request..." : isLogin ? "Login" : "Sign Up"}
          </button>

          <button type="button" className="btn btn-secondary flex-fill" onClick={switchAuthModeHandler}>
            {isLogin ? "Create New Account" : "Login with Existing Account"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;

