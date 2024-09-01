const sellerControllers = require("../controllers/sellerControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.get("/sellers-get", authMiddleware, sellerControllers.sellers_get);
router.get(
  "/seller-get/:sellerID",
  authMiddleware,
  sellerControllers.seller_get
);
router.post("/seller-update", authMiddleware, sellerControllers.seller_update);

module.exports = router;
