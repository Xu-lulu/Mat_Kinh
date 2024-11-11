const router = require("express").Router();
const ProductsControllers = require("../app/Controllers/ProductsCotrollers");
const uploadCloud = require("../config/cloudinary.config.");

const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUser,
  verifyTokenAndSeller,
  verifyTokenAndUserAuthorization,
} = require("../middleware/verifyToken");

router.post(
  "/createProducts",
  verifyTokenAndAdmin,
<<<<<<< HEAD
  uploadCloud.fields([
    { name: "Image", maxCount: 1 },
    { name: "setFileListImage", maxCount: 5 },
  ]),
=======
  uploadCloud.single("Image"),
>>>>>>> 9ddca220376579a1e0bafd0142627836ea037c73
  ProductsControllers.createProducts
);
router.get("/allproducts", ProductsControllers.allProducts);
router.get(
  "/productsadmin",
  verifyTokenAndUserAuthorization,
  ProductsControllers.allProductsAdmin
);

router.delete("/delete/:id", verifyTokenAndAdmin, ProductsControllers.delete);
router.put(
  "/update/:id",
  verifyTokenAndAdmin,
<<<<<<< HEAD
  uploadCloud.fields([
    { name: "Image", maxCount: 1 },
    { name: "setFileListImage", maxCount: 5 },
  ]),
=======
  upload.single("Image"),
>>>>>>> 9ddca220376579a1e0bafd0142627836ea037c73
  ProductsControllers.update
);
router.post(
  "/dataupdate/:id",
  verifyTokenAndAdmin,
  ProductsControllers.dataupdate
);
router.post("/search/:name", ProductsControllers.findProducts);
router.post("/category/:name", ProductsControllers.findCategory);

module.exports = router;
