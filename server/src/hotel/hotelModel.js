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
        city: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        address: {
            type: {
                name: String,
                lat: Number,
                lng: Number
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
        },
        score: {
            type: Number,
            min: 0,
            max: 10,
        },
        rooms: {
            type: [String],
        },
        user: {
            type: mongoose.Schema.ObjectId, ref: "User"
        },
        published: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

// autoIncrement.initialize(mongoose.connection);

// HotelSchema.plugin(autoIncrement.plugin, {
//   model: "Hotel",
//   field: "_id",
//   startAt: 1,
//   incrementBy: 1,
// });

export default mongoose.model("Hotel", HotelSchema);
