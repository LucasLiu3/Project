const authControllers = require("../controllers/authControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/admin-login", authControllers.admin_login);
router.post("/seller_register", authControllers.seller_register);
router.post("/seller_login", authControllers.seller_login);
router.get("/get-user", authMiddleware, authControllers.getUser);

module.exports = router;
