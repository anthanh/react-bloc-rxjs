import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/">products</Link>
      <Link to="/checkout">checkout</Link>
    </header>
  );
}
