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

  countByCity: async (req, res, next) => {
    const cities = req.query.city.split(",");
    const list = [];
    try {
      await Promise.all(
        cities.map(async (city) => {
          const count = await Hotel.countDocuments({ city: city });
          list.push({
            city: city,
            count: count,
          });
        })
      );

      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  },

  countByType: async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotels" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartments" });
      const resortCount = await Hotel.countDocuments({ type: "resorts" });
      const villaCount = await Hotel.countDocuments({ type: "villas" });
      const cabinCount = await Hotel.countDocuments({ type: "cabins" });

      res.status(200).json([
        { type: "Hotels", count: hotelCount },
        { type: "Apartments", count: apartmentCount },
        { type: "Resorts", count: resortCount },
        { type: "Villas", count: villaCount },
        { type: "Cabins", count: cabinCount },
      ]);
    } catch (err) {
      next(err);
    }
  },
};
