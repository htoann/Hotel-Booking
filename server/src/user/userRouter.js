import { admin } from "../api/Middlewares";
import userController from "./userController";

const router = require("express").Router();

router.get("/", admin, userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
