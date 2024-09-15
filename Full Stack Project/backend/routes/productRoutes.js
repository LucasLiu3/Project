const productControllers = require("../controllers/productControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/category-add", authMiddleware, productControllers.category_add);
router.get("/category-get", productControllers.category_get);

router.get("/productsAll-get", productControllers.productsAll_get);

router.post("/products-add", authMiddleware, productControllers.product_add);

router.get("/products-get", authMiddleware, productControllers.product_get);

router.get(
  "/products-one-get/:productId",
  authMiddleware,
  productControllers.products_one_get
);

router.post(
  "/products-one-update",
  authMiddleware,
  productControllers.products_one_update
);

// router.post(
//   "/products-image-update",
//   authMiddleware,
//   productControllers.products_image_update
// );

module.exports = router;
