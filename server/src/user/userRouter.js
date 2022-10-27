import { admin } from "../api/middlewares";
import userController from "./userController";

const router = require("express").Router();

router.get("/", admin, userController.getAllUsers);

router
  .route("/:username")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
