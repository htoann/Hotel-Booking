import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { createError } from "../utils/createMessage";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export default {
  uploadAvatar: async (req, res) => {
    try {
      const file = req.files.photos;

      const result = await cloudinary.uploader.upload(
        file.tempFilePath,
        {
          folder: "avatar",
          width: 150,
          height: 150,
          crop: "fill",
        },
        async (err, result) => {
          if (err) throw err;

          removeTmp(file.tempFilePath);
          return result;
        }
      );

      const url = result.secure_url;
      return res.json({ url: url });
    } catch (err) {
      console.log(err);
      return createError(res, 500, err);
    }
  },

  uploadPhotos: async (req, res) => {
    try {
      const files = req.files.photos;
      const urls = [];

      for (const file of files) {
        const newPath = await cloudinaryImageUploadMethod(file);
        urls.push(newPath);
      }

      return res.json({ url: urls });
    } catch (err) {
      console.log(err);
      return createError(res, 500, err);
    }
  },
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

const cloudinaryImageUploadMethod = async (file, config) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file.tempFilePath, config, (err, res) => {
      if (err) return createError(res, 500, "Upload image error");
      resolve(res.secure_url);
    });
  });
};
