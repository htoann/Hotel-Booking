import User from "../user/userModel";
import { createError } from "../utils/createMessage";
import token from "../utils/token";

export const auth = (req, res, next) => {
  if (!req.header("Authorization"))
    return createError(
      res,
      401,
      "Please make sure your request has an Authorization header."
    );

  // Validate jwt
  let try_token = req.header("Authorization").split(" ")[1];
  token.verifyToken(try_token, (err, payload) => {
    if (err) return createError(res, 401, "User has been created.");
    User.findById(payload.sub).exec((err, user) => {
      if (err || !user) {
        return createError(res, 404, err || "User not found");
      }
      delete user.password;
      req.user = user;
      next();
    });
  });
};

export const admin = (req, res, next) => {
  if (!req.header("Authorization"))
    return createError(
      res,
      401,
      "Please make sure your request has an Authorization header."
    );

  // Validate jwt
  let try_token = req.header("Authorization").split(" ")[1];
  token.verifyToken(try_token, (err, payload) => {
    if (err) return next(createError(res, 401, err));
    User.findById(payload.sub).exec((err, user) => {
      if (err || !user) {
        return createError(res, 404, err || "You are not allowed");
      } else if (!user.isAdmin) {
        return createError(res, 404, err || "You are not allowed");
      }

      delete user.password;
      req.user = user;
      next();
    });
  });
};
