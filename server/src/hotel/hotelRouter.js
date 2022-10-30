import { admin } from "../api/middlewares";
import hotelController from "./hotelController";

const router = require("express").Router();

router.post("/", admin, hotelController.createHotel);

router
  .route("/:id")
  .put(admin, hotelController.updateHotel)
  .delete(admin, hotelController.deleteHotel);

router.get("/search/:id", hotelController.getHotel);
router.get("/", hotelController.getAllHotels);

router.get("/room/:id", hotelController.getHotelRooms);

router.get("/countByCity", hotelController.countByCity);
router.get("/countByType", hotelController.countByType);

export default router;
