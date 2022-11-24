import { createError, createMessage } from "../utils/createMessage";
import User from "./userModel";
import bcrypt from "bcrypt-nodejs";

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

  updateUser: async (req, res) => {
    if (req.body.isAdmin) {
      return createError(res, 404, "You can't update the role");
    }
    if (req.params.id !== req.user.id) {
      return createError(res, 403, "You are not allow");
    }

    try {
      const doc = await User.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!doc) {
        return createError(res, 404, "No document found with that id");
      }

      res.status(200).json(doc);
    } catch (error) {
      return createError(res, 404, error || "No document found with that id");
    }
  },

  deleteUser: async (req, res) => {
    if (req.body.isAdmin) {
      return createError(res, 404, "You can't update the role");
    }
    if (req.params.id !== req.user.id) {
      return createError(res, 403, "You are not allow");
    }

    try {
      const doc = await User.findByIdAndDelete(req.params.id);

      if (!doc) {
        return createError(res, 404, "No document found with that id");
      }

      return createMessage(res, 200, "Deleted successfully");
    } catch (error) {
      return createError(res, 404, error || "No document found with that id");
    }
  },

  addWishlist: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.user.id, {
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
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { wishlist: req.body.id },
      });
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

      await User.findByIdAndUpdate(req.user.id, {
        password: newPasswordHash,
      });

      return createMessage(res, 200, "Change password successfully");
    } catch (err) {
      console.log(err);
      return createError(res, 404, err || "Something went wrong");
    }
  },
};
