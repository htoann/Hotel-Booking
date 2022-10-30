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
};
