import { admin, auth } from "../api/middlewares";
import userController from "./userController";

const router = require("express").Router();

router.get("/", admin, userController.getAllUsers);

// router.get("/me", auth, userController.getCurrentUser);

// router
//   .route("/:username", auth)
//   .get(userController.getUser)
//   .put(userController.updateUser)
//   .delete(userController.deleteUser);

router.post("/wishlist", auth, userController.addWishlist);
router.delete("/wishlist", auth, userController.deleteWishlist);
router.put("/reset", auth, userController.resetPassword);

router
  .route("/me")
  .get(auth, userController.getCurrentUser)
  .put(auth, userController.updateUser)
  .delete(auth, userController.deleteMe);

router
  .route("/:id")
  .get(admin, userController.getUser)
  .put(admin, userController.updateUser)
  .delete(admin, userController.deleteUser);

export default router;
