import token from "../utils/token";
import User from "../user/userModel";

export default {
  register: (req, res, next) => {
    const { email, password } = req.body;

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
        });

        user.save(function (err, savedUser) {
          if (err) {
            return next(err);
          }

          const username = email.split("@")[0];
          const { password, ...info } = user._doc;

          res.json({
            user: { ...info, username },
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
          return res.status(401).send(err || { error: "User Not Found" });
        }
        if (existingUser) {
          existingUser.comparedPassword(password, function (err, good) {
            if (err || !good) {
              return res.status(401).send(err || "Wrong username or password.");
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
