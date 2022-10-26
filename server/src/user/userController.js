import User from "./userModel";
const base = require("../utils/baseController");

export default {
  getUser: base.getOne(User),

  getAllUsers: base.getAll(User),

  updateUser: base.updateOne(User),

  deleteUser: base.deleteOne(User),
};
