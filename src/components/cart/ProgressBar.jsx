// src/components/ProgressBar.jsx
import React from "react";

const ProgressBar = ({ currentStep }) => {
  return (
    <div className="progress-bar">
      <div className={`step ${currentStep >= 0 ? "active" : ""}`}>Initial</div>
      <div className={`step ${currentStep >= 1 ? "active" : ""}`}>Delivery</div>
      <div className={`step ${currentStep >= 2 ? "active" : ""}`}>Payment</div>
      <div className={`step ${currentStep >= 3 ? "active" : ""}`}>Confirmation</div>
    </div>
  );
};

export default ProgressBar;
