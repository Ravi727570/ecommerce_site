import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = ({ show, handleClose }) => {
  const [cartElements, setCartElements] = useState([
    {
      title: "Colors",
      price: 100,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
      quantity: 2,
    },
    {
      title: "Black and white Colors",
      price: 50,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
      quantity: 3,
    },
    {
      title: "Yellow and Black Colors",
      price: 70,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
      quantity: 1,
    },
  ]);

  const handleRemove = (index) => {
    const newCart = [...cartElements];
    newCart.splice(index, 1);
    setCartElements(newCart);
  };

  return (
    <>
      {/* Overlay */}
      {show && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 999 }}
          onClick={handleClose}
        ></div>
      )}

      {/* Right Sidebar */}
      <div
        className={`position-fixed top-0 end-0 bg-white shadow p-4`}
        style={{
          width: "350px",
          height: "100vh",
          overflowY: "auto",
          zIndex: 1000,
          transform: show ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
        }}
      >
        {/* Close Cross */}
        <button
          onClick={handleClose}
          className="position-absolute top-0 end-0 m-2 btn btn-light border rounded-circle"
          style={{ width: "30px", height: "30px", fontWeight: "bold" }}
        >
          ×
        </button>

        <h3 className="mb-3 text-center">Your Cart</h3>

        {cartElements.length === 0 ? (
          <p className="text-center">Your cart is empty!</p>
        ) : (
          cartElements.map((item, index) => (
            <div
              key={index}
              className="d-flex align-items-center mb-3 border-bottom pb-2"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                style={{ width: "70px", height: "70px", objectFit: "cover" }}
              />
              <div className="ms-3 flex-grow-1">
                <h5 className="mb-1">{item.title}</h5>
                <p className="mb-1">
                  ${item.price} × {item.quantity} = ${item.price * item.quantity}
                </p>
              </div>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleRemove(index)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Cart;
