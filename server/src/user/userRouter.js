import { admin, auth } from "../api/middlewares";
import userController from "./userController";

const router = require("express").Router();

router.get("/", admin, userController.getAllUsers);

router.get("/me", auth, userController.getCurrentUser);

router
  .route("/:username", auth)
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router
  .route("/:id", auth)
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
