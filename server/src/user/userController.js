import { createError, createMessage } from "../utils/createMessage";
import User from "./userModel";
import bcrypt from "bcrypt-nodejs";
import Hotel from "../hotel/hotelModel";
// import Room from "../room/roomModel";

const base = require("../utils/baseController");

export default {
  getUser: async (req, res) => {
    if (req.params.id !== req.user.id) {
      return createError(res, 403, "You are not allow");
    }
    try {
      const user = await User.findById(req.params.id);

      const { password, ...info } = user._doc;

      res.status(200).json({ ...info });
    } catch (err) {
      return createError(res, 404, err || "No user found with that id");
    }
  },

  getAllUsers: base.getAll(User),

  updateUser: base.updateOne(User),

  deleteUser: base.deleteOne(User),

  addWishlist: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: {
          wishlist: req.body.id,
        },
      });

      return createMessage(res, 200, "Saved to wish list");
    } catch (err) {
      return createError(res, 404, err || "No user found with that id");
    }
  },

  deleteWishlist: async (req, res) => {
    try {
      await User.findByIdAndUpdate(
        { _id: req.user.id },
        {
          $pull: { wishlist: req.body.id },
        }
      );
      return createMessage(res, 200, "Removed from wish list");
    } catch (err) {
      return createError(res, 404, err || "No user found with that id");
    }
  },

  resetPassword: async (req, res) => {
    const { password, newPassword } = req.body;

    try {
      if (password === newPassword) {
        return createError(res, 400, "Password and new password are the same");
      }

      const isValidPassword = bcrypt.compareSync(password, req.user.password);
      if (!isValidPassword) {
        return createError(res, 400, "Please enter correct password");
      }

      const salt = bcrypt.genSaltSync(10);
      const newPasswordHash = bcrypt.hashSync(newPassword, salt);

      await User.findByIdAndUpdate(
        { _id: req.user.id },
        {
          password: newPasswordHash,
        }
      );

      return createMessage(res, 200, "Change password successfully");
    } catch (err) {
      console.log(err);
      return createError(res, 404, err || "Something went wrong");
    }
  },

  createHotel: async (req, res) => {
    try {
      const hotel = await Hotel.create({ user: req.user, ...req.body });
      res.status(201).json(hotel);
    } catch (error) {
      return createError(res, 404, error || "Something went wrong");
    }
  },

  createRoom: async (req, res, next) => {
    // const newRoom = new Room(req.body);

    try {
      // const savedRoom = await newRoom.save();
      // try {
      //   await Hotel.findOneAndUpdate(
      //     { user: req.user.id },
      //     {
      //       $push: { rooms: savedRoom._id },
      //     }
      //   );
      // } catch (err) {
      //   return createError(res, 404, err || "No document found with that id");
      // }
      // res.status(200).json(savedRoom);
    } catch (err) {
      next(err);
    }
  },

  deleteHotel: async (req, res) => {
    try {
      const doc = await Hotel.findOneAndDelete({ user: req.user.id });

      if (!doc) {
        return createError(res, 404, "You are not allow");
      }

      return createMessage(res, 200, "Deleted successfully");
    } catch (error) {
      return createError(res, 404, error || "No hotel found with that id");
    }
  },
};
