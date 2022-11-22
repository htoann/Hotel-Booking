import { admin, auth } from "../api/middlewares";
import bookingController from "./bookingController";

const router = require("express").Router();

router.post("/", auth, bookingController.booking);

export default router;
