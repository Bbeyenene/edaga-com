import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Navigate } from 'react-router-dom';

const SecureRoute = ({ component: Component, ...rest }) => {
  const { authState } = useOktaAuth();

  if (!authState || !authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
};

export default SecureRoute;
