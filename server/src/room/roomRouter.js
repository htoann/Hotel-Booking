import {auth} from "../api/middlewares";
import roomController from "./roomController";

const router = require("express").Router();

router.get("/", roomController.getAllRooms);

router.get("/:id", roomController.getRoom);

router.post("/:hotelid", auth, roomController.createRoom);

router.put("/:id", auth, roomController.updateRoom);

router.delete("/:id", auth, roomController.deleteRoom);

router.put("/", auth, roomController.extend);

export default router;
