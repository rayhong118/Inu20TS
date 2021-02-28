import React from "react";
import "./App.scss";
import { BrowserRouter, Route } from "react-router-dom";

import { StateProvider } from "./shared/tools/state";
import {
  ACTION_CHANGE_THEME,
  LOCAL_STORAGE_THEME,
  THEME_DARK,
  THEME_LIGHT,
} from "./shared/constants/theme";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import NavComponent from "./shared/components/nav";
import HomePageComponent from "./pages/home";
import AuthPageComponent from "./pages/auth";
import ChatPageComponent from "./pages/chat";

import { firebaseApiKey } from "./keys.json";
import { ROUTES } from "./shared/constants/routes";
import Alert from "./shared/components/alert";

const config = {
  apiKey: firebaseApiKey,
  authDomain: "dogheadportal.firebaseapp.com",
  databaseURL: "https://dogheadportal.firebaseio.com",
  projectId: "dogheadportal",
  storageBucket: "dogheadportal.appspot.com",
  messagingSenderId: "978501106081",
  appId: "1:978501106081:web:6630866d2d7dc22408b3e0",
};
firebase.initializeApp(config);

const App: React.FC = () => {
  const initState = {
    theme:
      localStorage.getItem(LOCAL_STORAGE_THEME) === THEME_DARK
        ? THEME_DARK
        : THEME_LIGHT,
  };

  const appReducer = (state: any, action: any) => {
    switch (action.type) {
      case ACTION_CHANGE_THEME:
        localStorage.setItem(LOCAL_STORAGE_THEME, action.theme);
        return { ...state, theme: action.theme };
      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initState} reducer={appReducer}>
      <BrowserRouter>
        <div className="app">
          <NavComponent />

          <Route path="/" exact component={HomePageComponent} />
          <Route path={ROUTES.HOME} exact component={HomePageComponent} />
          <Route path={ROUTES.AUTH} component={AuthPageComponent} />
          <Route path={ROUTES.CHAT} component={ChatPageComponent} />
          <Alert />
        </div>
      </BrowserRouter>
    </StateProvider>
  );
};

export { firebase };
export default App;
