import React, { useContext } from "react";
import { CartContext } from "./CartContext";

const Cart = ({ show, handleClose }) => {
  

  // Quantity handler
  const { cartElements, removeFromCart, updateQuantity,clearCart } = useContext(CartContext);
const handleQuantityChange = (item, value) => {
  const qty = parseInt(value);
  if (isNaN(qty) || qty < 1) return; // prevent invalid or 0
  updateQuantity(item.title, qty);
};


  // Calculate total
  const totalPrice = cartElements.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      {show && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          
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
              <div style={{ flex: 1 }}></div>
            </div>

            {/* Cart Items */}
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
                <div style={{ flex: 1, textAlign: "right" }}>
                  ${item.price}
                </div>

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

            {/* Total + Purchase */}
            <div className="mt-4 border-top pt-3">
  <h5 className="text-end">
    <span>Total:</span>
    <span>${totalPrice.toFixed(2)}</span>
  </h5>

  <div className="d-flex justify-content-center">
    <button className="btn btn-success w-50 mt-4"onClick={() => {
      alert("Thanks for purchasing!");
      clearCart();      // Reset cart
      handleClose();    // Close cart modal
    }}>
      Purchase
    </button>
  </div>
</div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
