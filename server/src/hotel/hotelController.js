import Room from "../room/roomModel";
import APIFeatures from "../utils/apiFeatures";
import { createError, createMessage } from "../utils/createMessage";
import Hotel from "./hotelModel";
const base = require("../utils/baseController");

export default {
  createHotel: async (req, res) => {
    try {
      const hotel = await Hotel.create({ user: req.user, ...req.body });
      res.status(201).json(hotel);
    } catch (error) {
      return createError(res, 404, error || "Something went wrong");
    }
  },

  updateHotel: async (req, res) => {
    try {
      const doc = await Hotel.findOneAndUpdate(
        { user: req.user.id },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!doc) return createError(res, 404, "You are not allowed");

      return createMessage(res, 200, "Updated successfully");
    } catch (error) {
      return createError(res, 404, error || "No document found with that id");
    }
  },

  deleteHotel: async (req, res) => {
    try {
      const doc = await Hotel.findOneAndDelete({ user: req.user.id });

      if (!doc) return createError(res, 404, "You are not allowed");

      return createMessage(res, 200, "Deleted successfully");
    } catch (error) {
      return createError(res, 404, error || "No document found with that id");
    }
  },

  getHotel: base.getOne(Hotel),

  getAllHotels: async (req, res, next) => {
    const { min, max, ...ortherQuery } = req.query;

    try {
      const features = new APIFeatures(
        Hotel.find({
          ...ortherQuery,
          cheapestPrice: {
            $gt: min || 1,
            $lt: max || 999999,
          },
        }),
        req.query
      )
        .sort()
        .paginate();

      const doc = await features.query;

      res.status(200).json(doc);
    } catch (error) {
      next(error);
    }
  },

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
      return createError(res, 404, err || "No document found with that id");
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
