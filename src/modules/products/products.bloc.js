import { Subject } from "rxjs";
import { getProducts } from "./product.service";
import { useState, useEffect } from "react";
import { tag } from "rxjs-spy/operators";
import { map, take } from "rxjs/operators";

// Product Business Logic Object Component
class ProductBloc {
  // internal state
  state = {
    products: []
  };

  stream = new Subject().pipe(
    // rxjs debug
    tag("products.bloc.state")
  );

  dispose() {
    this.stream.unsubscribe();
  }

  // only setters can update state an trigger changes
  setProducts = products => {
    this.state.products = [...products];
    this.stream.next(this.state);
  };

  // async state mutations
  fetchProducts = page => {
    return getProducts(0)
      .pipe(take(1))
      .subscribe(this.setProducts);
  };

  // state selectors
  selectProducts = state => state.products;

  // hook version
  useProductsBloc = selector => {
    const [value, setValue] = useState([]);

    useEffect(() => {
      this.stream.pipe(map(selector)).subscribe(setValue);
      return () => {
        this.stream.unsubscribe();
      };
    }, []);
    return value;
  };
}

export default new ProductBloc();
