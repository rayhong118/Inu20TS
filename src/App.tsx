import React from "react";
import "./App.scss";
import {
  BrowserRouter,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import { useContext } from "react";
import { AppContext, Context } from "./shared/Context";
import { authenticationPage } from "./Authentication/AuthenticationPage";
import { NavigationComponent } from "./Navigation/Navigation";
import { Home } from "./Home/Home";

function Layout() {
  return (
    <>
      <header>
        <NavigationComponent />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" Component={Home} />
          <Route path="/authentication" Component={authenticationPage} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
  //return <RouterProvider router={router} />;
};

export default App;
