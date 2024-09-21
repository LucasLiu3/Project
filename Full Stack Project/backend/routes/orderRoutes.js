const orderControllers = require("../controllers/orderControllers");
const router = require("express").Router();

router.post("/place_order", orderControllers.place_order);
router.put("/update_order/:orderId", orderControllers.update_order);

router.post("/pay_later/:orderId", orderControllers.pay_later);

// router.get("/sellers-get", authMiddleware, sellerControllers.sellers_get);
// router.get("/get_cart_product/:customerId", cartControllers.get_cart_product);
// router.delete(
//   "/delete_cart_product/:cartId",
//   cartControllers.delete_cart_product
// );

module.exports = router;
