const cartControllers = require("../controllers/cartControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = require("express").Router();

// router.get("/sellers-get", authMiddleware, sellerControllers.sellers_get);

router.post("/add_to_cart", cartControllers.add_to_cart);
router.get("/get_cart_product/:customerId", cartControllers.get_cart_product);

module.exports = router;
