import React, { useEffect } from "react";
import productsExtendedBloc from "../products.extended.bloc";

export default function ProductsExtended() {
  // trigger bloc async state mutation
  useEffect(() => {
    productsExtendedBloc.actions.fetchProducts(0);
  }, []);

  // get latest products from bloc state as hook state
  const products = productsExtendedBloc.useBloc(productsExtendedBloc.selectProducts, []);
  const isLoading = productsExtendedBloc.useBloc(productsExtendedBloc.selectIsLoading, false);

  // useEffect(() => {
  //   console.log('render', products)
  // }, [products, isLoading]);
  
  return (
    <div>
      <p>Products</p>
      {isLoading && <h2>LOADING...</h2>}
      {!isLoading &&
        products && products.map(product => (
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
