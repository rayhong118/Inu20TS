import { applyMiddleware, createStore, Action } from "redux";
import reduxThunk, { ThunkAction } from "redux-thunk";
import { rootReducer } from "./reducers/rootReducer";

export type AppState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

let store: any;

const createReduxStore: any = () => {
  store = createStore(rootReducer, applyMiddleware(reduxThunk));
  return store;
};

export default createReduxStore;
