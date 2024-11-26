import React, { createContext, useContext } from "react";

// Create the context
const SignupContext = createContext();

// Provider component for Signup context
export const SignupProvider = ({ children }) => {
  // Function to submit signup data to the API
  const submitSignupData = async (data) => {
    console.log("Submitting signup data:", JSON.stringify(data)); // Debugging
  
    try {
      const response = await fetch(
        "https://xoxygbn9ni.execute-api.us-east-1.amazonaws.com/default/create-okta-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Correctly specify the body key
        }
      );
  
      // Handle response
      if (response.ok) {
        console.log("User creation successful");
        return { success: true, message: "User created successfully!" };
      } else {
        const errorData = await response.json();
        console.error("User creation failed:", errorData);
        return {
          success: false,
          message: errorData.message || "Failed to create user.",
        };
      }
    } catch (error) {
      console.error("Error during submission:", error); // Debugging
      return { success: false, message: "An error occurred during submission." };
    }
  };
  
  return (
    <SignupContext.Provider value={{ submitSignupData }}>
      {children}
    </SignupContext.Provider>
  );
};

// Hook to use the Signup context
export const useSignup = () => {
  const context = useContext(SignupContext);

  // Debugging: Check if context is available
  console.log("Accessing SignupContext:", context);

  if (!context) {
    throw new Error("useSignup must be used within a SignupProvider.");
  }

  return context;
};
