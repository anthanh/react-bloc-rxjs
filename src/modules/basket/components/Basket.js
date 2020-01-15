import React from "react";
import { routerBloc } from "../../core";

export default function Basket() {
  const location = routerBloc.useBloc(routerBloc.selectLocation, null);
  return <p>Basket ({JSON.stringify(location)})</p>;
}
