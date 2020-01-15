import { BehaviorSubject, Subject } from "rxjs";
import { useState, useEffect } from "react";
import { tag } from "rxjs-spy/operators";
import { map, takeUntil } from "rxjs/operators";

// Product Business Logic Object Component
export default class BaseBloc {
  actions = {};
  // internal state
  state = {};

  constructor(sink = null, stream = null, name = "bloc") {
    this.unsubscribe$ = new Subject();
    this.sink = sink || new Subject();
    this.stream =
      stream ||
      new BehaviorSubject(this.state).pipe(
        // rxjs debug
        tag(`${name}.bloc`)
      );

    this.initActions();
    this.sink.pipe(takeUntil(this.unsubscribe$)).subscribe(action => {
      if (action && action.type && this.actions[action.type]) {
        this.state = this.actions[action.type](action.payload);
        this.stream.next(this.state);
      }
    });
  }

  // override in child classes
  initActions() {}

  destroy = () => {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  };

  /**
   * @param action string       string in UPPER_CASE
   * @param action function     function reference with payload as
   *                            argument that always returns a state
   * @param mmethodName string  name for the method to trigger this action
   */
  createAction = (action, reducer, methodName) => {
    this.actions[action] = reducer;
    this.actions[methodName] = payload => {
      this.sink.next({
        type: action,
        payload
      });
    };
  };

  // hook version
  useBloc = (selector, initialValue = null) => {
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
