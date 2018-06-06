import { Store, applyMiddleware, compose, createStore } from "redux";
import reduxThunk from "redux-thunk";
import { IState, state } from "./reducers";

export const store: Store<IState> = createStore(
    state,
    compose(applyMiddleware(reduxThunk))
);
