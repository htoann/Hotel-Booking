import userController from "./userController";

const router = require("express").Router();

router.get("/", userController.getUsers);

router.get("/:id", userController.getUser);

router.put("/:id/update", userController.updateUser);

router.delete("/:id/delete", userController.deleteUser);

export default router;
