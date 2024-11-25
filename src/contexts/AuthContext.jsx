import React, { createContext, useContext, useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { oktaAuth, authState } = useOktaAuth();
  const [user, setUser] = useState(null);

  // Wait for Security to initialize properly
  useEffect(() => {
    if (!authState) return; // Avoid uninitialized states
    if (authState.isAuthenticated) {
      oktaAuth.getUser().then(setUser);
    } else {
      setUser(null);
    }
  }, [authState, oktaAuth]);
  useEffect(() => {
  //   console.log("authState", authState);
  //   console.log("oktaAuth", oktaAuth);
  }, [authState, oktaAuth]);
  
  // Provide login and logout methods
  const login = () => oktaAuth.signInWithRedirect();
  const logout = () => oktaAuth.signOut();

  return (
    <AuthContext.Provider value={{ user, authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
};
