import Room from "./roomModel";
import Hotel from "../hotel/hotelModel";
import {createError, createMessage} from "../utils/createMessage";

const base = require("../utils/baseController");

export default {
  createRoom: async (req, res) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
      const doc = await Hotel.findOne({
        hotelId,
        user: req.user.id,
      });

      if (!doc) {
        return createError(res, 404, "You are not allowed");
      }

      const savedRoom = await newRoom.save();
      await Room.updateCheapestPrice(hotelId);

      await Hotel.findByIdAndUpdate(hotelId, {
        $push: {rooms: savedRoom._id},
      });

      res.status(200).json(savedRoom);
    } catch (err) {
      return createError(res, 404, err || "No document found with that id");
    }
  },

  updateRoom: async (req, res) => {
    const roomId = req.params.id;
    try {
      const doc = await Room.findByIdAndUpdate(roomId, req.body, {
        new: true,
        runValidators: true,
      });

      if (!doc) {
        return createError(res, 404, "No document found with that id");
      }

      const hotel = await Hotel.findOne({rooms: {$in: roomId}});
      const hotelId = hotel._id;

      await Room.updateCheapestPrice(hotelId);

      res.status(200).json(doc);
    } catch (error) {
      return createError(res, 404, error || "No document found with that id");
    }
  },

  deleteRoom: async (req, res) => {
    // const hotelId = req.params.hotelid;
    try {
      await Room.findByIdAndDelete(req.params.id);


      const hotel = await Hotel.findOne({rooms: {$in: req.params.id}});
      const hotelId = hotel._id;

      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: {rooms: req.params.id},
      });
      await Room.updateCheapestPrice(hotelId);

      return createMessage(res, 200, "Deleted successfully");
    } catch (err) {
      return createError(res, 404, err || "No document found with that id");
    }
  },

  getRoom: base.getOne(Room),

  getAllRooms: base.getAll(Room),

  extend: async (req, res) => {
    try {
      const randomNumer = Math.round(Math.random() * (6 - 1) + 1);
      const rooms = await Room.find().then((Rooms) => {
        Rooms.forEach((r) => {
          Room.updateOne(
            { _id: r._id },
            {
              $set: { quantity: randomNumer },
            }
          );
        });
      });

      return res.json(rooms);
    } catch (err) {
      console.log(err);
    }
  },
};
