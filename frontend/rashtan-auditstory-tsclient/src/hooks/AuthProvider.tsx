import React, { useEffect, useState, ReactNode, useContext } from "react";
import {
  firebaseAuth,
  extractUserInfo,
  hasIdInToken,
  currentUser,
  signInWithGoogle
} from "./Firebase";
import firebase from "firebase/app";
import { RegisterDataDto, UserModel as User } from "../models/User";
import { apiFetch } from "./useApi";
import { appUrl } from "./Constants";

interface ContextProps {
  user: User | undefined;
  authenticated: boolean;
  loadingAuthState: boolean;
  register: (data: RegisterDataDto, code: string | null) => Promise<void>;
  login: (email: string, pass: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetUser: () => Promise<void>;
  ensureNoLoadingState: () => void;
}

const AuthContext = React.createContext<ContextProps>({
  user: undefined,
  authenticated: false,
  loadingAuthState: false,
  register: _ => Promise.resolve(),
  login: _ => Promise.resolve(),
  googleLogin: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  forgotPassword: _ => Promise.resolve(),
  resetUser: () => Promise.resolve(),
  ensureNoLoadingState: () => {}
});

const AuthConsumer = AuthContext.Consumer;
const useAuthContext = () => useContext(AuthContext);

const ensureUserId = async (fbUser: firebase.User) => {
  // check if the user has an ID
  if (await hasIdInToken(fbUser)) return;

  // create user in our database
  const token = await fbUser.getIdToken(true);
  await apiFetch<number>("POST", "user/create", token);
};

interface Props {
  children: ReactNode | ReactNode[] | Element;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [loadingAuthState, setLoadingAuthState] = useState(true);

  useEffect(
    () =>
      firebaseAuth().onIdTokenChanged(async (fbUser: firebase.User | null) => {
        if (fbUser && !user) {
          // this is a login
          await ensureUserId(fbUser);
        }
        await setUserInfoFromUser(fbUser);
        setLoadingAuthState(false);
      }),
    []
  );

  const setUserInfoFromUser = async (fbUser: firebase.User | null) => {
    if (!fbUser) {
      setUser(undefined);
      return;
    }

    const localUser = await extractUserInfo(fbUser);

    setUser(localUser);
  };
  const login = async (email: string, pass: string) => {
    setLoadingAuthState(true);
    await firebaseAuth()
      .signInWithEmailAndPassword(email, pass)
      .catch(e => {
        setLoadingAuthState(false);
        throw e;
      });
  };

  const register = async (data: RegisterDataDto, code: string | null) => {
    try {
      setLoadingAuthState(true);
      const { user } = await firebaseAuth().createUserWithEmailAndPassword(
        data.email,
        data.password
      );
      if (user && user !== null) {
        await user.updateProfile({
          displayName: data.name
        });

        // TODO: Check this for more options https://firebase.google.com/docs/auth/web/passing-state-in-email-actions
        const actionCodeSettings = {
          url: code ? `${appUrl}invitation?code=${code}` : `${appUrl}new-lab/`
          // TODO: Add options for opening Continue button in the app
        };
        // we can send the email and create the user in the same time
        await user.sendEmailVerification(actionCodeSettings);
      }
    } catch (e) {
      setLoadingAuthState(false);
      throw e;
    }
  };

  const googleLogin = () => {
    setLoadingAuthState(true);
    return signInWithGoogle()
      .then(() => {}) // small hack to make it Promise<void>
      .catch(e => {
        setLoadingAuthState(false);
        throw e;
      });
  };

  const forgotPassword = (email: string) => {
    return firebaseAuth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("email is sent");
      })
      .catch((error: any) => {
        alert(error.message);
      })
      .finally();
  };

  const logout = () => {
    setLoadingAuthState(true);
    return firebaseAuth()
      .signOut()
      .catch(e => {
        setLoadingAuthState(false);
        throw e;
      });
  };

  const resetUser = async () => {
    try {
      setLoadingAuthState(true);
      const fbUser = currentUser();
      await setUserInfoFromUser(fbUser);
    } finally {
      setLoadingAuthState(false);
    }
  };

  const ensureNoLoadingState = () =>
    loadingAuthState && setLoadingAuthState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated: user ? true : false,
        loadingAuthState,
        register,
        login,
        googleLogin,
        forgotPassword,
        logout,
        resetUser,
        ensureNoLoadingState
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthConsumer, useAuthContext };
