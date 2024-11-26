import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useOktaAuth, LoginCallback } from "@okta/okta-react";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
// import Login from "./pages/Login";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import Contact from "./pages/Contact";
import About from "./pages/About";
import AddProduct from "./components/product/AddProduct";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

import "./App.css";


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/login/callback" element={<LoginCallback />} />

        {/* Public routes */}
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        {/* Secure routes */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/secure"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />


        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

// ProtectedRoute Component to protect routes
const ProtectedRoute = ({ children }) => {
  const { authState } = useOktaAuth();

  if (!authState || authState.isPending) {
    return <div>Loading...</div>; // Handle loading state
  }

  return authState.isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;
