import { createError, createMessage } from "../utils/createMessage";
import User from "./userModel";
import bcrypt from "bcrypt-nodejs";

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

  updateMe: base.updateOne(User, "reqUser"),

  deleteUser: base.deleteOne(User),

  deleteMe: base.deleteOne(User, "reqUser"),

  addWishlist: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: {
          wishlist: req.body.id,
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
          $pull: { wishlist: req.body.id },
        }
      );
      return createMessage(res, 200, "Removed from wish list");
    } catch (err) {
      return createError(res, 404, err || "No document found with that id");
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

      return createMessage(res, 200, "Update user successfully");
    } catch (err) {
      console.log(err);
      return createError(res, 404, err || "No document found with that id");
    }
  },
};
