import {v2 as cloudinary} from "cloudinary";
import {createError, createMessage} from "../utils/createMessage";

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
                        folder: "photos",
                    });
                    urls.push(newPath);
                }
            } else {
                const newPath = await cloudinaryImageUploadMethod(files, {
                    folder: "photos",
                });
                urls.push(newPath);
            }
            return res.json({url: urls});
        } catch (err) {
            console.log(err);
            return createError(res, 500, err);
        }
    },

    deleteImage: async (req, res) => {
        try {
            const {url} = req.body;
            if (url.length < 1) {
                return createError(res, 500, "Invalid url");
            }
            const public_id = url.substring(url.substring(1, url.lastIndexOf('/')).lastIndexOf('/') + 2, url.lastIndexOf('.'))
            const {result} = await cloudinary.uploader.destroy(public_id)
            if (result === 'not found') {
                return createError(res, 500, "Something went wrong");
            } else {
                return createMessage(res, 200, "Delete image successfully");
            }

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
