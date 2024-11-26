import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Security } from "@okta/okta-react";
import { OktaAuth } from "@okta/okta-auth-js";
import App from "./App";
import { oktaConfig } from "./config/oauthConfig";
import { ProductsProvider } from "./contexts/ProductsContext";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { SignupProvider } from "./contexts/SignupContext";

const oktaAuth = new OktaAuth(oktaConfig);

// Restore Original URI Function
const restoreOriginalUri = async (oktaAuth, originalUri) => {
  window.location.replace(originalUri || "/");
};

// Combined Providers Component
const AppProviders = ({ children }) => (


  <ProductsProvider>
    <CartProvider>
      <SignupProvider>
       {children}
      </SignupProvider>
    </CartProvider>
  </ProductsProvider>

);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <AuthProvider>
          <AppProviders>
            <App />
          </AppProviders>
        </AuthProvider>
      </Security>
    </BrowserRouter>
  </React.StrictMode>
);
