import React, { useContext, useState } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import "./AddProduct.css";

const AddProduct = () => {
  const { addProduct, message } = useContext(ProductsContext);
  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    price: 0,
    quantity: 0,
    sellerId: "",
  });
  const [images, setImages] = useState([]); // Store multiple images
  const [localMessage, setLocalMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const processFiles = (files) => {
    const newImages = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        if (newImages.length === files.length) {
          setImages((prevImages) => [...prevImages, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!product.productName || !product.productDescription || !product.sellerId || !product.price || !product.quantity) {
      setLocalMessage("All fields are required, and price and quantity must be numbers.");
      return;
    }
    if (product.price <= 0 || product.quantity <= 0) {
      setLocalMessage("Price and quantity must be greater than zero.");
      return;
    }

    const success = await addProduct({ ...product, productImages: images });

    if (success) {
      setProduct({
        productName: "",
        productDescription: "",
        price: 0,
        quantity: 0,
        sellerId: "",
      });
      setImages([]);
      setLocalMessage("Product added successfully!");
    } else {
      setLocalMessage("Failed to add product. Try again.");
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
        <label className="form-label">
          Product Name:
          <input type="text" name="productName" value={product.productName} onChange={handleChange} required className="form-input" />
        </label>
        <label className="form-label">
          Description:
          <textarea name="productDescription" value={product.productDescription} onChange={handleChange} required className="form-textarea" />
        </label>
        <label className="form-label">
          Price:
          <input type="number" name="price" value={product.price} onChange={handleChange} required min="0.01" step="0.01" className="form-input" />
        </label>
        <label className="form-label">
          Quantity:
          <input type="number" name="quantity" value={product.quantity} onChange={handleChange} required min="1" step="1" className="form-input" />
        </label>
        <label className="form-label">
          Seller ID:
          <input type="text" name="sellerId" value={product.sellerId} onChange={handleChange} required className="form-input" />
        </label>
        
        <label className="form-label form-label-images">
          Product Images:
          <input type="file" multiple accept="image/*" onChange={handleImageChange} className="form-input-file" />
          <div className="image-preview">
            {images.map((image, index) => (
              <div key={index} className="image-preview-item">
                <img src={image} alt={`Preview ${index}`} className="image-preview-thumbnail" />
                <button type="button" className="image-remove-button" onClick={() => handleRemoveImage(index)}>×</button>
              </div>
            ))}
          </div>
          <p className="image-upload-instructions">Drag & drop images here or click to add images</p>
        </label>

        <button type="submit" className="submit-button">Add Product</button>
      </form>
      {(message || localMessage) && <p className="message">{message || localMessage}</p>}
    </div>
  );
};

export default AddProduct;
