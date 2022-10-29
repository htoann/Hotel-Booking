import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";
import autoIncrement from "mongoose-auto-increment";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    avatar: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    phone: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
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
UserSchema.methods.comparedPassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, good) {
    if (err) {
      return cb(err);
    }
    cb(null, good);
  });
};

autoIncrement.initialize(mongoose.connection);

UserSchema.plugin(autoIncrement.plugin, {
  model: "User",
  field: "_id",
  startAt: 1,
  incrementBy: 1,
});

// Export the model
export default mongoose.model("User", UserSchema);
