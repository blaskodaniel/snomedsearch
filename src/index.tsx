import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import "./assets/style/index.css";
import Routing from "./components/Routing/Routing";
import * as serviceWorker from "./serviceWorker";
import { createBrowserHistory } from "history";
export const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Routing />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
