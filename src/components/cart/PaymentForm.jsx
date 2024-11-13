// src/components/PaymentForm.jsx
import React from "react";

const PaymentForm = ({ paymentInfo, handleInputChange, error }) => (
  <div className="payment-form">
    <h2>Payment Information</h2>
    {["cardNumber", "expireDate", "cvv", "billingZip"].map((field) => (
      <label key={field}>
        {field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:
        <input type="text" name={field} value={paymentInfo[field]} onChange={handleInputChange}  />
      </label>
    ))}
    {error && <p className="error">{error}</p>}
  </div>
);

export default PaymentForm;
