import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
);

autoIncrement.initialize(mongoose.connection);

RoomSchema.plugin(autoIncrement.plugin, "Hotel", {
  model: "Room",
  field: "_id",
  startAt: 1,
  incrementBy: 1,
});

export default mongoose.model("Room", RoomSchema);
