// src/pages/LandingPage.jsx
import React, { useContext } from "react";
import { ProductsContext } from "../contexts/ProductsContext";
import { CartContext } from "../contexts/CartContext";
import ProductDescription from "../components/ProductDescription";
import { FaPlus } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel"; 
import "react-responsive-carousel/lib/styles/carousel.min.css";

const LandingPage = () => {
  const { products, loading, error } = useContext(ProductsContext);
  const { addToCart } = useContext(CartContext);

  if (loading) {
    return <div className="landing-container">Loading products...</div>;
  }

  if (error) {
    return <div className="landing-container">Error: {error}</div>;
  }

  
  return (
    <div className="landing-container">
      <h2>Available Products</h2>
      <div className="product-grid">
        {products?.map((product) => (
          <div key={product.ProductId} className="product-card">
            <div className="product-image-container" style={{border:'2px solid red'}}>
              {product.productImages && product.productImages.length > 0 ? (
                <Carousel 
                  showThumbs={false} 
                  showStatus={false} 
                  infiniteLoop 
                  renderIndicator={(onClickHandler, isSelected, index, label) => {
                    return (
                      <button
                        type="button"
                        onClick={onClickHandler}
                        className={`dot ${isSelected ? "selected" : ""}`}
                        aria-label={`${label} ${index + 1}`}
                      />
                    );
                  }}
                >
                  {product.productImages.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image}
                        alt={`${product.productName} image ${index + 1}`}
                        loading="lazy"
                        className="carousel-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/placeholder.jpg";
                        }}
                      />
                    </div>
                  ))}
                </Carousel>
              ) : (
                <img
                  src="/images/placeholder.jpg"
                  alt={product.productName}
                  loading="lazy"
                  className="carousel-image"
                />
              )}
            </div>
            <div className="product-details">
              <h3 className="product-name">{product.productName}</h3>
              <ProductDescription description={product.productDescription} />
              <p className="product-price">${product.price}</p>
              <p className="product-seller">Seller: {product.sellerId}</p>
              <button
                className="add-to-cart-button"
                onClick={() => addToCart(product)}
              >
                <FaPlus />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
