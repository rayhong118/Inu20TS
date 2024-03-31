import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
ReactDOM.render(
  <FluentProvider theme={webLightTheme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FluentProvider>,
  document.getElementById("root")
);
