import { getProducts } from "./product.service";
import { take } from "rxjs/operators";
import { BaseBloc } from "../core";

// Product Business Logic Object Component
const PRODUCT_FETCH = "PRODUCT_FETCH";
const PRODUCT_RESPONSE = "PRODUCT_RESPONSE";

class ProductExtendedBloc extends BaseBloc {
  // internal state
  state = {
    loading: false,
    products: []
  };

  initActions() {
    this.createAction(
      PRODUCT_FETCH,
      page => {
        getProducts(page)
          .pipe(take(1))
          .subscribe(this.actions.setProducts);
        return { ...this.state, loading: true };
      },
      "fetchProducts"
    );

    this.createAction(
      PRODUCT_RESPONSE,
      payload => {
        return { ...this.state, products: payload, loading: false };
      },
      "setProducts"
    );
  }

  // state selectors
  selectProducts = state => state.products;
  selectIsLoading = state => state.loading;
}

export default new ProductExtendedBloc(null, null, "products");
