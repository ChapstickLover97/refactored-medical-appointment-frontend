import { OktaAuth } from "@okta/okta-auth-js";

const oktaAuth = new OktaAuth({
    issuer: "https://dev-65717442.okta.com/oauth2/default", // Replace with your Okta issuer URL
    clientId: "0oalqdmr49eQdR0h85d7", // Replace with your Okta client ID
    redirectUri: "http://localhost:3000/login/callback",
});

export { oktaAuth };