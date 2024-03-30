import { createContext } from "react";

export interface AppContext {
  temp: string;
}

const initialContext: AppContext = {
  temp: "",
};

export const Context = createContext(initialContext);
