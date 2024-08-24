import cloudinary from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";



dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "blog",
    format: async (req, file) => {
      const ext = file.mimetype.split("/")[1];
      console.log("File extension detected:", ext); // Debugging log
      return ext || "jpg"; // Fallback to 'jpg'
    },
    public_id: (req, file) =>
      Date.now() + "_" + file.originalname.split(".")[0],
  },
});

const upload = multer({ storage });
console.log("from multer middleware")

export default upload;
