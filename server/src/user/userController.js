import User from "./userModel";
const base = require("../utils/baseController");

export default {
  getUser: base.getOne(User, "username"),

  getAllUsers: base.getAll(User),

  updateUser: base.updateOne(User, "username"),

  deleteUser: base.deleteOne(User, "username"),
};
