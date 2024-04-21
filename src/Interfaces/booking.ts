export interface IBooking {
  firstName: string;
  lastName: string;
  email: string;
  seatNumber: string;
  dateOfBooking: string;
  deck: string;
}
export type BookingUpdateData = Partial<Omit<IBooking, "seatNumber" | "deck">>;
