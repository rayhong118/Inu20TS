import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { authenticationPage } from "./Authentication/AuthenticationPage";
import { NavigationComponent } from "./Navigation/Navigation";
import { Home } from "./Home/Home";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <NavigationComponent />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/authentication" Component={authenticationPage} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
