import { Dispatch } from "redux";
import { AppActionsType } from "./index";
const SET_AUTH_STATE = "SET_AUTH_STATE";

interface ISetAuthStateAction {
  type: typeof SET_AUTH_STATE;
  payload: { isAuth: boolean; userId: string };
}

export type AuthActionsType = ISetAuthStateAction;

const setAuthState = (isAuth: boolean, userId: string): AppActionsType => ({
  type: SET_AUTH_STATE,
  payload: { isAuth, userId },
});

export const setAuthStateAction = (isAuth: boolean, userId: string) => async (
  dispatch: Dispatch
) => dispatch(setAuthState(isAuth, userId));
