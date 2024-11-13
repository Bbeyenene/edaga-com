// src/components/ProgressBar.jsx
import React from "react";

const ProgressBar = ({ currentStep }) => {
  console.log('currentStep: ', currentStep);
  return (
    <div className="progress-bar">
      <div className={`step ${!currentStep === "Order Placed" ? "active" : ""}`}>Order Placed</div>
      <div className={`step ${currentStep === "Processing" ? "active" : ""}`}>Processing</div>
      <div className={`step ${currentStep === "Out for Delivery" ? "active" : ""}`}>Out for Delivery</div>
      <div className={`step ${currentStep === "Shipped" ? "active" : ""}`}>Shipped</div>
    </div>
  );
};

export default ProgressBar;
