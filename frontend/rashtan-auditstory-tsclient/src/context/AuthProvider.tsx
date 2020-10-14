import { Auth0Client, RedirectLoginResult } from "@auth0/auth0-spa-js";
import React, { ReactNode, useContext } from "react";
import { AUTH_CONFIG, BASE_ADDRESS } from "../services/Auth0Config";

interface ContextProps {
  logIn: () => Promise<void>;
  logOut: () => void;
  handleAuthentication: () => Promise<RedirectLoginResult>;
  isAuthenticated: () => Promise<boolean>;
  getAccessToken: () => Promise<string>;
}

const AuthContext = React.createContext<ContextProps>({
  logIn: () => Promise.resolve(),
  logOut: () => {},
  handleAuthentication: () => Promise.resolve({}),
  isAuthenticated: () => Promise.resolve(false),
  getAccessToken: () => Promise.resolve("")
});

const AuthConsumer = AuthContext.Consumer;
const useAuthContext = () => useContext(AuthContext);

interface Props {
  children: ReactNode | ReactNode[] | Element;
}

const auth0 = new Auth0Client({
  domain: AUTH_CONFIG.domain,
  client_id: AUTH_CONFIG.clientID,
  redirect_uri: AUTH_CONFIG.redirectUri,
  audience: AUTH_CONFIG.audience,
  responseType: "token id_token",
  scope: "openid profile",
  useRefreshTokens: true,
  cacheLocation: "localstorage"
});

const AuthProvider: React.FC<Props> = ({ children }) => {
  const logIn = () => auth0.loginWithRedirect();

  const logOut = () => auth0.logout({ returnTo: BASE_ADDRESS + "login" });

  const handleAuthentication = () => auth0.handleRedirectCallback();

  const isAuthenticated = () => auth0.isAuthenticated();

  const getAccessToken = async () => {
    try {
      const isAuth = await isAuthenticated();
      if (isAuth) {
        return await auth0.getTokenSilently();
      }
      return "";
    } catch (e) {
      console.log(e);
      return "";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
        handleAuthentication,
        isAuthenticated,
        getAccessToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthConsumer, useAuthContext };
