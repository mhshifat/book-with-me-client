import { sendRequest } from "../helpers/index";
import { IRental } from "../sections/pages/Home/components/RentalList/index";

export const Rental = {
  getRentals: async (location?: string): Promise<IRental[]> =>
    (
      await sendRequest(
        "get",
        location ? `/rentals?city=${location}` : "/rentals"
      )
    ).rentals,
  getRentalById: async (rentalId: string | null): Promise<IRental> =>
    rentalId && (await sendRequest("get", `/rentals/${rentalId}`)).rental,
  createRental: async (rentalData: any) =>
    rentalData && (await sendRequest("post", "/rentals", rentalData)).rental,
  createBooking: async (bookingData: any) =>
    bookingData &&
    (await sendRequest("post", "/bookings", bookingData)).booking,
  getBookings: async (rentalId: string) =>
    (await sendRequest("get", `/bookings/${rentalId}`)).bookings,
  getUserRentals: async () => (await sendRequest("get", "/rentals/me")).rentals,
  getUserBookings: async () =>
    (await sendRequest("get", "/bookings/me")).bookings,
  getUserReceivedBookings: async () =>
    (await sendRequest("get", "/bookings/received")).bookings,
  deleteRental: async (rentalId: string) =>
    (await sendRequest("post", `/rentals/${rentalId}/delete`)).rental,
  deleteBooking: async (bookingId: string) =>
    (await sendRequest("post", `/bookings/${bookingId}/delete`)).booking,
  updateRental: async (rentalId: string, rentalData: any) =>
    (await sendRequest("post", `/rentals/${rentalId}/update`, rentalData))
      .rental,
  uploadImage: async (data: any) =>
    (await sendRequest("post", "/rentals/upload", data)).file,
};
