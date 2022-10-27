import User from "../user/userModel";
import token from "../utils/token";

export const auth = (req, res, next) => {
  if (!req.header("Authorization"))
    return res.status(401).send({
      message: "Please make sure your request has an Authorization header.",
    });

  // Validate jwt
  let try_token = req.header("Authorization").split(" ")[1];
  token.verifyToken(try_token, (err, payload) => {
    if (err) return res.status(401).send(err);
    User.findById(payload.sub).exec((err, user) => {
      if (err || !user) {
        return res.status(404).send(
          err || {
            error: "User not found",
          }
        );
      }
      delete user.password;
      req.user = user;
      next();
    });
  });
};

export const admin = (req, res, next) => {
  if (!req.header("Authorization"))
    return res.status(401).send({
      message: "Please make sure your request has an Authorization header.",
    });

  // Validate jwt
  let try_token = req.header("Authorization").split(" ")[1];
  token.verifyToken(try_token, (err, payload) => {
    if (err) return res.status(401).send(err);
    User.findById(payload.sub).exec((err, user) => {
      if (err || !user) {
        return res.status(404).send(
          err || {
            error: "User not found || You are not allowed",
          }
        );
      }

      delete user.password;
      req.user = user;
      next();
    });
  });
};
