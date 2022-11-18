import { createError, createMessage } from "../utils/createMessage";
import User from "./userModel";
const base = require("../utils/baseController");

export default {
  getUser: base.getOne(User),

  getCurrentUser: async (req, res, next) => {
    try {
      const user = req.user;

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  getAllUsers: base.getAll(User),

  updateUser: base.updateOne(User),

  deleteUser: base.deleteOne(User),

  addWishlist: async (req, res) => {
    try {
      await User.updateOne(
        { _id: req.user.id },
        {
          $addToSet: {
            wishlist: req.body.id,
          },
        }
      );

      return createMessage(res, 200, "Saved to wish list");
    } catch (err) {
      return createError(res, 404, err || "No document found with that id");
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
      return createError(res, 404, err || "No document found with that id");
    }
  },
};
