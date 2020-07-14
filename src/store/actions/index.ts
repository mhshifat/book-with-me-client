import { AuthActionsType } from "./authActions";
import { ManageActionsType } from "./manageActions";
import { RentalsActionsType } from "./rentalActions";

export type AppActionsType =
  | RentalsActionsType
  | AuthActionsType
  | ManageActionsType;
