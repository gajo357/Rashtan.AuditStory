import { WebAuth, Auth0DecodedHash } from "auth0-js";
import { AUTH_CONFIG } from "./Auth0Config";
import { History } from "history";

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

  login = () => {
    this.auth0.authorize();
  };

  logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    window.location.href = "/";
  };

  handleAuthentication = (history: History) => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.push("/portal");
      } else if (err) {
        console.log(err);
      }
    });
  };

  setSession = (authResult: Auth0DecodedHash) => {
    const expiresIn =
      authResult.expiresIn == null ? 0 : authResult.expiresIn * 1000;
    let expiresAt = JSON.stringify(expiresIn + new Date().getTime());
    if (authResult.accessToken != null)
      localStorage.setItem("access_token", authResult.accessToken);
    if (authResult.idToken != null)
      localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
  };

  isAuthenticated = () => {
    const expiresAtString = localStorage.getItem("expires_at");
    const expiresAt = expiresAtString == null ? 0 : JSON.parse(expiresAtString);
    return new Date().getTime() < expiresAt;
  };

  getAccessToken = () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      return "";
    }
    return accessToken;
  };
}
