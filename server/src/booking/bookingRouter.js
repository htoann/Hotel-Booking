import { auth } from "../api/middlewares";
import bookingController from "./bookingController";

const router = require("express").Router();

router.get("/", auth, bookingController.getAllBooking);
router.post("/", auth, bookingController.booking);
router.delete("/:id", auth, bookingController.deleteBooking);

export default router;