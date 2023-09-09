import { v2 as cloudinary } from "cloudinary";

const opt = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
  upload_preset: "unsigned_upload",
  allowed_formats: ["png", "jpg", "jpeg", "svg", "ico"],
};

export const cloudinaryUploader = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.config({
      api_key: process.env.CLOUDINARY_API_KEY,
      cloud_name: process.env.CLOUDINARY_NAME,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
    cloudinary.uploader.upload(image, opt, (err, result) => {
      if (result && result.secure_url) {
        return resolve(result.secure_url);
      } else {
        return reject({ message: result.message });
      }
    });
  });
};
