import app from "./app";
import route from "./routes";
import logger from "./utils/logger";
import initDatabase from "./initDatabase";

initDatabase();

if (!process.env.JWT_SECRET) {
  const err = new Error("No JWT_SECRET in env variable");
  logger.warn(err.message);
}

// Routes Init
route(app);

// Server Setup
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  logger.info(`Server listening on: http://localhost:${PORT}`);
});
