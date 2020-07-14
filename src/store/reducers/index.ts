import { combineReducers } from "redux";
import { authReducer } from "./authReducers";
import { manageReducer } from "./manageReducers";
import { rentalReducer } from "./rentalsReducer";

export default combineReducers({
  rentals: rentalReducer,
  auth: authReducer,
  manage: manageReducer,
});
