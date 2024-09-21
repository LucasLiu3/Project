const cartControllers = require("../controllers/cartControllers");
const { customerMiddleware } = require("../middlewares/customerMiddleware");
const router = require("express").Router();

// router.get("/sellers-get", authMiddleware, sellerControllers.sellers_get);

router.post("/add_to_cart", cartControllers.add_to_cart);
router.get("/get_cart_product/:customerId", cartControllers.get_cart_product);
router.delete(
  "/delete_cart_product/:cartId",
  cartControllers.delete_cart_product
);

router.put("/quantity_add/:cartId", cartControllers.quantity_add);

router.put("/quantity_minus/:cartId", cartControllers.quantity_minus);

router.post("/add_to_wishList", cartControllers.add_to_wishList);
router.get("/get_wish_list/:customerId", cartControllers.get_wish_list);

router.delete("/remove_wishList/:wishListId", cartControllers.remove_wishList);

module.exports = router;
