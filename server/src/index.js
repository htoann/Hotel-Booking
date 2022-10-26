import http from "http";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import logger from "./util/logger";
import route from "./routes";
import initDB from "./database";

const app = express();

if (!process.env.JWT_SECRET) {
  const err = new Error("No JWT_SECRET in env variable");
  logger.warn(err.message);
}

initDB();

// App Setup
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes Init
route(app);

// Server Setup
const PORT = process.env.PORT || 8000;
http.createServer(app).listen(PORT, () => {
  logger.info(`Server listening on: http://localhost:${PORT}`);
});
