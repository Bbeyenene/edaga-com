// src/components/orders/OrderList.jsx
import React from "react";
import OrderItem from "./OrderItem";

const OrderList = ({ orders }) => {
  return (
    <div className="order-list">
      
      {orders.map((order, orderIndex) => (
        <div key={orderIndex} className="order">
          <div>
            <ul>
              <li>
                <p>Delivery Address:</p>
                {order.deliveryAddress.firstName}{" "}
                {order.deliveryAddress.lastName}
              </li>
              <li>
                {order.deliveryAddress.street} {order.deliveryAddress.city},{" "}
              </li>
              <li>
                {order.deliveryAddress.state} {order.deliveryAddress.zipcode}{" "}
              </li>
            </ul>
          </div>

          <ul>
            {order.items &&
              order.items.map((item, itemIndex) => (
                <OrderItem key={itemIndex} item={item} />
              ))}
          </ul>
          {/* <p>Total Price: ${order.totalPrice.toFixed(2)}</p> */}
        </div>
      ))}
    </div>
  );
};

export default OrderList;
