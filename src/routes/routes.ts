import BookingsReceived from "../sections/pages/BookingsReceived";
import Home from "../sections/pages/Home/index";
import Login from "../sections/pages/Login";
import ManageBookings from "../sections/pages/ManageBookings";
import ManageRentals from "../sections/pages/ManageRentals";
import NewRental from "../sections/pages/NewRental";
import Register from "../sections/pages/Register";
import RentalDetails from "../sections/pages/RentalDetails";
import RentalEdit from "../sections/pages/RentalEdit";
import RentalSearch from "../sections/pages/RentalSearch";
import { IRoute } from "./index";

export const routes: IRoute[] = [
  {
    path: "/",
    types: "COMMON",
    component: Home,
  },
  {
    path: "/login",
    types: "PUBLIC",
    component: Login,
  },
  {
    path: "/register",
    types: "PUBLIC",
    component: Register,
  },
  {
    path: "/rentals/new",
    types: "PRIVATE",
    component: NewRental,
  },
  {
    path: "/rentals/manage",
    types: "PRIVATE",
    component: ManageRentals,
  },
  {
    path: "/bookings/manage",
    types: "PRIVATE",
    component: ManageBookings,
  },
  {
    path: "/bookings/received",
    types: "PRIVATE",
    component: BookingsReceived,
  },

  {
    path: "/rentals/:rentalId",
    types: "COMMON",
    component: RentalDetails,
  },
  {
    path: "/rentals/:rentalId/edit",
    types: "PRIVATE",
    component: RentalEdit,
  },
  {
    path: "/rentals/:location/homes",
    types: "COMMON",
    component: RentalSearch,
  },
];
