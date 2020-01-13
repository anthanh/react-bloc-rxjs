import React, { useEffect } from "react";
import productsBloc from "../products.bloc";

export default function Products() {
  // trigger bloc async state mutation
  useEffect(() => {
    productsBloc.fetchProducts(0);
  }, []);

  // get latest products from bloc state as hook state
  const products = productsBloc.useProductsBloc(productsBloc.selectProducts, []);
  const isLoading = productsBloc.useProductsBloc(productsBloc.selectIsLoading, false);

  return (
    <div>
      <p>Products</p>
      {isLoading && <h2>LOADING...</h2>}
      {!isLoading &&
        products.map(product => (
          <div key={product.id}>
            <p>
              Name: <span>{product.name}</span>
            </p>
            <p>
              Price: <span>{product.price}</span>
            </p>
          </div>
        ))}
    </div>
  );
}
