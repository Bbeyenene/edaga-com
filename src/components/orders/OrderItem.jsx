// src/components/orders/OrderItem.jsx
import React from "react";
import ProgressBar from "./ProgressBar";

const OrderItem = ({ item }) => {
  console.log('OrderItem===> ', item);
  const { productName, itemsToBuy, price, ProductId, createdAt } = item; // Destructure properties

  return (
    <>
    <ProgressBar  currentStep="Order Placed" />
     <li>
      <p>Product ID: {ProductId}</p>
      <p>Product Name: {productName}</p>
      <p>Quantity: {itemsToBuy}</p>
      <p>Price: ${(price * itemsToBuy).toFixed(2)}</p>
      <p>{createdAt}</p>
    </li>
    </>
   
  );
};

export default OrderItem;
