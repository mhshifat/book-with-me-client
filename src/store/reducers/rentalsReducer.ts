import { IRental } from "../../sections/pages/Home/components/RentalList/index";
import { RentalsActionsType } from "../actions/rentalActions";

type RentalStateType = {
  data: IRental[];
  item: IRental | null;
};

const initialState: RentalStateType = {
  data: [],
  item: null,
};

export const rentalReducer = (
  state = initialState as RentalStateType,
  action: RentalsActionsType
): RentalStateType => {
  switch (action.type) {
    case "SET_RENTALS":
      return { ...state, data: action.payload };
    case "SET_RENTAL":
      return { ...state, item: action.payload };
    case "DELETE_RENTAL":
      return {
        ...state,
        data: state.data.filter((item) => item._id !== action.payload.rentalId),
      };
    default:
      return state;
  }
};
