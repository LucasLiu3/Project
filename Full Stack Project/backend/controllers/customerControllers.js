const customerOrder = require("../models/customerOrder");
const customerModel = require("../models/customerModel");
const productModel = require("../models/productModel");
const SellerToCustomerModel = require("../models/chat/sellerToCustomerModel");
const { responseReturn } = require("../utilities/response");
const bcrypt = require("bcrypt");
const { createToken } = require("../utilities/tokenCreate");
const {
  mongo: { ObjectId },
} = require("mongoose");

class customerControllers {
  customer_register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const existSeller = await customerModel.findOne({ email });

      if (existSeller) {
        return responseReturn(res, 404, {
          error: "Email has alreaded registered",
        });
      }

      const hasedPassword = await bcrypt.hash(password, 10);

      const newCustomer = await customerModel.create({
        name,
        email,
        password: hasedPassword,
        method: "manual",
      });

      await SellerToCustomerModel.create({ myId: newCustomer.id });

      const token = await createToken({
        id: newCustomer.id,
        name: newCustomer.name,
        email: newCustomer.email,
        method: newCustomer.method,
      });

      res.cookie("customerToken", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      return responseReturn(res, 200, {
        message: "Register successful",
        token,
      });
    } catch (error) {
      return responseReturn(res, 500, { error: error.message });
    }
  };

  customer_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const customer = await customerModel
        .findOne({ email })
        .select("+password");

      if (!customer) {
        return responseReturn(res, 404, { error: "Email not Found" });
      }

      const passwordInDB = customer.password;
      const isMatch = await bcrypt.compare(password, passwordInDB);

      if (!isMatch) {
        return responseReturn(res, 404, { error: "Password not match" });
      }

      const token = await createToken({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        method: customer.method,
      });

      res.cookie("customerToken", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      return responseReturn(res, 200, {
        message: "Login successful",
        token,
      });
    } catch (error) {
      return responseReturn(res, 500, { error: error.message });
    }
  };

  get_my_orders = async (req, res) => {
    const { customerId } = req.params;

    try {
      const my_orders = await customerOrder.find({
        customerId: new ObjectId(customerId),
      });

      return responseReturn(res, 200, {
        my_orders: my_orders,
      });
    } catch (error) {
      return responseReturn(res, 500, { error: error.message });
    }
  };

  get_order_detail = async (req, res) => {
    const { orderId } = req.params;

    try {
      const orderDetail = await customerOrder.findById(new ObjectId(orderId));
      return responseReturn(res, 200, {
        orderDetail: orderDetail,
      });
    } catch (error) {
      return responseReturn(res, 500, { error: error.message });
    }
  };

  get_product_detail = async (req, res) => {
    const { productId } = req.params;

    try {
      const productDetail = await productModel.findById(productId);
      return responseReturn(res, 200, {
        productDetail: productDetail,
      });
    } catch (error) {
      return responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new customerControllers();
