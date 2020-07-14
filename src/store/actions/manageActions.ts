import { Dispatch } from "redux";
import { Rental } from "../../api/rentals";
import { IRental } from "../../sections/pages/Home/components/RentalList/index";
import { AppActionsType } from "./index";
const SET_MANAGE_RENTALS = "SET_MANAGE_RENTALS";
const SET_MANAGE_BOOKINGS = "SET_MANAGE_BOOKINGS";
const DELETE_MANAGE_BOOKING = "DELETE_MANAGE_BOOKING";
const SET_MANAGE_BOOKINGS_RECEIVED = "SET_MANAGE_BOOKINGS_RECEIVED";

interface IManageSetRentalsAction {
  type: typeof SET_MANAGE_RENTALS;
  payload: IRental[];
}

interface IManageSetBookingsAction {
  type: typeof SET_MANAGE_BOOKINGS;
  payload: any[];
}

interface IDeleteManageBookingAction {
  type: typeof DELETE_MANAGE_BOOKING;
  payload: {
    bookingId: string;
  };
}

interface IManageSetBookingsReceivedAction {
  type: typeof SET_MANAGE_BOOKINGS_RECEIVED;
  payload: any[];
}

export type ManageActionsType =
  | IManageSetRentalsAction
  | IManageSetBookingsAction
  | IManageSetBookingsReceivedAction
  | IDeleteManageBookingAction;

const setManageRentals = (rentals: IRental[]): AppActionsType => ({
  type: SET_MANAGE_RENTALS,
  payload: rentals,
});

const setManageBookings = (bookings: any[]): AppActionsType => ({
  type: SET_MANAGE_BOOKINGS,
  payload: bookings,
});

const deleteManageBooking = (bookingId: string): AppActionsType => ({
  type: DELETE_MANAGE_BOOKING,
  payload: {
    bookingId,
  },
});

const setManageBookingsReceived = (bookings: any[]): AppActionsType => ({
  type: SET_MANAGE_BOOKINGS_RECEIVED,
  payload: bookings,
});

export const setManageRentalsAction = () => async (dispatch: Dispatch) =>
  dispatch(setManageRentals(await Rental.getUserRentals()));

export const setManageBookingsAction = () => async (dispatch: Dispatch) =>
  dispatch(setManageBookings(await Rental.getUserBookings()));

export const deleteManageBookingAction = (bookingId: string) => async (
  dispatch: Dispatch
) => dispatch(deleteManageBooking(bookingId));

export const setManageBookingsReceivedAction = () => async (
  dispatch: Dispatch
) =>
  dispatch(setManageBookingsReceived(await Rental.getUserReceivedBookings()));
