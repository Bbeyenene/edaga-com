import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]); // New state for storing confirmed orders

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.productId === product.productId);
      if (existingItem) {
        // If item exists, increment its quantity
        return prevItems.map(item =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // If item does not exist, add it with an initial quantity of 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.reduce((acc, item) => {
        if (item.productId === productId) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
          return acc;
        }
        acc.push(item);
        return acc;
      }, [])
    );
  };

  const updateCartItemQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeCartItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.productId !== productId));
  };

  const confirmOrder = () => {
    // Move items from cart to orders and clear cart
    setOrders((prevOrders) => [...prevOrders, ...cartItems]);
    setCartItems([]);
    console.log("Order confirmed with items:", cartItems);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orders, // Provide orders to the context
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
