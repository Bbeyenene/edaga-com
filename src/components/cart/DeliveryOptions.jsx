// src/components/DeliveryOptions.jsx
import React from "react";

const DeliveryOptions = ({ deliveryOption, setDeliveryOption }) => (
  <div className="delivery-options">
    <h3>Delivery Options</h3>

    <label>
      <input
        type="radio"
        value="free"
        checked={deliveryOption === "free"}
        onChange={() => setDeliveryOption("free")}
      />
      <span style={{color:'green'}}>Free delivery (7 days)</span>
    </label>
    <label>
      <input
        type="radio"
        value="paid"
        checked={deliveryOption === "paid"}
        onChange={() => setDeliveryOption("paid")}
      />
      
      <span style={{fontWeight:"bold"}}>Express (3-5 days) delivery ($7.99)</span>
    </label>
    
  </div>
);

export default DeliveryOptions;
