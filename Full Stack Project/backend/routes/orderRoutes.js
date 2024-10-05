const orderControllers = require("../controllers/orderControllers");
const router = require("express").Router();

router.post("/place_order", orderControllers.place_order);
router.put("/update_order/:orderId", orderControllers.update_order);

router.post("/pay_later/:orderId", orderControllers.pay_later);

router.get("/get_orders_admin", orderControllers.get_orders_admin);

router.get(
  "/get_order_detail_admin/:orderId",
  orderControllers.get_order_detail_admin
);

router.put("/order_update_admin/:orderId", orderControllers.order_update_admin);

router.get("/get_orders_seller/:sellerId", orderControllers.get_orders_seller);

router.get(
  "/get_order_details_seller/:orderId",
  orderControllers.get_order_details_seller
);

router.put(
  "/order_update_seller/:orderId",
  orderControllers.order_update_seller
);

// router.get("/sellers-get", authMiddleware, sellerControllers.sellers_get);
// router.get("/get_cart_product/:customerId", cartControllers.get_cart_product);
// router.delete(
//   "/delete_cart_product/:cartId",
//   cartControllers.delete_cart_product
// );

module.exports = router;
