import config from "./config";
import mongoose from "mongoose";

export default function initDatabase() {
  mongoose
    .connect(config.mongoose.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected database");
    })
    .catch((err) => console.error(err));

  mongoose.Promise = global.Promise;
}
