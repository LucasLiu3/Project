const chatControllers = require("../controllers/chatControllers");
const router = require("express").Router();

router.post("/customer_add_friends", chatControllers.customer_add_friends);

router.post("/send_message_to_seller", chatControllers.send_message_to_seller);

// router.post("/pay_later/:orderId", orderControllers.pay_later);

module.exports = router;
