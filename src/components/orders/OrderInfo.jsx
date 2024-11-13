// src/components/OrderInfo.jsx
import React from "react";

const OrderInfo = ({ productName, price, expectedDeliveryDate }) => {
  return (
    <div>
      <h3>{productName}</h3>
      <p>Price: ${price.toFixed(2)}</p>
      <p>Expected Delivery Date: {expectedDeliveryDate}</p>
    </div>
  );
};

export default OrderInfo;
