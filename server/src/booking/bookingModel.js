import mongoose from "mongoose";
import moment from "moment";

const BookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    checkIn: Date,
    checkOut: Date,
    hotelId: { type: mongoose.Schema.ObjectId, ref: "Hotel" },
    roomId: { type: mongoose.Schema.ObjectId, ref: "Room" },
    price: Number,
    quantity: Number,
  },
  {
    timestamps: true,
  }
);

BookingSchema.pre("save", function (next) {
  const Booking = mongoose.model("Booking", BookingSchema);

  let newCheckIn = this.checkIn.getTime();
  let newCheckOut = this.checkOut.getTime();

  // Function to check for booking clash
  let clashesWithExisting = (
    existingCheckIn,
    existingCheckOut,
    newCheckIn,
    newCheckOut
  ) => {
    if (
      (newCheckIn >= existingCheckIn && newCheckIn <= existingCheckOut) ||
      (existingCheckIn >= newCheckIn && existingCheckIn <= newCheckOut)
    ) {
      return next(
        `Room was booked from ${moment(existingCheckIn).format(
          "LLL"
        )} to ${moment(existingCheckOut).format("ll")}`
      );
    }
    return false;
  };

  return Booking.find().then((bookings) => {
    bookings.every((booking) => {
      let existingCheckIn = new Date(booking.checkIn).getTime();
      let existingCheckOut = new Date(booking.checkOut).getTime();
      return !clashesWithExisting(
        existingCheckIn,
        existingCheckOut,
        newCheckIn,
        newCheckOut
      );
    });
  });
});

export default mongoose.model("Booking", BookingSchema);
