import Authentication from "./api/authentication";
import logger from "./util/logger";

export default function route(app) {
  app.get("/", (req, res) =>
    res.json({ source: "https://github.com/htoann/mern" })
  );

  app.post("/auth/register", Authentication.register);
  app.post("/auth/login", Authentication.login);

  app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(422).json(err.message);
  });

  app.use((req, res) => {
    res.status(404).render("home");
  });
}
