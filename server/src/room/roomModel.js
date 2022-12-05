import mongoose from "mongoose";
import Hotel from "../hotel/hotelModel";

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
    quantity: Number,
  },
  { timestamps: true }
);

RoomSchema.statics.updateCheapestPrice = async function (hotelId, next) {
  const roomCheapest = await this.find().sort({ price: 1 }).exec();
  const cheapestPrice = roomCheapest[0].price;

  await Hotel.findByIdAndUpdate(hotelId, {
    $set: { cheapestPrice: cheapestPrice },
  });
};

export default mongoose.model("Room", RoomSchema);
