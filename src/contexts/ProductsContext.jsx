// src/contexts/ProductsContext.jsx
import React, { createContext, useState, useEffect } from 'react';
// import productsData from './products.json'; // Adjust the path as needed

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("")
  // Initialize products from imported JSON
  useEffect(() => {
    fetchProducts()
    // setProducts(productsData);
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://b6bjk9vee1.execute-api.us-east-1.amazonaws.com/default/habesha-market", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data.Products);
        setProducts(data?.Products);
      } else {
        setMessage("Failed to fetch products.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setMessage("Error fetching products. Try again.");
    }
  };

  const addProduct = async (product) => {
    try {
      console.log('product: ', JSON.stringify(product));
      const response = await fetch("https://b6bjk9vee1.execute-api.us-east-1.amazonaws.com/default/habesha-market", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      

      if (response.ok) {
        const newProduct = await response.json();
        setProducts((prevProducts) => [...prevProducts, newProduct.Product]);
        setMessage("Product added successfully!");
        return true;
      } else {
        setMessage("Failed to add product. Try again.");
        return false;
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Error adding product. Try again.");
      return false;
    }
  };


  return (
    <ProductsContext.Provider value={{ products, addProduct, message }}>
      {children}
    </ProductsContext.Provider>
  );
};

