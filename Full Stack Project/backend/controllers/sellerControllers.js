const sellerModel = require("../models/sellerModel");

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

class sellerControllers {
  sellers_get = async (req, res) => {
    try {
      const sellersInfo = await sellerModel.find({});
      responseReturn(res, 200, { sellersInfo: sellersInfo });
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { error: error.message });
    }
  };

  seller_get = async (req, res) => {
    const { sellerID } = req.params;
    console.log(sellerID);
    try {
      const sellerInfo = await sellerModel.findById(sellerID);
      responseReturn(res, 200, { sellerInfo: sellerInfo });
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { error: error.message });
    }
  };

  seller_update = async (req, res) => {
    const { sellerID, status } = req.body;

    try {
      const sellerInfo = await sellerModel.findByIdAndUpdate(
        sellerID,
        {
          status: status,
        },
        { new: true }
      );
      responseReturn(res, 200, {
        sellerInfo: sellerInfo,
        message: "Seller Status Updated",
      });
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new sellerControllers();
