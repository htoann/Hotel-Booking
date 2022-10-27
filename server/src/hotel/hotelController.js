import Room from "../room/roomModel";
import Hotel from "./hotelModel";
const base = require("../utils/baseController");

export default {
  createHotel: base.createOne(Hotel),

  updateHotel: base.updateOne(Hotel),

  deleteHotel: base.deleteOne(Hotel),

  getHotel: base.getOne(Hotel),

  getAllHotels: base.getAll(Hotel),

  getHotelRooms: async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  },
};
