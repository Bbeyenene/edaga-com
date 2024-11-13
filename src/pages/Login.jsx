// src/pages/SellerLogin.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom'; // Importing Link
import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (result.success) {
      navigate('/secure');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        {/* Logo Linking Back to Home */}
        <div className="logo">
          <Link to="/" className="logo-link">Online Business</Link>
        </div>

        <h2>Seller Login</h2>
        {error && <p className="error-message">{error}</p>}
        
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username" // Added id for accessibility
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Enter your username"
        />
        
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password" // Added id for accessibility
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
