// src/components/OrderList.jsx
import React from "react";
import OrderItem from "./OrderItem";

const OrderList = ({ orders }) => {
  return (
    <ul className="order-list">
      {orders.map((item, index) => (
        <OrderItem key={index} item={item} />
      ))}
    </ul>
  );
};

export default OrderList;
