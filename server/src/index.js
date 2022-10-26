import app from "./app";
import route from "./routes";
import http from "http";
import logger from "./utils/logger";
import initDatabase from "./initDatabase";

initDatabase();

// Routes Init
route(app);

// Server Setup
const PORT = process.env.PORT || 8000;
http.createServer(app).listen(PORT, () => {
  logger.info(`Server listening on: http://localhost:${PORT}`);
});
