import Room from "./roomModel";
import Hotel from "../hotel/hotelModel";
const base = require("../utils/baseController");

export default {
  createRoom: async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
      const savedRoom = await newRoom.save();
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $push: { rooms: savedRoom._id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json(savedRoom);
    } catch (err) {
      next(err);
    }
  },

  updateRoom: base.updateOne(Room),

  deleteRoom: async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
      await Room.findByIdAndDelete(req.params.id);
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $pull: { rooms: req.params.id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json("Room has been deleted.");
    } catch (err) {
      next(err);
    }
  },

  getRoom: base.getOne(Room),

  getAllRooms: base.getAll(Room),
};