// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProductsProvider } from './contexts/ProductsContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import Contact from './pages/Contact';
import About from './pages/About';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import AddProduct from "./components/product/AddProduct"; // 


function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider> {/* Wrap Router with CartProvider */}
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/contacts" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/add" element={<AddProduct />} /> 
              <Route path="/secure" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

// ProtectedRoute Component to protect seller dashboard
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user && user.role === 'seller' ? children : <Navigate to="/login" />;
};

export default App;
