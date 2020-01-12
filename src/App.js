import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import './App.css';
import { Header } from "./modules/layout";
import { Products } from "./modules/products";
import { Checkout } from "./modules/checkout";
import { Basket } from "./modules/basket";

function App() {
  return (
    <div className="app">
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/">
            <Products />
          </Route>
        </Switch>
        <Basket></Basket>
      </Router>
    </div>
  );
}

export default App;
