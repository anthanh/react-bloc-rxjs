import React, { memo } from "react";
import { Switch, Route } from "react-router-dom";
// import './App.css';
import { routerBloc } from "./modules/core";
import { Header } from "./modules/layout";
import { ProductsExtended as Products } from "./modules/products";
// import { Products } from "./modules/products";
import { Checkout } from "./modules/checkout";
import { Basket } from "./modules/basket";

const App = memo(() => {
  routerBloc.initListener();

  return (
    <div className="app">
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
    </div>
  );
});

export default App;
