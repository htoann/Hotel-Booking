import { auth, uploadImage } from "../api/middlewares";
import uploadController from "./uploadController";

const router = require("express").Router();

router.post("/image", auth, uploadImage, uploadController.uploadImage);

export default router;
