import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { alertReducer } from "./alert";

export const rootReducer = combineReducers({ authReducer, alertReducer });
