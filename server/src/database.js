import config from "./config";
import mongoose from "mongoose";

export default function initDB() {
  mongoose
    .connect(config.mongoose.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => console.error(err));

  mongoose.Promise = global.Promise;
}
