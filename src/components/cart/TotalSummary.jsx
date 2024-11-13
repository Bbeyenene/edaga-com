// src/components/TotalSummary.jsx
import React from "react";

const TotalSummary = ({ totalPrice, deliveryCost, finalTotal }) => (
  <div className="cart-summary">
    <h3>Total Summary</h3>
    <p>Items Total: ${totalPrice.toFixed(2)}</p>
    <p>Delivery: ${deliveryCost.toFixed(2)}</p>
    <p><strong>Final Total: ${finalTotal.toFixed(2)}</strong></p>
  </div>
);

export default TotalSummary;
