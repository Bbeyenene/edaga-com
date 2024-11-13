// src/components/DeliveryForm.jsx
import React from "react";

const DeliveryForm = ({ address, handleInputChange, error }) => (
  <div className="delivery-form">
    <h2>Delivery Information</h2>
    {["firstName", "lastName", "street", "city", "state", "zipcode"].map((field) => (
      <label key={field}>
        {field.charAt(0).toUpperCase() + field.slice(1)}:
        <input 
          type="text" 
          name={field} 
          value={address[field] || ""} // Set a default empty string if address[field] is undefined
          onChange={handleInputChange} 
        />
      </label>
    ))}
    {error && <p className="error">{error}</p>}
  </div>
);

export default DeliveryForm;
