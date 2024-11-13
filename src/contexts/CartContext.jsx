// src/contexts/CartContext.jsx
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.ProductId === product.ProductId);

      if (existingItem) {
        return prevItems.map((item) =>
          item.ProductId === product.ProductId
            ? { ...item, itemsToBuy: item.itemsToBuy + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, itemsToBuy: 1 }];
    });
  };

  const removeFromCart = (ProductId) => {
    setCartItems((prevItems) =>
      prevItems.reduce((acc, item) => {
        if (item.ProductId === ProductId) {
          if (item.itemsToBuy > 1) {
            acc.push({ ...item, itemsToBuy: item.itemsToBuy - 1 });
          }
          return acc;
        }
        acc.push(item);
        return acc;
      }, [])
    );
  };

  const updateCartItemQuantity = (ProductId, itemsToBuy) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.ProductId === ProductId ? { ...item, itemsToBuy } : item
      )
    );
  };

  const removeCartItem = (ProductId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.ProductId !== ProductId));
  };

  const confirmOrder = (deliveryAddress) => {
    console.log('deliveryAddress: ', deliveryAddress);
    const totalOrderPrice = cartItems.reduce(
      (total, item) => total + item.price * item.itemsToBuy,
      0
    );

    const newOrder = {
      id: orders.length + 1,
      items: [...cartItems],
      totalPrice: totalOrderPrice,
      deliveryAddress,
      createdAt: new Date().toISOString(),
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]);
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orders,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        removeCartItem,
        confirmOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
