import UserController from "./controller";

const router = require("express").Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

export default router;
