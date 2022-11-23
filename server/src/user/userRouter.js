import { admin, auth } from "../api/middlewares";
import userController from "./userController";

const router = require("express").Router();

router.get("/", admin, userController.getAllUsers);

// router
//   .route("/:username", auth)
//   .get(userController.getUser)
//   .put(userController.updateUser)
//   .delete(userController.deleteUser);

router.post("/wishlist", auth, userController.addWishlist);
router.delete("/wishlist", auth, userController.deleteWishlist);

router.put("/reset", auth, userController.resetPassword);

router.post("/hotel/create", auth, userController.createHotel);
router.post("/room/create", auth, userController.createRoom);
router.delete("/hotel/:id", auth, userController.deleteHotel);

router
  .route("/me")
  .get(auth, userController.getCurrentUser)
  .put(auth, userController.updateMe)
  .delete(auth, userController.deleteMe);

router
  .route("/:id")
  .get(admin, userController.getUser)
  .put(admin, userController.updateUser)
  .delete(admin, userController.deleteUser);

export default router;
