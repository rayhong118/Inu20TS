import { createContext } from "react";

export interface AuthenticationContext {
  currentUserName: string;
}

const authenticationContext: AuthenticationContext = {
  currentUserName: "doghead",
};

export const Context = createContext(authenticationContext);
