import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["hotels", "apartments", "resorts", "villas", "cabins"],
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    descShort: {
      type: String,
      required: true,
    },
    address: {
      type: {
        name: String,
        lat: Number,
        lng: Number,
      },
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
      required: true,
    },
    cheapestPrice: {
      type: Number,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: null,
    },
    score: {
      type: Number,
      min: 0,
      max: 10,
      default: null,
    },
    rooms: {
      type: [String],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    published: {
      type: Boolean,
      default: false,
    },
    reviews: [
      {
        review: String,
        score: {
          type: Number,
          min: 0,
          max: 10,
        },
        user: {
          type: Object,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

HotelSchema.statics.calculateAverageScore = async function (hotelId, next) {
  const calAvg = await this.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(hotelId) } },
    { $unwind: "$reviews" },
    {
      $group: {
        _id: null,
        score: { $avg: "$reviews.score" },
      },
    },
  ]);

  const avgScore = calAvg[0].score.toFixed(2);

  try {
    await this.findByIdAndUpdate(
      hotelId,
      {
        $set: {
          score: avgScore,
        },
      },
      { new: true }
    );
  } catch (err) {
    next(err);
  }
};

// autoIncrement.initialize(mongoose.connection);

// HotelSchema.plugin(autoIncrement.plugin, {
//   model: "Hotel",
//   field: "_id",
//   startAt: 1,
//   incrementBy: 1,
// });

export default mongoose.model("Hotel", HotelSchema);
