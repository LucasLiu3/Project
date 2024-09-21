const cartModel = require("../models/cartModel");
const wishListModel = require("../models/wishListModel");
const productModel = require("../models/productModel");

const { responseReturn } = require("../utilities/response");
const bcrypt = require("bcrypt");
const { createToken } = require("../utilities/tokenCreate");

const {
  mongo: { ObjectId },
} = require("mongoose");

class cartControllers {
  add_to_cart = async (req, res) => {
    const { customerId, quantity, productId } = req.body;

    try {
      const alreayExist = await cartModel.findOne({
        $and: [
          { productId: { $eq: productId } },
          { customerId: { $eq: customerId } },
        ],
      });

      if (alreayExist)
        return responseReturn(res, 404, {
          error: "Product is alreasy in the shopping cart",
        });

      const newPrdocutToCart = await cartModel.create({
        customerId: customerId,
        productId: productId,
        quantity: quantity,
      });

      return responseReturn(res, 200, {
        newProductInCart: newPrdocutToCart,
        message: "Product added to shopping cart successfully",
      });
    } catch (error) {
      return responseReturn(res, 500, { error: error.message });
    }
  };

  get_cart_product = async (req, res) => {
    const { customerId } = req.params;

    try {
      const allProductsInCart = await cartModel.aggregate([
        {
          $match: { customerId: { $eq: new ObjectId(customerId) } },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "productsInCart",
          },
        },
      ]);

      const shoppingCart = allProductsInCart.map((each) => ({
        productsInCart: each.productsInCart,
        quantity: each.quantity,
        cartId: each._id,
      }));

      return responseReturn(res, 200, {
        shoppingCart: shoppingCart,
      });
    } catch (error) {
      return responseReturn(res, 500, { error: error.message });
    }
  };

  delete_cart_product = async (req, res) => {
    const { cartId } = req.params;

    try {
      await cartModel.findByIdAndDelete({ _id: cartId });

      return responseReturn(res, 200, {
        message: "Product deleted successfully",
      });
    } catch (error) {
      return responseReturn(res, 500, { error: error.message });
    }
  };

  quantity_add = async (req, res) => {
    const { cartId } = req.params;
    try {
      const product = await cartModel.findById(cartId);

      const { quantity } = product;

      await cartModel.findByIdAndUpdate(cartId, { quantity: quantity + 1 });

      return responseReturn(res, 200, {
        message: "QTY updated",
      });
    } catch (error) {
      return responseReturn(res, 500, { error: error.message });
    }
  };

  quantity_minus = async (req, res) => {
    const { cartId } = req.params;

    try {
      const product = await cartModel.findById(cartId);

      const { quantity } = product;

      await cartModel.findByIdAndUpdate(cartId, { quantity: quantity - 1 });

      return responseReturn(res, 200, {
        message: "QTY updated",
      });
    } catch (error) {
      return responseReturn(res, 500, { error: error.message });
    }
  };

  add_to_wishList = async (req, res) => {
    const { customerId, productId } = req.body;

    try {
      const alreayExist = await wishListModel.findOne({
        $and: [
          { productId: { $eq: productId } },
          { customerId: { $eq: customerId } },
        ],
      });
      if (alreayExist)
        return responseReturn(res, 404, {
          error: "Product is alreasy in the wishlist",
        });

      const product = await productModel.findById(productId);

      await wishListModel.create({
        customerId: customerId,
        productId: product._id,
        name: product.product,
        price: product.price,
        discount: product.discount,
        rating: product.rating,
        image: product.images[0],
      });
      return responseReturn(res, 200, {
        message: "Product added to wishlist successfully",
      });
    } catch (error) {
      return responseReturn(res, 500, { error: error.message });
    }
  };

  get_wish_list = async (req, res) => {
    const { customerId } = req.params;

    try {
      const allProductsInWishList = await wishListModel.find({
        customerId: new ObjectId(customerId),
      });

      return responseReturn(res, 200, {
        allProductsInWishList: allProductsInWishList,
      });
    } catch (error) {
      return responseReturn(res, 500, { error: error.message });
    }
  };

  remove_wishList = async (req, res) => {
    const { wishListId } = req.params;

    console.log(wishListId);

    try {
      await wishListModel.findByIdAndDelete(wishListId);
      return responseReturn(res, 200, {
        message: "Item has been removed",
      });
    } catch (error) {
      return responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new cartControllers();
