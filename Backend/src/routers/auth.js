const HomeController = require("../app/Controllers/HomeController");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUser,
  verifyTokenAndUserAuthorization,
} = require("../middleware/verifyToken");
const router = require("express").Router();
router.post("/Register", HomeController.Register);
router.post("/Login", HomeController.Login);
router.post("/refresh", HomeController.requestRefereshToken);
router.get(
  "/oneuser",
  verifyTokenAndUserAuthorization,
  HomeController.OneUsers
);

router.get(
  "/allCartOneUser",
  verifyTokenAndUser,
  HomeController.datacartOneUser
);
router.get("/alluser", verifyTokenAndAdmin, HomeController.allUser);
router.post("/Logout", verifyTokenAndUserAuthorization, HomeController.logOut);
module.exports = router;
