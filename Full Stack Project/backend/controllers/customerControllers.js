const customerModel = require("../models/customerModel");
const SellerToCustomerModel = require("../models/chat/sellerToCustomerModel");
const { responseReturn } = require("../utilities/response");
const bcrypt = require("bcrypt");
const { createToken } = require("../utilities/tokenCreate");
const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
  secure: true,
});

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
}

module.exports = new customerControllers();
