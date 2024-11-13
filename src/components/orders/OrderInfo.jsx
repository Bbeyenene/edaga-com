// src/components/orders/OrderInfo.jsx
import React from "react";

const OrderInfo = ({ order }) => {
  console.log('order===> ', order);
  const totalPrice = order?.totalPrice ? order.totalPrice.toFixed(2) : "0.00";

  return (
    <div className="order-info">
      <h3>Order Summary</h3>
      <p>Total Items: {order.items?.reduce((sum, item) => sum + item.itemsToBuy, 0) || 0}</p>
      <p>Total Price: ${totalPrice}</p>
      <p>Delivery Address:</p>
      <ul>
        <li>{order.deliveryAddress?.street || "N/A"}</li>
        <li>{order.deliveryAddress?.city || "N/A"}</li>
        <li>{order.deliveryAddress?.state || "N/A"}</li>
        <li>{order.deliveryAddress?.zipcode || "N/A"}</li>
      </ul>
    </div>
  );
};

export default OrderInfo;
