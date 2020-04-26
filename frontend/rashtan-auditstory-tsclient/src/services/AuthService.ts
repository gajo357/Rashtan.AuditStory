import { AUTH_CONFIG, BASE_ADDRESS } from "./Auth0Config";
import { Auth0Client } from "@auth0/auth0-spa-js";

export default class AuthService {
  auth0: Auth0Client;

  constructor() {
    this.auth0 = new Auth0Client({
      domain: AUTH_CONFIG.domain,
      client_id: AUTH_CONFIG.clientID,
      redirect_uri: AUTH_CONFIG.redirectUri,
      audience: AUTH_CONFIG.audience,
      responseType: "token id_token",
      scope: "openid profile",
      useRefreshTokens: true,
      cacheLocation: "localstorage",
    });
  }

  logIn = () => this.auth0.loginWithRedirect();

  logOut = () => this.auth0.logout({ returnTo: BASE_ADDRESS + "login" });

  handleAuthentication = () => this.auth0.handleRedirectCallback();

  isAuthenticated = () => this.auth0.isAuthenticated();

  getAccessToken = async () => {
    try {
      const isAuth = await this.isAuthenticated();
      if (isAuth) {
        return await this.auth0.getTokenSilently();
      }
      await this.logIn();
    } catch {
      await this.logIn();
    }
  };
}
