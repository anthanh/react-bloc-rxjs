import { BehaviorSubject, Subject } from "rxjs";
import { getProducts } from "./product.service";
import { useState, useEffect } from "react";
import { tag } from "rxjs-spy/operators";
import { map, take, takeUntil } from "rxjs/operators";

// Product Business Logic Object Component
class ProductBloc {
  // internal state
  state = {
    loading: false,
    products: []
  };

  stream = new BehaviorSubject(this.state).pipe(
    // rxjs debug
    tag("products.bloc.state")
  );

  destroy() {
    this.stream.unsubscribe();
  }

  // only setters can update state an trigger changes
  setProducts = products => {
    this.state.products = [...products];
    this.state.loading = false;
    this.stream.next(this.state);
  };

  // async state mutations
  fetchProducts = page => {
    this.state.loading = true;
    this.stream.next(this.state);
    return getProducts(0)
      .pipe(take(1))
      .subscribe(this.setProducts);
  };

  // state selectors
  selectProducts = state => state.products;
  selectIsLoading = state => state.loading;

  // hook version
  useProductsBloc = (selector, initialValue = null) => {
    const unsubscribe$ = new Subject();
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      this.stream
        .pipe(map(selector), takeUntil(unsubscribe$))
        .subscribe(setValue);
      return () => {
        unsubscribe$.next();
        unsubscribe$.complete();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return value;
  };
}

export default new ProductBloc();
