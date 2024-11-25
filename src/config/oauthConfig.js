import { OktaAuth } from '@okta/okta-auth-js';

export const oktaConfig = {
  clientId: '0oal8p7s4zBrB8TFP5d7', 
  issuer: 'https://dev-37956298.okta.com/oauth2/default',
  redirectUri: `${window.location.origin}/login/callback`, // Ensure this matches your Okta app's redirect URI
  scopes: ['openid', 'profile', 'email'], // Add any additional scopes if needed
  pkce: true, // Recommended for public clients
  devMode: true, // Add this
};

const oktaAuth = new OktaAuth(oktaConfig);
export default oktaAuth;
