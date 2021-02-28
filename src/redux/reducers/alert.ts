import { Reducer } from "redux";
import { AlertObj } from "../../shared/tools/types";

import { SET_ALERT, CLEAR_ALERT } from "../actions/actionTypes";

const initState: AlertObj = { duration: 0 };

export const alertReducer: Reducer<AlertObj> = (
  state = initState,
  action: any
) => {
  switch (action.type) {
    case SET_ALERT:
      return { ...state, ...action.payload };
    case CLEAR_ALERT:
      return {};
    default:
      return state;
  }
};
