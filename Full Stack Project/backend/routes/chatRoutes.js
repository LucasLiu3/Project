const chatControllers = require("../controllers/chatControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/customer_add_friends", chatControllers.customer_add_friends);

router.post("/send_message_to_seller", chatControllers.send_message_to_seller);

router.get(
  "/seller_get_customers/:sellerId",
  chatControllers.seller_get_customers
);

router.get(
  "/seller_get_customers_message/:customerId",
  authMiddleware,
  chatControllers.seller_get_customers_message
);

router.post(
  "/seller_message_customer",
  authMiddleware,
  chatControllers.seller_message_customer
);

router.get("/admin_get_sellers", chatControllers.admin_get_sellers);

router.post("/admin_message_seller", chatControllers.admin_message_seller);

router.get("/admin_get_messages/:sellerId", chatControllers.admin_get_messages);

router.get(
  "/seller_get_messages",
  authMiddleware,
  chatControllers.seller_get_messages
);

module.exports = router;
