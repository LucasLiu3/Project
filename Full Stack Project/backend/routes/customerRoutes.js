const customerControllers = require("../controllers/customerControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/customer_register", customerControllers.customer_register);
router.post("/customer_login", customerControllers.customer_login);

router.get("/get_my_orders/:customerId", customerControllers.get_my_orders);

router.get("/get_order_detail/:orderId", customerControllers.get_order_detail);

router.get(
  "/get_product_detail/:productId",
  customerControllers.get_product_detail
);

router.post("/update_profile/", customerControllers.update_profile);

router.post("/change_password/", customerControllers.change_password);

module.exports = router;
