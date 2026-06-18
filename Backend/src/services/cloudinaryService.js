const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,    //ddy4kchrq
  api_key: process.env.CLOUDINARY_API_KEY,       //481645392635747
  api_secret: process.env.CLOUDINARY_API_SECRET,  //6gU6BSiy3RzgXUFDKB2ZGhUtscc
});

const uploadImage = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'petcare' },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

module.exports = { uploadImage };