import { admin } from "../api/Middlewares";
import hotelController from "./hotelController";

const router = require("express").Router();


router.post("/", admin, hotelController.createHotel);

router
.route("/:id", admin)
.put(hotelController.updateHotel)
.delete(hotelController.deleteHotel);

router.get("/search/:id", hotelController.getHotel);
router.get("/", hotelController.getAllHotels);

export default router;