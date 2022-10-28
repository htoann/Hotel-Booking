import token from "../utils/token";
import User from "../user/userModel";

export default {
  register: (req, res, next) => {
    const { email, password } = req.body;
    const username = email.split("@")[0];

    if (!email || !password) {
      return res
        .status(422)
        .send({ error: "You must provide email and password." });
    }
    User.findOne(
      {
        email: email,
      },
      function (err, existingUser) {
        if (err) return res.status(422).send(err);
        if (existingUser) {
          return res.status(422).send({ error: "User has been created." });
        }
        const user = new User({
          ...req.body,
          password: password,
          username,
        });

        user.save(function (err, savedUser) {
          if (err) {
            return next(err);
          }

          const { password, isAdmin, ...info } = user._doc;

          res.json({
            data: {
              user: { ...info },
              token: token.generateToken(savedUser),
            },
          });
        });
      }
    );
  },

  login: (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res
        .status(422)
        .send({ error: "You must provide email and password." });
    }
    User.findOne(
      {
        email: email,
      },
      function (err, existingUser) {
        if (err || !existingUser) {
          return res.status(401).send(err || { error: "User not found" });
        }
        if (existingUser) {
          existingUser.comparedPassword(password, function (err, good) {
            if (err || !good) {
              return res.status(401).send(err || "Wrong password or email");
            }

            const { password, isAdmin, ...info } = existingUser._doc;

            res.send({
              data: {
                user: { ...info },
                token: token.generateToken(existingUser),
              },
            });
          });
        }
      }
    );
  },
};
