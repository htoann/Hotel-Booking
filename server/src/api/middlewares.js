import User from "../user/userModel";
import { createError } from "../utils/createMessage";
import token from "../utils/token";
import fs from "fs";

export const auth = (req, res, next) => {
  if (
    !req.header("Authorization") &&
    !req.header("Authorization").startsWith("Bearer")
  ) {
    return createError(
      res,
      401,
      "Please make sure your request has an Authorization header."
    );
  } else {
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
  }
};

export const admin = (req, res, next) => {
  if (
    !req.header("Authorization") &&
    !req.header("Authorization").startsWith("Bearer")
  ) {
    return createError(
      res,
      401,
      "Please make sure your request has an Authorization header."
    );
  } else {
    let try_token = req.header("Authorization").split(" ")[1];
    token.verifyToken(try_token, (err, payload) => {
      if (err) return createError(res, 401, "User has been created.");
      User.findById(payload.sub).exec((err, user) => {
        if (err || !user) {
          return createError(res, 404, err || "User not found");
        }
        if (user.isAdmin === false) {
          return createError(res, 404, err || "You are not allowed");
        }
        delete user.password;
        req.user = user;
        next();
      });
    });
  }
};

export const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      return createError(res, 400, "No files were uploaded.");
    const file = req.files.photos;
    if (file.length > 0) {
      return createError(res, 400, "Please select only 1 image");
    }
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return createError(res, 400, "Size too large.");
    } // 1mb

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTmp(file.tempFilePath);
      return createError(res, 400, "File format is incorrect.");
    }
    next();
  } catch (err) {
    console.log(err);
    return createError(res, 500, err);
  }
};

export const uploadPhotos = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      return createError(res, 400, "No files were uploaded.");
    const files = req.files.photos;

    if (files.length > 1) {
      files.map((file) => {
        if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
          return createError(res, 400, "File format is incorrect.");
        }
      });
    } else {
      return createError(res, 400, "Please select at least 2 photos");
    }
    next();
  } catch (err) {
    console.log(err);
    return createError(res, 500, err);
  }
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
