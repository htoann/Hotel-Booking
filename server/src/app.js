import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

// App Setup
app.use(
  cors({
    origin: ["https://bookingapihotel.herokuapp.com/", "http://localhost:3000"],
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default app;
