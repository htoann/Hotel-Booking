import Room from "../room/roomModel";
import {createError, createMessage} from "../utils/createMessage";
import Hotel from "./hotelModel";

const base = require("../utils/baseController");

export default {
    createHotel: async (req, res) => {
        try {
            const hotel = await Hotel.create(
                {
                    user: req.user,
                    ...req.body
                }
            );
            res.status(201).json(hotel);
        } catch (error) {
            return createError(res, 404, error || "Something went wrong");
        }
    },

    updateHotel: async (req, res) => {
        try {
            const doc = await Hotel.findOneAndUpdate(
                {
                    _id: req.params.id,
                    user: req.user.id
                },
                req.body
            );
            if (!doc) return createError(res, 404, "You are not allowed");

            return createMessage(res, 200, "Updated successfully");
        } catch (error) {
            return createError(res, 404, error.message || "No document found with that id");
        }
    },

    deleteHotel: async (req, res) => {
        try {
            const doc = await Hotel.findOneAndDelete(
                {
                    _id: req.params.id,
                    user: req.user.id
                }
            );

            if (!doc) return createError(res, 404, "You are not allowed");

            return createMessage(res, 200, "Deleted successfully");
        } catch (error) {
            return createError(res, 404, error.message || "No document found with that id");
        }
    },

    getHotel: base.getOne(Hotel),

    getAllHotel: async (req, res, next) => {
        try {
            const {min, max, city, limit} = req.query;
            let regexCity = new RegExp(city, "i")
            let query = {
                published: true,
                city: regexCity,
                cheapestPrice: {
                    $gt: min || 1,
                    $lt: max || 999999,
                },
            }
            const doc = await Hotel.find(query).limit(limit)
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
    getHotelsByUser: async (req, res, next) => {
        try {
            const doc = await Hotel.find({user: req.user})
            res.status(200).json(doc);
        } catch (error) {
            next(error);
        }
    }
};
