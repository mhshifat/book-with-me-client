import { AuthActionsType } from "../actions/authActions";

type AuthStateType = {
  isAuth: boolean;
  username: string;
  userId: string | null;
};

const initialState: AuthStateType = {
  isAuth: false,
  username: "Test",
  userId: null,
};

export const authReducer = (
  state = initialState as AuthStateType,
  action: AuthActionsType
): AuthStateType => {
  switch (action.type) {
    case "SET_AUTH_STATE":
      return {
        ...state,
        isAuth: action.payload.isAuth,
        userId: action.payload.userId,
      };
    default:
      return state;
  }
};
