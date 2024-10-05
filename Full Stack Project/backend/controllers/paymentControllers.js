const stripeModel = require("../models/stripeModel");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const allPaymentModel = require("../models/AllPaymentModel");
const sellerPaymentModel = require("../models/SellerPayment");
const sellerWithdrawModel = require("../models/sellerWithdraw");

const { responseReturn } = require("../utilities/response");
const sellerModel = require("../models/sellerModel");
const customerOrder = require("../models/customerOrder");
const adminOrder = require("../models/adminOrder");
const {
  mongo: { ObjectId },
} = require("mongoose");

const moment = require("moment");

class paymentControllers {
  seller_create_payment_account = async (req, res) => {
    const { id } = req;
    const uid = uuidv4();

    try {
      const stripeInfo = await stripeModel.findOne({
        sellerId: id,
      });

      if (stripeInfo) {
        await stripeModel.deleteOne({ sellerId: id });
      }

      const stripeAccount = await stripe.accounts.create({
        type: "express",
      });

      const accountLink = await stripe.accountLinks.create({
        account: stripeAccount.id,
        refresh_url: "http://localhost:3000/refresh",
        return_url: `http://localhost:3000/success?activeCode=${uid}`,
        type: "account_onboarding",
      });

      await stripeModel.create({
        sellerId: id,
        stripeId: stripeAccount.id,
        code: uid,
      });

      return responseReturn(res, 200, {
        url: accountLink.url,
      });
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { error: error.message });
    }
  };

  seller_update_payment_status = async (req, res) => {
    const { sellerId } = req.params;

    try {
      await sellerModel.findByIdAndUpdate(sellerId, {
        payment: "active",
      });

      return responseReturn(res, 200);
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { error: error.message });
    }
  };

  create_payment = async (req, res) => {
    const { orderId } = req.params;

    try {
      const allMoney = await customerOrder.findById(orderId);

      const splitOrder = await adminOrder.find({
        orderId: new Object(orderId),
      });

      const time = moment(Date.now()).format("l");
      const splitTime = time.split("/");

      await allPaymentModel.create({
        amount: allMoney.price,
        month: splitTime[0],
        year: splitTime[2],
      });

      for (let i = 0; i < splitOrder.length; i++) {
        await sellerPaymentModel.create({
          sellerId: splitOrder[i].sellerId.toString(),
          amount: splitOrder[i].price,
          month: splitTime[0],
          year: splitTime[2],
        });
      }
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { error: error.message });
    }
  };

  get_seller_payment_details = async (req, res) => {
    const { sellerId } = req.params;

    try {
      const payments = await sellerPaymentModel.find({ sellerId });

      const pendingWithdraws = await sellerWithdrawModel.find({
        $and: [
          {
            sellerId: { $eq: sellerId },
          },
          {
            status: { $eq: "pending" },
          },
        ],
      });

      const successWithdraws = await sellerWithdrawModel.find({
        $and: [
          {
            sellerId: { $eq: sellerId },
          },
          {
            status: { $eq: "approved" },
          },
        ],
      });

      const totalAmount = payments.reduce((cur, each) => cur + each.amount, 0);
      const pendingAmount = pendingWithdraws.reduce(
        (cur, each) => cur + each.amount,
        0
      );
      const successAmount = successWithdraws.reduce(
        (cur, each) => cur + each.amount,
        0
      );

      let availableAmount = 0;
      if (totalAmount > 0) {
        availableAmount = totalAmount - (pendingAmount + successAmount);
      }

      return responseReturn(res, 200, {
        pendingWithdraws,
        successWithdraws,
        totalAmount,
        pendingAmount,
        successAmount,
        availableAmount,
      });
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { error: error.message });
    }
  };

  seller_request_withdraw = async (req, res) => {
    const { sellerId, withdraw } = req.body;
    try {
      await sellerWithdrawModel.create({
        sellerId,
        amount: parseInt(withdraw),
      });

      return responseReturn(res, 200, {
        message: "Request sent success",
      });
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { error: error.message });
    }
  };

  admin_get_withdraw = async (req, res) => {
    try {
      const withdrawRequest = await sellerWithdrawModel.find({
        status: "pending",
      });

      return responseReturn(res, 200, {
        withdrawRequest,
      });
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { error: error.message });
    }
  };

  admin_approve_withdraw = async (req, res) => {
    const { requestId } = req.params;

    console.log(requestId);
    try {
      await sellerWithdrawModel.findByIdAndUpdate(requestId, {
        status: "approved",
      });

      return responseReturn(res, 200, {
        message: "Request approved",
      });
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new paymentControllers();
