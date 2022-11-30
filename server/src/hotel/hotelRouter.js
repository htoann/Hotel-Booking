import {auth} from "../api/middlewares";
import hotelController from "./hotelController";

const router = require("express").Router();

router
    .route("/")
    .post(auth, hotelController.createHotel)
    .get(hotelController.getAllHotel);

router
    .route("/:id")
    .put(auth, hotelController.updateHotel)
    .delete(auth, hotelController.deleteHotel);

router.get("/search/:id", hotelController.getHotel);

router.get("/room/:id", hotelController.getHotelRooms);

router.get("/me", auth, hotelController.getHotelsByUser)

export default router;
