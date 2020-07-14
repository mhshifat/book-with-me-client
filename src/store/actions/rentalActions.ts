import { Dispatch } from "redux";
import { Rental } from "../../api/rentals";
import { IRental } from "../../sections/pages/Home/components/RentalList/index";
import { AppActionsType } from "./index";
const SET_RENTALS = "SET_RENTALS";
const SET_RENTAL = "SET_RENTAL";
const DELETE_RENTAL = "DELETE_RENTAL";

interface ISetRentalsAction {
  type: typeof SET_RENTALS;
  payload: IRental[];
}

interface ISetRentalAction {
  type: typeof SET_RENTAL;
  payload: IRental | null;
}

interface IDeleteRentalAction {
  type: typeof DELETE_RENTAL;
  payload: {
    rentalId: string;
  };
}

export type RentalsActionsType =
  | ISetRentalsAction
  | ISetRentalAction
  | IDeleteRentalAction;

const setRentals = (rentals: IRental[]): AppActionsType => ({
  type: SET_RENTALS,
  payload: rentals,
});

const setRental = (rental: IRental | null): AppActionsType => ({
  type: SET_RENTAL,
  payload: rental,
});

const deleteRental = (rentalId: string): AppActionsType => ({
  type: DELETE_RENTAL,
  payload: {
    rentalId,
  },
});

export const setRentalsAction = (location?: string) => async (
  dispatch: Dispatch
) => dispatch(setRentals(await Rental.getRentals(location)));

export const setRentalAction = (rentalId: string | null) => async (
  dispatch: Dispatch
) =>
  dispatch(setRental(rentalId ? await Rental.getRentalById(rentalId) : null));

export const deleteRentalAction = (rentalId: string) => async (
  dispatch: Dispatch
) => dispatch(deleteRental(rentalId));
