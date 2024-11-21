// src/pages/Login.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

const LoginPage = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState?.isAuthenticated) {
      // Redirect to the cart if already logged in
      navigate('/cart', { replace: true });
    } else if (authState?.isAuthenticated === false) {
      // Redirect to Okta login if not authenticated
      oktaAuth.signInWithRedirect();
    }
  }, [authState, oktaAuth, navigate]);

  // Show loading until the authentication state is resolved
  if (authState === undefined) {
    return <div>Loading...</div>;
  }

  return null; // Nothing to display, as redirection logic handles everything
};

export default LoginPage;
