const router = require("express").Router();
const ProductsControllers = require("../app/Controllers/ProductsCotrollers");
const upload = require("../middleware/uploadImage");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUser,
  verifyTokenAndSeller,
  verifyTokenAndUserAuthorization,
} = require("../middleware/verifyToken");
router.post(
  "/uploadProducts",
  verifyTokenAndAdmin,
  upload.single("Image"),
  ProductsControllers.updataProducts
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
  upload.single("Image"),
  ProductsControllers.update
);
router.post(
  "/dataupdate/:id",
  verifyTokenAndAdmin,
  ProductsControllers.dataupdate
);
router.post("/search/:name", ProductsControllers.findProducts);
router.post("/products/category/:name", ProductsControllers.findCategory);

module.exports = router;
