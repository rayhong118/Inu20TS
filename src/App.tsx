import React from "react";
import "./App.scss";
import { BrowserRouter, Switch } from "react-router-dom";
import { useContext } from "react";
import { AppContext, Context } from "./shared/Context";

const App: React.FC = () => {
  const context: AppContext = useContext(Context);

  return (
    <BrowserRouter>
      <div className="app">
        <Switch></Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
