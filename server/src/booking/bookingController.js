import { createError, createMessage } from "../utils/createMessage";
import Booking from "./bookingModel";
import Room from "../room/roomModel";

export default {
  booking: async (req, res) => {
    try {
      const booking = await Booking.create({ user: req.user, ...req.body });
      const roomId = booking.roomId;

      await Room.findByIdAndUpdate(roomId, {
        $inc: { quantity: -booking.quantity },
      });

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
      const bookingPrev = await Booking.findOne({
        _id: req.params.id,
        user: req.user,
      });
      const quantity = bookingPrev.quantity;
      const roomId = bookingPrev.roomId;

      await Booking.deleteOne({
        _id: req.params.id,
        user: req.user,
      });

      await Room.findByIdAndUpdate(roomId, {
        $inc: { quantity: quantity },
      });

      return createMessage(res, 200, "Deleted booking successfully");
    } catch (err) {
      return createError(res, 404, err || "No document found with that id");
    }
  },
};
