import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

// App Setup
app.use(
  cors({
    origin: ["https://bookinghotels.vercel.app", "http://localhost:3000", process.env.WEB_URL],
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default app;
