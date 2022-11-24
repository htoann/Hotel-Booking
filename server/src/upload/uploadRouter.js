import { auth, uploadAvatar, uploadPhotos } from "../api/middlewares";
import uploadController from "./uploadController";

const router = require("express").Router();

router.post("/avatar", auth, uploadAvatar, uploadController.uploadAvatar);
router.post("/hotel/photos", auth, uploadPhotos, uploadController.uploadPhotos);

export default router;
