import { setup } from "goober";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

setup(React.createElement);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
