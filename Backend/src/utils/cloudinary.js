// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadToCloudinary = (file) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader
//       .upload_stream({ resource_type: "auto" }, (error, result) => {
//         if (result) {
//           resolve(result);
//         } else {
//           reject(error);
//         }
//       })
//       .end(file.buffer);
//   });
// };
// module.exports = uploadToCloudinary;
