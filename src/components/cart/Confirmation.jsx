// src/components/Confirmation.jsx
import React from "react";

const Confirmation = ({ address, paymentInfo, finalTotal, handleConfirmOrder }) => (
  <div className="confirmation-page">
    {console.log('==> ',paymentInfo)}
    <h2>Order Confirmation</h2>
    <p>Delivery Address:</p>
    <p>{address.firstName} {address.lastName} <br/>
     {address.street} <br/>
     {address.city}, {address.state} {address.zipcode}</p>
    <p>Payment Method: {paymentInfo.cardNumber.slice(-4).padStart(16, "*")}</p>
    <p>Total Price: ${finalTotal.toFixed(2)}</p>
    <button className="confirm-order-button" onClick={handleConfirmOrder}>
      Confirm Order
    </button>
  </div>
);

export default Confirmation;
