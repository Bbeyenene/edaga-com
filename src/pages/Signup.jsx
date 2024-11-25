import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../contexts/SignupContext";
import { useAuth } from "../contexts/AuthContext";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const { submitSignupData } = useSignup();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    verifyEmail: "",
    password: "",
    middleName: "",
    primaryPhone: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    countryCode: "",
    secondaryEmail: "",
  });

  const [error, setError] = useState("");
  const [emailMismatch, setEmailMismatch] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setEmailMismatch(false);

    console.log("Form data before validation:", formData);

    if (!validateEmail(formData.email)) {
      setError("Invalid email address.");
      return;
    }

    if (formData.email !== formData.verifyEmail) {
      setEmailMismatch(true);
      setError("Emails do not match.");
      return;
    }

    console.log("Calling submitSignupData with:", formData);
    const result = await submitSignupData(formData);
    console.log("submitSignupData result:", result);

    if (result.success) {
      login();
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Personal Information</h2>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="middleName"
            placeholder="Middle Name"
            value={formData.middleName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="primaryPhone"
            placeholder="Primary Phone"
            value={formData.primaryPhone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section">
          <h2>Address</h2>
          <input
            type="text"
            name="streetAddress"
            placeholder="Street Address"
            value={formData.streetAddress}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="countryCode"
            placeholder="Country Code"
            value={formData.countryCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section">
          <h2>Account Information</h2>
          <label htmlFor="email">User Email:</label>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            style={{
              borderColor: emailMismatch ? "red" : "",
            }}
            required
          />
          <input
            type="email"
            name="verifyEmail"
            placeholder="Verify Email"
            value={formData.verifyEmail}
            onChange={handleChange}
            style={{
              borderColor: emailMismatch ? "red" : "",
            }}
            required
          />
          <hr  style={{fontSize:'16px', border:'1px solid #f9f9f9'}}/>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
