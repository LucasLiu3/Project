const cartModel = require("../models/cartModel");

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

      let itemNumber = 0;
      let totalMoney = 0;
      let cartItemNumber = 0;

      console.log(allProductsInCart);

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
}

module.exports = new cartControllers();
