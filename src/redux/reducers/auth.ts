import { Reducer } from "redux";

import { SET_AUTH_LOADED, SET_USER_CREDENTIAL } from "../actions/actionTypes";
interface userObj {
  credential?: firebase.User | null;
  isAuthLoaded: boolean;
}

const initState: userObj = { credential: null, isAuthLoaded: false };

export const authReducer: Reducer<userObj> = (
  state = initState,
  action: any
) => {
  switch (action.type) {
    case SET_USER_CREDENTIAL:
      return { ...state, credential: action.payload };
    case SET_AUTH_LOADED:
      return { ...state, authLoaded: action.payload };
    default:
      return state;
  }
};
