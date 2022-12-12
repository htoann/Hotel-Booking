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

router.post("/review", auth, hotelController.postReview);

router.delete("/review/:id", auth, hotelController.deleteReview);

router.put("/review/:id", auth, hotelController.updateReview);

export default router;