const chatModel = require("../models/chat/chatModel");
const customerModel = require("../models/customerModel");
const sellerModel = require("../models/sellerModel");
const chatMessagesModel = require("../models/chat/chatMessagesModel");
const adminSellerModel = require("../models/chat/adminSellerMessage");

const { responseReturn } = require("../utilities/response");

class chatControllers {
  customer_add_friends = async (req, res) => {
    const { sellerId, customerId } = req.body;

    try {
      if (sellerId !== "") {
        const seller = await sellerModel.findById(sellerId);

        const customer = await customerModel.findById(customerId);

        const checkSeller = await chatModel.findOne({
          myId: customerId,
          othersId: {
            $elemMatch: { fbId: sellerId },
          },
        });

        if (!checkSeller) {
          await chatModel.updateOne(
            {
              myId: customerId,
            },
            {
              $push: {
                othersId: {
                  fbId: sellerId,
                  name: seller.shopInfo?.shopName,
                  image: seller.image,
                },
              },
            }
          );
        }

        const checkCustomer = await chatModel.findOne({
          $and: [
            {
              myId: {
                $eq: sellerId,
              },
              othersId: {
                $elemMatch: { fbId: customerId },
              },
            },
          ],
        });

        if (!checkCustomer) {
          await chatModel.updateOne(
            {
              myId: sellerId,
            },
            {
              $push: {
                othersId: {
                  fbId: customerId,
                  name: customer.name,
                  image: "",
                },
              },
            }
          );
        }

        const messages = await chatMessagesModel.find({
          $or: [
            {
              $and: [
                { receivewId: { $eq: sellerId } },
                { senderId: { $eq: customerId } },
              ],
            },
            {
              $and: [
                { receivewId: { $eq: customerId } },
                { senderId: { $eq: sellerId } },
              ],
            },
          ],
        });

        const myFriends = await chatModel.findOne({
          myId: customerId,
        });

        const currentFriend = myFriends.othersId.find(
          (each) => each.fbId === sellerId
        );

        return responseReturn(res, 200, {
          friendsList: myFriends.othersId,
          currentFriend,
          messages,
        });
      } else {
        const myFriends = await chatModel.findOne({
          myId: customerId,
        });
        return responseReturn(res, 200, {
          friendsList: myFriends.othersId,
        });
      }
    } catch (error) {
      return responseReturn(res, 500, { error: error.message });
    }
  };

  send_message_to_seller = async (req, res) => {
    const { sendText, customerId, sellerId, name } = req.body;

    try {
      const newMessage = await chatMessagesModel.create({
        senderName: name,
        senderId: customerId,
        receivewId: sellerId,
        messages: sendText,
      });

      const customer_friends_list = await chatModel.findOne({
        myId: customerId,
      });

      let oldFriendList = customer_friends_list.othersId;

      const currentOne = oldFriendList.find((each) => each.fbId === sellerId);
      const restOnes = oldFriendList.filter((each) => each.fbId !== sellerId);

      const newFriendList = [currentOne, ...restOnes];

      await chatModel.updateOne(
        {
          myId: customerId,
        },
        { othersId: newFriendList }
      );

      const seller_friends_list = await chatModel.findOne({
        myId: sellerId,
      });

      let seller_oldFriendList = seller_friends_list.othersId;

      const seller_currentOne = seller_oldFriendList.find(
        (each) => each.fbId === customerId
      );
      const seller_restOnes = seller_oldFriendList.filter(
        (each) => each.fbId !== customerId
      );

      const seller_newFriendList = [seller_currentOne, ...seller_restOnes];

      await chatModel.updateOne(
        {
          myId: sellerId,
        },
        { othersId: seller_newFriendList }
      );

      return responseReturn(res, 201, {
        newMessage,
        friendsList: newFriendList,
      });
    } catch (error) {
      return responseReturn(res, 500, { error: error.message });
    }
  };

  seller_get_customers = async (req, res) => {
    const { sellerId } = req.params;

    try {
      const seller_customer = await chatModel.findOne({
        myId: sellerId,
      });

      return responseReturn(res, 200, {
        customers: seller_customer.othersId,
      });
    } catch (error) {
      return responseReturn(res, 500, { error: error.message });
    }
  };

  seller_get_customers_message = async (req, res) => {
    const { customerId } = req.params;
    // this id is from authMiddeleware
    const { id } = req;

    try {
      const messages = await chatMessagesModel.find({
        $or: [
          {
            $and: [
              { receivewId: { $eq: customerId } },
              { senderId: { $eq: id } },
            ],
          },
          {
            $and: [
              { receivewId: { $eq: id } },
              { senderId: { $eq: customerId } },
            ],
          },
        ],
      });

      const currentCustomer = await customerModel.findById(customerId);

      return responseReturn(res, 200, {
        messages,
        currentCustomer,
      });
    } catch (error) {
      return responseReturn(res, 500, { error: error.message });
    }
  };

  seller_message_customer = async (req, res) => {
    const { senderId, receivewId, sendText, name } = req.body;
    const { id } = req;

    try {
      const newMessage = await chatMessagesModel.create({
        senderName: name,
        senderId: senderId,
        receivewId: receivewId,
        messages: sendText,
      });

      const customer_friends_list = await chatModel.findOne({
        myId: senderId,
      });

      let oldFriendList = customer_friends_list.othersId;

      const currentOne = oldFriendList.find((each) => each.fbId === receivewId);
      const restOnes = oldFriendList.filter((each) => each.fbId !== receivewId);

      const newFriendList = [currentOne, ...restOnes];

      await chatModel.updateOne(
        {
          myId: senderId,
        },
        { othersId: newFriendList }
      );

      const seller_friends_list = await chatModel.findOne({
        myId: receivewId,
      });

      let seller_oldFriendList = seller_friends_list.othersId;

      const seller_currentOne = seller_oldFriendList.find(
        (each) => each.fbId === senderId
      );
      const seller_restOnes = seller_oldFriendList.filter(
        (each) => each.fbId !== senderId
      );

      const seller_newFriendList = [seller_currentOne, ...seller_restOnes];

      await chatModel.updateOne(
        {
          myId: receivewId,
        },
        { othersId: seller_newFriendList }
      );

      const currentCustomer = await customerModel.findById(receivewId);

      return responseReturn(res, 201, {
        newMessage,
        friendsList: newFriendList,
        currentCustomer,
      });
    } catch (error) {
      return responseReturn(res, 500, { error: error.message });
    }
  };

  admin_get_sellers = async (req, res) => {
    try {
      const allSellers = await sellerModel.find();

      return responseReturn(res, 200, {
        sellers: allSellers,
      });
    } catch (error) {
      return responseReturn(res, 500, { error: error.message });
    }
  };

  admin_message_seller = async (req, res) => {
    const { senderId, receivewId, message, senderName } = req.body;
    try {
      const messageDate = await adminSellerModel.create({
        senderId,
        receivewId,
        message,
        senderName,
      });

      return responseReturn(res, 200, {
        message: messageDate,
      });
    } catch (error) {
      return responseReturn(res, 500, { error: error.message });
    }
  };

  admin_get_messages = async (req, res) => {
    const { sellerId } = req.params;
    const id = "";
    try {
      const messages = await adminSellerModel.find({
        $or: [
          {
            $and: [
              { receivewId: { $eq: sellerId } },
              { senderId: { $eq: id } },
            ],
          },
          {
            $and: [
              { receivewId: { $eq: id } },
              { senderId: { $eq: sellerId } },
            ],
          },
        ],
      });

      let currentSeller = {};
      if (sellerId) {
        currentSeller = await sellerModel.findById(sellerId);
      }
      return responseReturn(res, 200, {
        messages,
        currentSeller,
      });
    } catch (error) {
      return responseReturn(res, 500, { error: error.message });
    }
  };

  seller_get_messages = async (req, res) => {
    const { id } = req;
    const receivewId = "";
    try {
      const messages = await adminSellerModel.find({
        $or: [
          {
            $and: [
              { receivewId: { $eq: receivewId } },
              { senderId: { $eq: id } },
            ],
          },
          {
            $and: [
              { receivewId: { $eq: id } },
              { senderId: { $eq: receivewId } },
            ],
          },
        ],
      });

      return responseReturn(res, 200, {
        messages,
      });
    } catch (error) {
      return responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new chatControllers();
