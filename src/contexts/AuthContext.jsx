// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User object: { username, role }

  // Mock login function
  const login = (username, password) => {
    // Implement your authentication logic here (e.g., API call)
    // For demonstration, assume any username/password combination is valid
    if (username && password) {
      // Determine role based on username or other criteria
      const role = username.toLowerCase().includes('seller') ? 'seller' : 'buyer';
      setUser({ username, role });
      return { success: true };
    } else {
      return { success: false, message: 'Invalid credentials' };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    // Additionally, clear any stored tokens or data if applicable
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
