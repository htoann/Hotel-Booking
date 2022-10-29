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
    const lmao = [];
    try {
      const list = await Promise.all(
        cities.map((city) => {
          console.log(Hotel.countDocuments({ city: city }));
          return lmao.push({
            city,
          });
        })
      );

      console.log(lmao);

      res.status(200).json(lmao);
    } catch (err) {
      next(err);
    }
  },

  countByType: async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "Apartment" });
      const resortCount = await Hotel.countDocuments({ type: "Resort" });
      const villaCount = await Hotel.countDocuments({ type: "Villa" });
      const cabinCount = await Hotel.countDocuments({ type: "Cabin" });

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
