import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

const MFAChallenge = () => {
    console.log("MFAChallenge triggered!! ");
  const { oktaAuth } = useOktaAuth();
  const navigate = useNavigate();
  const [mfaCode, setMfaCode] = useState("");
  const [error, setError] = useState("");

  const handleMfaSubmit = async (e) => {
    e.preventDefault();

    try {
      const stateToken = localStorage.getItem("mfaStateToken"); // Retrieve the saved stateToken
      const transaction = await oktaAuth.verifyFactor({
        stateToken,
        passCode: mfaCode, // Code sent via SMS or other MFA factor
      });

      if (transaction.status === "SUCCESS") {
        // Redirect to app after successful MFA
        await oktaAuth.signInWithRedirect();
      } else {
        setError("Invalid MFA code. Please try again.");
      }
    } catch (err) {
      console.error("MFA verification failed:", err);
      setError("An error occurred during MFA verification.");
    }
  };

  return (
    <div>
      <h1>Multi-Factor Authentication</h1>
      <form onSubmit={handleMfaSubmit}>
        <input
          type="text"
          placeholder="Enter 6-digit code"
          value={mfaCode}
          onChange={(e) => setMfaCode(e.target.value)}
          required
        />
        <button type="submit">Verify</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default MFAChallenge;
