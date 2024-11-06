const getPublicIdFromUrl = (url) => {
  const parts = url.split("/");
  const publicIdWithExtension = parts.slice(7).join("/");
  const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, ""); 
  return publicId;
};
module.exports = getPublicIdFromUrl