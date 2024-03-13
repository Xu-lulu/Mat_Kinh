const CategoryController = require("../app/Controllers/CategoryController");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUser,
  verifyTokenAndUserAuthorization,
} = require("../middleware/verifyToken");
const router = require("express").Router();

router.post("/category",verifyTokenAndAdmin, CategoryController.updataCategory);
router.get("/allCategory", CategoryController.allCategory);
// router.post("/products/category/:name", CategoryController.findCategory);
module.exports = router;
