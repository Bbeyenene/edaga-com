import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import ProgressBar from "../components/cart/ProgressBar";
import CartItems from "../components/cart/CartItems";
import DeliveryOptions from "../components/cart/DeliveryOptions";
import TotalSummary from "../components/cart/TotalSummary";
import DeliveryForm from "../components/cart/DeliveryForm";
import PaymentForm from "../components/cart/PaymentForm";
import Confirmation from "../components/cart/Confirmation";
import "./CartPage.css";

const CartPage = () => {
  const { cartItems, confirmOrder } = useContext(CartContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedItems, setSelectedItems] = useState(cartItems.map(() => true));
  const [deliveryOption, setDeliveryOption] = useState("free");
  const [address, setAddress] = useState({});
  const [paymentInfo, setPaymentInfo] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Calculate total price per item and overall total
  const totalPrice = cartItems.reduce(
    (sum, item, index) => sum + (selectedItems[index] ? item.price * item.itemsToBuy : 0),
    0
  );

  const deliveryCost = deliveryOption === "paid" ? 7.99 : 0;
  const finalTotal = totalPrice + deliveryCost;

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 0 && !selectedItems.some((selected) => selected)) {
      newErrors.selectedItems = "Please select at least one item to proceed.";
    }

    if (currentStep === 1) {
      const requiredFields = ["firstName", "lastName", "street", "city", "state", "zipcode"];
      requiredFields.forEach((field) => {
        if (!address[field]) newErrors.address = "Please fill in all required address fields.";
      });
    }

    if (currentStep === 2) {
      const requiredFields = ["cardNumber", "expireDate", "cvv", "billingZip"];
      requiredFields.forEach((field) => {
        if (!paymentInfo[field]) newErrors.paymentInfo = "Please complete all payment information fields.";
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep()) setCurrentStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (currentStep === 1) setAddress((prev) => ({ ...prev, [name]: value }));
    if (currentStep === 2) setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSelectItem = (index) => {
    setSelectedItems((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    console.log("Confirming order...", e);

    confirmOrder( address);
    navigate("/orders");
  };

  return (
    <div className="cart-page">
      {cartItems.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <p>Your cart is empty. &nbsp;&nbsp;</p>
          <Link to="/" style={{ cursor: 'pointer' }}>Please Select Product</Link>
        </div>
      ) : (
        <>
          <ProgressBar currentStep={currentStep} />

          {currentStep === 0 && (
            <>
              <CartItems
                cartItems={cartItems} // Pass cart items with quantity to CartItems component
                selectedItems={selectedItems}
                toggleSelectItem={toggleSelectItem}
                error={errors.selectedItems}
              />
              <DeliveryOptions
                deliveryOption={deliveryOption}
                setDeliveryOption={setDeliveryOption}
              />
              <TotalSummary
                totalPrice={totalPrice}
                deliveryCost={deliveryCost}
                finalTotal={finalTotal}
              />
              <button onClick={handleNextStep} className="continue-button">
                Proceed to Delivery
              </button>
            </>
          )}

          {currentStep === 1 && (
            <>
              <DeliveryForm
                address={address}
                handleInputChange={handleInputChange}
                error={errors.address}
              />
              <button onClick={handleNextStep} className="continue-button">
                Continue to Payment
              </button>
              <button onClick={handlePreviousStep} className="back-button">
                Back
              </button>
            </>
          )}

          {currentStep === 2 && (
            <>
              <PaymentForm
                paymentInfo={paymentInfo}
                handleInputChange={handleInputChange}
                error={errors.paymentInfo}
              />
              <button onClick={handleNextStep} className="continue-button">
                Proceed to Confirmation
              </button>
              <button onClick={handlePreviousStep} className="back-button">
                Back
              </button>
            </>
          )}

          {currentStep === 3 && (
            <Confirmation
              address={address}
              paymentInfo={paymentInfo}
              finalTotal={finalTotal}
              handleConfirmOrder={handleConfirmOrder}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CartPage;
