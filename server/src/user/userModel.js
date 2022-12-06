import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    username: {
      type: String,
    },
    avatar: {
      type: String,
      default: "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png"
    },
    country: {
      type: String,
    },
    city: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
    },
    birthday: {
      type: String,
    },
    gender: {
      type: Boolean, // True is male, false is female
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    wishlist: {
      type: [String],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  // get access to user model, then we can use user.email, user.password
  const user = this;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

// Make use of methods for comparedPassword
UserSchema.methods.comparedPassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, good) {
    if (err) {
      return callback(err);
    }
    callback(null, good);
  });
};

// autoIncrement.initialize(mongoose.connection);

// UserSchema.plugin(autoIncrement.plugin, {
//   model: "User",
//   field: "_id",
//   startAt: 1,
//   incrementBy: 1,
// });

// Export the model
export default mongoose.model("User", UserSchema);
