import { IRental } from "../../sections/pages/Home/components/RentalList/index";
import { ManageActionsType } from "../actions/manageActions";
import { RentalsActionsType } from "../actions/rentalActions";

type ManageStateType = {
  rentals: IRental[];
  bookings: any[];
  receivedBookings: any[];
};

const initialState: ManageStateType = {
  rentals: [],
  bookings: [],
  receivedBookings: [],
};

export const manageReducer = (
  state = initialState as ManageStateType,
  action: ManageActionsType | RentalsActionsType
): ManageStateType => {
  switch (action.type) {
    case "SET_MANAGE_RENTALS":
      return { ...state, rentals: action.payload };
    case "SET_MANAGE_BOOKINGS":
      return { ...state, bookings: action.payload };
    case "DELETE_MANAGE_BOOKING":
      return {
        ...state,
        bookings: state.bookings.filter(
          (item) => item._id !== action.payload.bookingId
        ),
      };
    case "SET_MANAGE_BOOKINGS_RECEIVED":
      return { ...state, receivedBookings: action.payload };
    case "DELETE_RENTAL":
      return {
        ...state,
        rentals: state.rentals.filter(
          (item) => item._id !== action.payload.rentalId
        ),
      };
    default:
      return state;
  }
};
