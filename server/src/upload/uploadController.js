import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { createError } from "../utils/createMessage";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export default {
  uploadImage: async (req, res) => {
    try {
      const files = req.files.photos;
      const urls = [];

      if (files.length > 1) {
        for (const file of files) {
          const newPath = await cloudinaryImageUploadMethod(file, {
            folder: "hotels",
          });
          urls.push(newPath);
        }
      } else {
        const newPath = await cloudinaryImageUploadMethod(files, {
          folder: "avatar",
        });
        urls.push(newPath);
      }
      return res.json({ url: urls });
    } catch (err) {
      console.log(err);
      return createError(res, 500, err);
    }
  },
};

const cloudinaryImageUploadMethod = async (file, config) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file.tempFilePath, config, (err, res) => {
      if (err) return createError(res, 500, "Upload image error");
      resolve(res.secure_url);
    });
  });
};
