import { createError, createMessage } from "../utils/createMessage";
import User from "./userModel";
const base = require("../utils/baseController");

export default {
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      const { password, ...info } = user._doc;

      res.status(200).json({ ...info });
    } catch (err) {
      return createError(res, 404, err || "No document found with that id");
    }
  },

  getCurrentUser: async (req, res, next) => {
    try {
      const user = req.user;

      const { password, ...info } = user._doc;

      res.status(200).json({ ...info });
    } catch (error) {
      next(error);
    }
  },

  getAllUsers: base.getAll(User),

  updateUser: base.updateOne(User),

  deleteUser: base.deleteOne(User),

  addWishlist: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: {
          wishlist: req.body._id,
        },
      });

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
          $pull: { wishlist: req.body._id },
        }
      );
      return createMessage(res, 200, "Removed from wish list");
    } catch (err) {
      return createError(res, 404, err || "No document found with that id");
    }
  },
};
