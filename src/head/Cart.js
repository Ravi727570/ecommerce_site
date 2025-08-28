import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const Cart = ({ show, handleClose }) => {
  const { cartElements, setCartElements, removeFromCart } = useContext(CartContext);

  const handleQuantityChange = (item, value) => {
    const qty = parseInt(value);
    if (isNaN(qty) || qty < 1) return; // prevent invalid or 0
    setCartElements((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.title === item.title ? { ...cartItem, quantity: qty } : cartItem
      )
    );
  };

  return (
    <>
      {show && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 999 }}
          onClick={handleClose}
        ></div>
      )}

      <div
        className={`position-fixed top-0 end-0 bg-white shadow p-4`}
        style={{
          width: "450px",
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
          className="position-absolute top-0 end-0 m-2 btn btn-info"
          style={{ width: "30px", height: "30px", fontWeight: "bold" }}
        >
          ×
        </button>

        <h3 className="mb-3 text-center">Your Cart</h3>

        {cartElements.length === 0 ? (
          <p className="text-center">Your cart is empty!</p>
        ) : (
          <>
            {/* Headings */}
            <div className="d-flex fw-bold border-bottom pb-2 mb-2">
              <div style={{ flex: 2 }}>Item</div>
              <div style={{ flex: 1, textAlign: "right" }}>Price</div>
              <div style={{ flex: 1, textAlign: "center" }}>Qty</div>
              <div style={{ flex: 1 }}></div> {/* Remove */}
            </div>

            {cartElements.map((item, index) => (
              <div
                key={index}
                className="d-flex align-items-center mb-3 border-bottom pb-2"
              >
                {/* Item */}
                <div style={{ flex: 2 }} className="d-flex align-items-center">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      marginRight: "8px",
                    }}
                  />
                  <span>{item.title}</span>
                </div>

                {/* Price */}
                <div style={{ flex: 1, textAlign: "right" }}>${item.price}</div>

                {/* Quantity input */}
                <div style={{ flex: 1, textAlign: "center" }}>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item, e.target.value)}
                    style={{ width: "60px", textAlign: "center" }}
                  />
                </div>

                {/* Remove button */}
                <div style={{ flex: 1, textAlign: "center" }}>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeFromCart(item.title)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
