import React from "react";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import NavComponent from "./shared/components/nav";
import { StateProvider } from "./shared/tools/state";
import {
  ACTION_CHANGE_THEME,
  LOCAL_STORAGE_THEME,
  THEME_DARK,
  THEME_LIGHT,
} from "./shared/constants/theme";

const App: React.FC = () => {
  const initState = {
    theme:
      localStorage.getItem(LOCAL_STORAGE_THEME) === THEME_DARK ? THEME_DARK : THEME_LIGHT,
  };

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case ACTION_CHANGE_THEME:
        localStorage.setItem(LOCAL_STORAGE_THEME, action.theme);
        return { ...state, theme: action.theme };
      default:
        return state;
    }
  };
  return (
    <StateProvider initialState={initState} reducer={reducer}>
      <div className="app">
        <BrowserRouter>
          <NavComponent />
        </BrowserRouter>
      </div>
    </StateProvider>
  );
};

export default App;
