import authRouter from "./auth/authRouter";
import userRouter from "./user/userRouter";
import hotelRouter from "./hotel/hotelRouter";
import roomRouter from "./room/roomRouter";
import logger from "./utils/logger";
import { createError } from "./utils/createMessage";

export default function route(app) {
  app.get("/", (req, res) =>
    res.json({ source: "https://github.com/htoann/bookinghotel" })
  );

  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);
  app.use("/api/hotels", hotelRouter);
  app.use("/api/rooms", roomRouter);

  app.use((err, req, res, next) => {
    logger.error(err.message);
    return next(createError(res, 422, err.message));
  });

  app.use("*", (req, res) => {
    createError(res, 404, "404 Not Found");
  });
}