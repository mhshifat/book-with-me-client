import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { AppActionsType } from "./actions/index";
import reducers from "./reducers";

export type AppStateType = ReturnType<typeof reducers>;

const middlewares = [thunk as ThunkMiddleware<AppStateType, AppActionsType>];

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);
