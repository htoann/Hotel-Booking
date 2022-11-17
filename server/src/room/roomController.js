import Room from "./roomModel";
import Hotel from "../hotel/hotelModel";
import {createError, createMessage} from "../utils/createMessage";

const base = require("../utils/baseController");

export default {
    createRoom: async (req, res, next) => {
        const hotelId = req.params.hotelid;
        const newRoom = new Room(req.body);

        try {
            const savedRoom = await newRoom.save();
            try {
                await Hotel.findByIdAndUpdate(hotelId, {
                    $push: {rooms: savedRoom._id},
                });
            } catch (err) {
                return createError(
                  res,
                  404,
                  err || "No document found with that id"
                );
            }
            res.status(200).json(savedRoom);
        } catch (err) {
            next(err);
        }
    },

    updateRoom: base.updateOne(Room),

    updateRoomAvailability: async (req, res, next) => {
        try {
            await Room.updateOne(
                {"roomNumbers._id": req.params.id},
                {
                    $push: {
                        "roomNumbers.$.unavailableDates": req.body.dates,
                    },
                }
            );

            return createMessage(res, 200, "Updated successfully");
        } catch (err) {
            return createError(res, 404, err || "No document found with that id");
        }
    },

    deleteRoom: async (req, res, next) => {
        const hotelId = req.params.hotelid;
        try {
            await Room.findByIdAndDelete(req.params.id);
            try {
                await Hotel.findByIdAndUpdate(hotelId, {
                    $pull: { rooms: req.params.id },
                });
            } catch (err) {
                return createError(res, 404, "No document found with that id");
            }
            return createMessage(res, 200, "Deleted successfully");
        } catch (err) {
            return createError(res, 404, err || "No document found with that id");
        }
    },

    getRoom: base.getOne(Room),

    getAllRooms: base.getAll(Room),
};
