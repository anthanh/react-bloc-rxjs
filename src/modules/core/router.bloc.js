import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import BaseBloc from "./base.bloc";

const ROUTER_CHANGE = "ROUTER_CHANGE";

// Product Business Logic Object Component
class RouterBloc extends BaseBloc {
  // internal state
  state = {
    location: window.location
  };

  initListener() {
    const history = useHistory();
    useEffect(() => {
      return history.listen(this.actions.setLocation);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  }

  initActions() {
    this.createAction(
      ROUTER_CHANGE,
      location => {
        return { ...this.state, location };
      },
      "setLocation"
    );
  }

  selectLocation = state => state && state.location;
}

export default new RouterBloc(null, null, "router");
