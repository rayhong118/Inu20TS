import React from "react";
import "./App.scss";
import { BrowserRouter, Route } from "react-router-dom";
import NavComponent from "./shared/components/nav";
import { StateProvider } from "./shared/tools/state";
import {
  ACTION_CHANGE_THEME,
  LOCAL_STORAGE_THEME,
  THEME_DARK,
  THEME_LIGHT,
} from "./shared/constants/theme";
import firebase from "firebase/app";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatPage from "./pages/chat";
import HomePage from "./pages/home";
import AuthPage from "./pages/auth";

firebase.initializeApp({
  apiKey: "AIzaSyCvYtk0l6XcXLfr7xVhAtN-W8yw0PLTNaA",
  authDomain: "dogheadportal.firebaseapp.com",
  databaseURL: "https://dogheadportal.firebaseio.com",
  projectId: "dogheadportal",
  storageBucket: "dogheadportal.appspot.com",
  messagingSenderId: "978501106081",
  appId: "1:978501106081:web:2a161377b5922e7b08b3e0",
});

const App: React.FC = () => {
  const initState = {
    theme:
      localStorage.getItem(LOCAL_STORAGE_THEME) === THEME_DARK ? THEME_DARK : THEME_LIGHT,
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
      <div className="app">
        <BrowserRouter>
          <NavComponent />
          <Route path="/" exact component={HomePage} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/chat" component={ChatPage} />
        </BrowserRouter>
      </div>
    </StateProvider>
  );
};

export default App;
