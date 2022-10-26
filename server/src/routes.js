import middlewares from "./api/middlewares";
import authRouter from "./auth/authRouter";
import userRouter from "./user/userRouter";
import logger from "./utils/logger";

export default function route(app) {
  app.get("/", (req, res) =>
    res.json({ source: "https://github.com/htoann/mern" })
  );

  app.use("/", authRouter);
  app.use("/users", middlewares.auth, userRouter);

  app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(422).json(err.message);
  });

  app.use((req, res) => {
    res.status(404).render("home");
  });
}
