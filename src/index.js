import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { create } from "rxjs-spy";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// rxjs debugger
const spy = create();
spy.log("products.bloc");
spy.log("router.bloc");

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register(ch) below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
