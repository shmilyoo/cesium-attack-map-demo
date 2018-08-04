import React from "react";
import ReactDOM from "react-dom";
// import {ReactDOM} from './vendors'
import "./index.css";
import App from "./App";
// import "cesium/Source/Widgets/widgets.css";
// import buildModuleUrl from "cesium/Source/Core/buildModuleUrl";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";

// buildModuleUrl.setBaseUrl("./cesium/");

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
if (process.env.NODE_ENV === "development") registerServiceWorker();
