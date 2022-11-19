import token from "../utils/token";
import User from "../user/userModel";
import { createError } from "../utils/createMessage";

export default {
  register: (req, res, next) => {
    const { name, email, password } = req.body;
    const username = email.split("@")[0];

    if (!name || !email || !password) {
      return createError(
        res,
        422,
        "You must provide name, email and password."
      );
    }
    User.findOne(
      {
        email: email,
      },
      function (err, existingUser) {
        if (err) return next(createError(res, 422, err));
        if (existingUser) {
          return createError(res, 422, "User has been created.");
        }
        const user = new User({
          ...req.body,
          password: password,
          username,
        });

        user.save(function (err, savedUser) {
          if (err) {
            return next(createError(res, 500, err));
          }

          const { password, ...info } = user._doc;

          res.json({
            user: { ...info },
            token: token.generateToken(savedUser),
          });
        });
      }
    );
  },

  login: (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return createError(res, 422, "You must provide email and password.");
    }
    User.findOne(
      {
        email: email,
      },
      function (err, existingUser) {
        if (err || !existingUser) {
          return createError(res, 401, err || "User not found");
        }
        if (existingUser) {
          existingUser.comparedPassword(password, function (err, good) {
            if (err || !good) {
              return createError(res, 401, err || "Wrong password or email");
            }

            const { password, ...info } = existingUser._doc;

            res.send({
              user: { ...info },
              token: token.generateToken(existingUser),
            });
          });
        }
      }
    );
  },
};
