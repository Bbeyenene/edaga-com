// src/components/OrderItem.jsx
import React from "react";
import ProgressBar from "./ProgressBar";
import OrderInfo from "./OrderInfo";

const OrderItem = ({ item }) => {
  const calculateExpectedDeliveryDate = (orderDate, daysToDeliver = 7) => {
    const date = new Date(orderDate);
    date.setDate(date.getDate() + Number(daysToDeliver));
    return date.toLocaleDateString();
  };

  const getCurrentDeliveryStep = (orderDate) => {
    const currentDate = new Date();
    const daysSinceOrder = Math.floor((currentDate - new Date(orderDate)) / (1000 * 60 * 60 * 24));

    if (daysSinceOrder < 1) return "Order Placed";
    if (daysSinceOrder < 3) return "Processing";
    if (daysSinceOrder < 5) return "Out for Delivery";
    return "Shipped";
  };

  const orderDate = item.orderDate || new Date();
  const expectedDeliveryDate = calculateExpectedDeliveryDate(orderDate, item.deliveryDays || 7);
  const currentStep = getCurrentDeliveryStep(orderDate);

  return (
    <li className="order-item">
      <ProgressBar currentStep={currentStep} />
      <OrderInfo productName={item.productName} price={item.price} expectedDeliveryDate={expectedDeliveryDate} />
    </li>
  );
};

export default OrderItem;
