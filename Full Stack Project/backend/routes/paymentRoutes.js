const paymentControllers = require("../controllers/paymentControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.get(
  "/seller_create_payment_account",
  authMiddleware,
  paymentControllers.seller_create_payment_account
);

router.post(
  "/seller_update_payment_status/:sellerId",
  paymentControllers.seller_update_payment_status
);

router.post("/create_payment/:orderId", paymentControllers.create_payment);

router.get(
  "/get_seller_payment_details/:sellerId",
  paymentControllers.get_seller_payment_details
);

router.post(
  "/seller_request_withdraw",
  paymentControllers.seller_request_withdraw
);

router.get("/admin_get_withdraw", paymentControllers.admin_get_withdraw);
router.post(
  "/admin_approve_withdraw/:requestId",
  paymentControllers.admin_approve_withdraw
);

module.exports = router;
