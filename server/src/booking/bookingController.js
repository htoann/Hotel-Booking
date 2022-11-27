import { createError } from "../utils/createMessage";
import Booking from "./bookingModel";

export default {
  booking: async (req, res) => {
    try {
      const booking = await Booking.create({ user: req.user, ...req.body });

      res.status(201).json(booking);
    } catch (err) {
      return createError(res, 404, err || "No document found with that id");
    }
  },

  getAllBooking: async (req, res) => {
    try {
      const booking = await Booking.find({ user: req.user });
      res.status(201).json(booking);
    } catch (err) {
      return createError(res, 404, err || "No document found with that id");
    }
  },

  deleteBooking: async (req, res) => {
    try {
      const booking = await Booking.deleteOne({ user: req.user });

      res.status(201).json(booking);
    } catch (err) {
      return createError(res, 404, err || "No document found with that id");
    }
  },
};
