import authentication from "../api/authentication";

const router = require("express").Router();

router.post("/register", authentication.register);
router.post("/login", authentication.login);

export default router;
