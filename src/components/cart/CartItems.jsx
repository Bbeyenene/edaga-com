// src/components/CartItems.jsx
import React from "react";

const CartItems = ({ cartItems, selectedItems, toggleSelectItem, error }) => (
    console.log('===>',cartItems),
  <div>
    <h2>Your Cart</h2>
    <ul className="cart-items">
      {cartItems.map((item, index) => (
        <li key={index} className="cart-item">
          <label className="cart-item-left">
            <input
              type="checkbox"
              checked={selectedItems[index]}
              onChange={() => toggleSelectItem(index)}
            />
            <span className="product-name">{item.productName}</span> 
            
          </label>
          <p><strong>Qty:</strong> <span style={{color:'blue'}}>{item.quantity}</span> </p>
          <p className="cart-item-price">Price: ${item.price.toFixed(2)}</p>
        </li>
      ))}
    </ul>
    {error && <p className="error">{error}</p>}
  </div>
);

export default CartItems;
