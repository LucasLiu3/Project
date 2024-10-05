const customerOrder = require("../models/customerOrder");
const adminOrder = require("../models/adminOrder");
const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");
const {
  mongo: { ObjectId },
} = require("mongoose");

const { responseReturn } = require("../utilities/response");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const bcrypt = require("bcrypt");
const { createToken } = require("../utilities/tokenCreate");
// const moment = require("moment");
const moment = require("moment-timezone");

class orderControllers {
  paymentCheck = async (id) => {
    try {
      const order = await customerOrder.findById(id);

      if (order.payment_status === "unpaid") {
        await customerOrder.findByIdAndUpdate(id, {
          delivery_status: "cancelled",
        });

        await adminOrder.updateMany(
          {
            orderId: id,
          },
          { delivery_status: "cancelled" }
        );
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  place_order = async (req, res) => {
    const {
      products,
      price,
      shippingFee,
      items,
      info,
      customerInfo,
      navigate,
    } = req.body;

    let adminOrdeDate = [];
    let cartId = [];
    // const tempDate = moment(Date.now()).toDate();
    const tempDate = moment().tz("Pacific/Auckland").format("DD/MM/YYYY");

    let customerOrderProduct = [];

    products.map((each) =>
      each[1].map((item) => {
        const productInfo = item.productsInCart[0];
        productInfo.quantity = item.quantity;
        customerOrderProduct.push(productInfo);
        cartId.push(item.cartId);
      })
    );

    const groupedBySeller = customerOrderProduct.reduce((acc, product) => {
      const existingGroup = acc.find(
        (group) => group.sellerId === product.sellerId
      );

      const totalPrice =
        product.quantity * product.price * (1 - product.discount / 100);

      if (existingGroup) {
        existingGroup.products.push(product);
        existingGroup.totalPrice += totalPrice;
      } else {
        acc.push({
          sellerId: product.sellerId,
          products: [product],
          totalPrice: totalPrice,
        });
      }

      return acc;
    }, []);

    try {
      const order = await customerOrder.create({
        customerId: customerInfo.id,
        shippingInfo: info,
        product: customerOrderProduct,
        price: price + shippingFee,
        payment_status: "unpaid",
        delivery_status: "pending",
        data: tempDate,
      });

      groupedBySeller.map((each) =>
        adminOrdeDate.push({
          orderId: order.id,
          sellerId: each.sellerId,
          product: each.products,
          price: each.totalPrice,
          shippingInfo: "Ware house",
          payment_status: "unpaid",
          delivery_status: "pending",
          data: tempDate,
        })
      );

      await adminOrder.insertMany(adminOrdeDate);

      for (let i = 0; i < cartId.length; i++) {
        await cartModel.findOneAndDelete(cartId[i]);
      }

      setTimeout(() => {
        this.paymentCheck(order.id);
      }, 100000);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: customerOrderProduct.map((product) => {
          return {
            price_data: {
              currency: "nzd",
              product_data: {
                name: product.product,
                images: [product.images[0]],
              },

              unit_amount: Math.round(
                product.price * 100 * (1 - product.discount / 100)
              ),
            },
            quantity: product.quantity,
          };
        }),
        success_url: `http://localhost:3000/paymentSuccess/${order.id}`,
        cancel_url: `http://localhost:3000/cancel`,
      });

      return responseReturn(res, 200, {
        orderId: order.id,
        paymentUrl: session.url,
      });
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, {
        error: error.message,
      });
    }
  };

  pay_later = async (req, res) => {
    const { orderId } = req.params;

    try {
      const products = await customerOrder.findById(new ObjectId(orderId));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: products.product.map((product) => {
          return {
            price_data: {
              currency: "nzd",
              product_data: {
                name: product.product,
                images: [product.images[0]],
              },

              unit_amount: Math.round(
                product.price * 100 * (1 - product.discount / 100)
              ),
            },
            quantity: product.quantity,
          };
        }),
        success_url: `http://localhost:3000/paymentSuccess/${orderId}`,
        cancel_url: `http://localhost:3000/cancel`,
      });

      return responseReturn(res, 200, {
        orderId: orderId,
        paymentUrl: session.url,
      });
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { error: error.message });
    }
  };

  update_order = async (req, res) => {
    const { orderId } = req.params;

    try {
      await customerOrder.findByIdAndUpdate(new ObjectId(orderId), {
        payment_status: "paid",
      });

      await adminOrder.updateMany(
        { orderId: new ObjectId(orderId) },
        { payment_status: "paid" }
      );

      const order = await customerOrder.findById(new ObjectId(orderId));
      const products = order.product;

      for (const item of products) {
        const productId = item._id;
        const quantity = item.quantity;

        await productModel.findByIdAndUpdate(productId, {
          $inc: { stock: -quantity },
        });
      }
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { error: error.message });
    }
  };

  get_orders_admin = async (req, res) => {
    try {
      const orders = await customerOrder.find().sort({ createdAt: -1 });

      return responseReturn(res, 200, {
        orders,
      });
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { error: error.message });
    }
  };

  get_order_detail_admin = async (req, res) => {
    const { orderId } = req.params;

    try {
      const oneOrder = await customerOrder.findById(orderId);

      const orderDetails = await adminOrder.find({ orderId: orderId });

      return responseReturn(res, 200, {
        oneOrder,
        orderDetails,
      });
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { error: error.message });
    }
  };

  get_orders_seller = async (req, res) => {
    const { sellerId } = req.params;

    try {
      const orders = await adminOrder
        .find({ sellerId: sellerId })
        .sort({ createdAt: -1 });

      return responseReturn(res, 200, {
        orders,
      });
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { error: error.message });
    }
  };

  get_order_details_seller = async (req, res) => {
    const { orderId } = req.params;

    try {
      const orderDetails = await adminOrder.findById(orderId);

      const customerOrderId = orderDetails.orderId;

      const oneOrder = await customerOrder.findById(customerOrderId);

      return responseReturn(res, 200, {
        oneOrder,
        orderDetails,
      });
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { error: error.message });
    }
  };

  order_update_admin = async (req, res) => {
    const { orderId } = req.params;
    const { state } = req.body;

    try {
      await customerOrder.findByIdAndUpdate(orderId, {
        delivery_status: state,
      });

      return responseReturn(res, 200, {
        message: "Order Status Updated",
      });
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { error: error.message });
    }
  };

  order_update_seller = async (req, res) => {
    const { orderId } = req.params;
    const { state } = req.body;

    console.log(orderId);
    console.log(state);
    try {
      await adminOrder.findByIdAndUpdate(orderId, {
        delivery_status: state,
      });
      return responseReturn(res, 200, {
        message: "Order Status Updated",
      });
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new orderControllers();
