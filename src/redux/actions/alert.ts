import { AlertObj } from "../../shared/tools/types";
import { SET_ALERT, CLEAR_ALERT } from "./actionTypes";

export const setAlert = (alert: AlertObj) => {
  return { type: SET_ALERT, payload: alert };
};

export const clearAlert = () => {
  return { type: CLEAR_ALERT };
};
