// src/pages/OrdersPage.jsx
import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import OrderList from "../components/orders/OrderList";
import "./OrdersPage.css";

const OrdersPage = () => {
  const { orders } = useContext(CartContext);

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <OrderList orders={orders} />
      )}
    </div>
  );
};

export default OrdersPage;
