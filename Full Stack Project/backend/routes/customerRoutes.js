const customerControllers = require("../controllers/customerControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/customer_register", customerControllers.customer_register);
router.post("/customer_login", customerControllers.customer_login);

// router.get(
//   "/seller-get/:sellerID",
//   authMiddleware,
//   sellerControllers.seller_get
// );
// router.post("/seller-update", authMiddleware, sellerControllers.seller_update);

module.exports = router;
