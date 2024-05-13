import cloudinary from "cloudinary";
import { cloud_name, api_key, api_secret } from '../config.js';
// const { cloud_name, api_key, api_secret } = process.env;

export const uploadImage = async (images) => {
  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
    secure: true,
  });

  // Upload
  const result = cloudinary.uploader.upload(images, {
    folder: "iPunto",
    width: 2400,
    crop: "scale",
    sign_url: true, 
    type: "authenticated"
  });
  result
    .then((data) => {
      "success", JSON.stringify(data.secure_url, data.public_id, 2);
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
  const infoImage = await result;

  return infoImage;
};

export const deleteImageCloudinary = async (dataImage) => {
  cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret,
    secure: true,
  });
  try {
    await cloudinary.v2.uploader.destroy(dataImage);
  } catch (error) {
    console.log(error);
  }
};