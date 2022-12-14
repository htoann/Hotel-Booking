import jwt from "jwt-simple";
import config from "../config";

export default {
  generateToken: function (user) {
    const timeStamp = new Date().getTime();
    const payload = {
      sub: user.id,
      iat: timeStamp,
    };
    return jwt.encode(payload, config.jwt_secret);
  },
  verifyToken: function (token, callback) {
    const decode = jwt.decode(token, config.jwt_secret);

    if (!decode) return callback(new Error("Token is not verified."));
    callback(null, decode);
  },
};
