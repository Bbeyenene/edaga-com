
import { OktaAuth } from '@okta/okta-auth-js';

export const oktaConfig = {
  // clientId: '0oal4izy34RS0W1pF5d7', // Use your actual clientId
  // issuer: 'https://dev-40720325.okta.com/oauth2/default',
  clientId: '0oal8p7s4zBrB8TFP5d7', // '0oaj3hakkyReiiHJh5d7', // Replace with your Okta Client ID
  issuer: 'https://dev-37956298.okta.com/oauth2/default', // Replace with your Okta domain
redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
};

const oktaAuth = new OktaAuth(oktaConfig);
export default oktaAuth;
