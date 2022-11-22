import { admin } from "../api/middlewares";
import roomController from "./roomController";

const router = require("express").Router();

router.get("/", roomController.getAllRooms);

router.get("/:id", roomController.getRoom);

router.post("/:hotelid", admin, roomController.createRoom);

router.put("/:id", admin, roomController.updateRoom);

router.delete("/:id/:hotelid", admin, roomController.deleteRoom);

export default router;
