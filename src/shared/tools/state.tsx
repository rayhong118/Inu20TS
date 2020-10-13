import React, { createContext, useContext, useReducer } from "react";

interface StateProviderParams {
  reducer: any;
  initialState: any;
  children: any;
}
let defaultValuePlaceholder: any;
export const StateContext = createContext(defaultValuePlaceholder);

export const StateProvider = ({
  reducer,
  initialState,
  children,
}: StateProviderParams) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);
