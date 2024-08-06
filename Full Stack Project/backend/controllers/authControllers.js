const adminModel = require("../models/adminModel");
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

        responseReturn(res, 200, adminInfo);
      } else {
        // const sellerInfo = await sellerModel.findById(id);

        // responseReturn(res, 200, sellerInfo);
        console.log("预定位置给 卖家");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new authControllers();
