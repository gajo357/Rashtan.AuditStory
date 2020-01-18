import { WebAuth } from "auth0-js";
import { AUTH_CONFIG, BASE_ADDRESS } from "./Auth0Config";

export default class AuthService {
  auth0: WebAuth;

  constructor() {
    this.auth0 = new WebAuth({
      domain: AUTH_CONFIG.domain,
      clientID: AUTH_CONFIG.clientID,
      redirectUri: AUTH_CONFIG.redirectUri,
      audience: AUTH_CONFIG.audience,
      responseType: "token id_token",
      scope: "openid profile"
    });
  }

  logIn = () => {
    this.auth0.authorize();
  };

  logOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_at");
    this.auth0.logout({ returnTo: BASE_ADDRESS });
  };

  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(`${err.error}: ${err.errorDescription}`);
        if (!authResult || !authResult.accessToken) {
          return reject("No token");
        }

        this.setSession(authResult.expiresIn, authResult.accessToken);
        resolve();
      });
    });
  };

  setSession = (expiresIn: number | undefined, accessToken: string) => {
    expiresIn = expiresIn ? expiresIn * 1000 : 0;
    let expiresAt = JSON.stringify(expiresIn + new Date().getTime());
    localStorage.setItem("expires_at", expiresAt);
    localStorage.setItem("access_token", accessToken);
  };

  isAuthenticated = () => {
    const expiresAtString = localStorage.getItem("expires_at");
    if (!expiresAtString) return false;
    const expiresAt = JSON.parse(expiresAtString);
    const currentTime = new Date().getTime();

    return currentTime < expiresAt;
  };

  getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      return "";
    }
    return accessToken;
  };
}
