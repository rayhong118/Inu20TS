import firebase from "firebase/app";

import { SET_AUTH_LOADED, SET_USER_CREDENTIAL } from "./actionTypes";

export const setUserCredential = (credential: firebase.User | null) => {
  return { type: SET_USER_CREDENTIAL, payload: credential };
};

export const setAuthLoaded = (isAuthLoaded: boolean) => {
  return { type: SET_AUTH_LOADED, payload: isAuthLoaded };
};
