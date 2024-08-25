const productControllers = require("../controllers/productControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/category-add", authMiddleware, productControllers.category_add);
router.get("/category-get", authMiddleware, productControllers.category_get);

module.exports = router;
