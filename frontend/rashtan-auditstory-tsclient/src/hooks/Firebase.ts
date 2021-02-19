import firebase from "firebase/app";
import "firebase/auth";
import { BASE_ADDRESS } from "../services/Config";
import { UserModel } from "../models/User";

firebase.initializeApp({
  apiKey: "AIzaSyDnyKfpickVx8OIwt7vEST2IiZvWG-MGQY",
  authDomain: "auditstory.firebaseapp.com",
  projectId: "auditstory",
  storageBucket: "auditstory.appspot.com",
  messagingSenderId: "31317210905",
  appId: "1:31317210905:web:9e166fc0f05a3c3225f788",
  measurementId: "G-LNVG8LR5YT"
});

const firebaseAuth = () => firebase.auth();

const signInWithGoogle = () =>
  firebaseAuth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

const currentUser = () => firebaseAuth().currentUser;

const UserIdClaimType = "https://rashtan-auditstory.com/user";

const extractCustomClaims = async (
  user: firebase.User,
  forceRefresh?: boolean
) => {
  const token = await user.getIdTokenResult(forceRefresh);

  const userId: string = token.claims[UserIdClaimType];
  return { userId };
};

const hasIdInToken = async (user: firebase.User) => {
  const { userId } = await extractCustomClaims(user);

  return userId ? true : false;
};

const extractUserInfo: (
  user: firebase.User
) => Promise<UserModel> = async user => {
  // force refresh the token to get the latest user info
  const { userId } = await extractCustomClaims(user, true);
  return {
    name: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    userId,
    sendEmailVerification: () => {
      // we take the current user, because the user object that was passed in might be unavailable
      const fbUser = currentUser();
      if (!fbUser) return Promise.resolve();

      return fbUser.sendEmailVerification({
        url: BASE_ADDRESS
        // TODO: Add options for opening Continue button in the app
      });
    },
    getIdToken: forceRefresh => {
      // we take the current user, because the user object that was passed in might be unavailable
      const fbUser = currentUser();
      if (!fbUser) return Promise.resolve(undefined);
      return fbUser.getIdToken(forceRefresh);
    }
  };
};

export {
  currentUser,
  firebaseAuth,
  extractUserInfo,
  hasIdInToken,
  signInWithGoogle
};
