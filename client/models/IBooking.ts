export interface IBooking {
    user: string,
    hotelId: string;
    roomId: string,
    checkIn: Date,
    checkOut: Date,
    price: Number,
    quantity: Number
}