import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
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
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
);

// autoIncrement.initialize(mongoose.connection);

// RoomSchema.plugin(autoIncrement.plugin, {
//   model: "Room",
//   field: "_id",
//   startAt: 1,
//   incrementBy: 1,
// });

export default mongoose.model("Room", RoomSchema);
