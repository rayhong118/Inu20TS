import React from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { authenticationPage } from "./Authentication/AuthenticationPage";
import { NavigationComponent } from "./Navigation/Navigation";
import { Home } from "./Home/Home";

// function Layout() {
//   return (
//     <>
//       <header>
//         <NavigationComponent />
//       </header>
//       <main>
//         <Outlet />
//       </main>
//     </>
//   );
// }

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
  //return <RouterProvider router={router} />;
};

export default App;
