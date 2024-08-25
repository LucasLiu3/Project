const adminModel = require("../models/adminModel");
const sellerModel = require("../models/sellerModel");
const sellerToCustomer = require("../models/chat/sellerToCustomerModel");
const { responseReturn } = require("../utilities/response");
const bcrypt = require("bcrypt");
const { createToken } = require("../utilities/tokenCreate");

class authControllers {
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await adminModel.findOne({ email }).select("+password");

      // console.log(admin);
      if (!admin) {
        return responseReturn(res, 404, { error: "Email not Found" });
      }

      const passwordInDB = admin.password;
      const isMatch = await bcrypt.compare(password, passwordInDB);

      if (!isMatch) {
        return responseReturn(res, 404, { error: "Password not match" });
      }

      const token = await createToken({
        id: admin.id,
        role: admin.role,
      });

      res.cookie("accessToken", token, {
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

  getUser = async (req, res) => {
    const { id, role } = req;

    try {
      if (role === "admin") {
        const adminInfo = await adminModel.findById(id);
        responseReturn(res, 200, { userInfo: adminInfo });
      } else {
        const sellerInfo = await sellerModel.findById(id);
        responseReturn(res, 200, { userInfo: sellerInfo });
      }
    } catch (error) {
      return responseReturn(res, 500, { error: error.message });
    }
  };

  seller_register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const existSeller = await sellerModel.findOne({ email });

      // console.log(admin);
      if (existSeller) {
        return responseReturn(res, 404, {
          error: "Email has alreaded registered",
        });
      }

      const hasedPassword = await bcrypt.hash(password, 10);

      const newSeller = await sellerModel.create({
        name,
        email,
        password: hasedPassword,
        method: "manual",
        shopInfo: {},
      });

      await sellerToCustomer.create({
        sellerId: newSeller.id,
      });

      const token = await createToken({
        id: newSeller.id,
        role: newSeller.role,
      });

      res.cookie("accessToken", token, {
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

  seller_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const seller = await sellerModel.findOne({ email }).select("+password");

      if (!seller) {
        return responseReturn(res, 404, { error: "Email not Found" });
      }

      const passwordInDB = seller.password;
      const isMatch = await bcrypt.compare(password, passwordInDB);

      if (!isMatch) {
        return responseReturn(res, 404, { error: "Password not match" });
      }

      const token = await createToken({
        id: seller.id,
        role: seller.role,
      });

      res.cookie("accessToken", token, {
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

module.exports = new authControllers();
