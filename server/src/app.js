import express from "express";
import morgan from "morgan";
import cors from "cors";
import logger from "./utils/logger";

const app = express();

if (!process.env.JWT_SECRET) {
  const err = new Error("No JWT_SECRET in env variable");
  logger.warn(err.message);
}

// App Setup
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default app;
