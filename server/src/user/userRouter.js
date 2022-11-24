import { admin, auth } from "../api/middlewares";
import userController from "./userController";

const router = require("express").Router();

router.get("/", admin, userController.getAllUsers);

router.post("/wishlist", auth, userController.addWishlist);
router.delete("/wishlist", auth, userController.deleteWishlist);

router.put("/reset", auth, userController.resetPassword);

router
  .route("/:id")
  .get(auth, userController.getUser)
  .put(auth, userController.updateUser)
  .delete(auth, userController.deleteUser);

export default router;
