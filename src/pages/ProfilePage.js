import React, { useRef, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const newPasswordRef = useRef();
  const { token, logout } = useContext(AuthContext);
  const [isProcessing, setIsProcessing] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredPassword = newPasswordRef.current.value;

    setIsProcessing(true);

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCtwLDyIgie3wiULpZiBj8FP6cFbJ3QSqs`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken: token,
          password: enteredPassword,
          returnSecureToken: true,
        }),
      }
    )
      .then((res) => {
        setIsProcessing(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            const message =
              data?.error?.message || "Password change failed!";
            throw new Error(message);
          });
        }
      })
      .then((data) => {
        alert("Password changed successfully! You’ll need to log in again.");
        newPasswordRef.current.value = ""; // clear input
        logout(); // Clear old token
      })
      .catch((err) => {
        setIsProcessing(false);
        alert(err.message);
      });
  };

  return (
    <div className="card mx-auto shadow p-4 bg-light" style={{ maxWidth: "400px" }}>
      <h1 className="mb-4 text-center">Your User Profile</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input type="password" ref={newPasswordRef} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={isProcessing}>
          {isProcessing ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
