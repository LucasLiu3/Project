const adminModel = require("../models/adminModel");
const sellerModel = require("../models/sellerModel");
const chatModel = require("../models/chat/chatModel");

const allPaymentModel = require("../models/AllPaymentModel");
const sellerPaymentModel = require("../models/SellerPayment");

const productModel = require("../models/productModel");

const customerOrder = require("../models/customerOrder");

const adminSellerModel = require("../models/chat/adminSellerMessage");

const { responseReturn } = require("../utilities/response");
const bcrypt = require("bcrypt");
const { createToken } = require("../utilities/tokenCreate");
const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;

const {
  mongo: { ObjectId },
} = require("mongoose");

const adminOrder = require("../models/adminOrder");
const chatMessagesModel = require("../models/chat/chatMessagesModel");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
  secure: true,
});

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

      await chatModel.create({
        myId: newSeller.id,
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

  update_profile_image = async (req, res) => {
    const form = formidable({ multiples: true });
    const { id } = req;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        responseReturn(res, 404, { error: "Something wrong, try again" });
      } else {
        try {
          const uplodaImage = files.profileImage;

          const result = await cloudinary.uploader.upload(
            uplodaImage.filepath,
            {
              folder: "profile",
            }
          );

          if (!result) return;

          const updateImage = await sellerModel.findByIdAndUpdate(
            id,
            { image: result.url },
            { new: true }
          );

          return responseReturn(res, 201, {
            message: "Image Updated Successfully",
            updateInfo: updateImage,
          });
        } catch (err) {
          console.log(err);
          responseReturn(res, 500, { error: err.message });
        }
      }
    });
  };

  update_shop_info = async (req, res) => {
    const { id } = req;

    const shopInfo = req.body;

    try {
      const updateShop = await sellerModel.findByIdAndUpdate(
        id,
        { shopInfo: shopInfo },
        { new: true }
      );

      return responseReturn(res, 201, {
        message: "Shop Info Updated Successfully",
        updateInfo: updateShop,
      });
    } catch (error) {
      console.log(err);
      responseReturn(res, 500, { error: err.message });
    }
  };

  admin_get_dashboard_data = async (req, res) => {
    const { id } = req;

    try {
      const totalSale = await allPaymentModel.aggregate([
        {
          $group: {
            _id: null,
            totalAmount: {
              $sum: "$amount",
            },
          },
        },
      ]);

      const totalProduct = await productModel.find({}).countDocuments();

      const totalOrder = await customerOrder.find({}).countDocuments();

      const totalSeller = await sellerModel.find({}).countDocuments();

      const messages = await adminSellerModel
        .find({ senderName: { $ne: "admin" } })
        .sort({ createdAt: -1 })
        .limit(3);

      const recentOrder = await customerOrder.find({}).limit(5);

      return responseReturn(res, 201, {
        totalProduct,
        totalOrder,
        totalSeller,
        messages,
        recentOrder,
        totalSale: totalSale[0].totalAmount,
      });
    } catch (error) {
      console.log(err);
      responseReturn(res, 500, { error: err.message });
    }
  };

  seller_get_dashboard_data = async (req, res) => {
    const { id } = req;

    try {
      const totalSale = await sellerPaymentModel.aggregate([
        {
          $match: {
            sellerId: { $eq: id },
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: {
              $sum: "$amount",
            },
          },
        },
      ]);

      const totalProduct = await productModel
        .find({
          sellerId: new Object(id),
        })
        .countDocuments();
      console.log("1");
      const totalOrder = await adminOrder
        .find({ sellerId: new Object(id) })
        .countDocuments();
      console.log("2");
      const totalPendingOrder = await adminOrder
        .find({
          $and: [
            {
              sellerId: { $eq: new Object(id) },
            },
            {
              delivery_status: {
                $eq: "pending",
              },
            },
          ],
        })
        .countDocuments();

      console.log("3");
      const messages = await chatMessagesModel
        .find({ receivewId: { $eq: new Object(id) } })
        .sort({ createdAt: -1 })
        .limit(3);

      console.log("4");
      const recentOrder = await adminOrder
        .find({ sellerId: new Object(id) })
        .sort({ createdAt: -1 })
        .limit(5);
      console.log("5");
      return responseReturn(res, 201, {
        totalProduct,
        totalOrder,
        totalPendingOrder,
        messages,
        recentOrder,
        totalSale: totalSale[0]?.totalAmount ? totalSale[0].totalAmount : 0,
      });
    } catch (error) {
      console.log(error.message);
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new authControllers();
