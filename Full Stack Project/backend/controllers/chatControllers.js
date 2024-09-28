const chatModel = require("../models/chat/chatModel");
const customerModel = require("../models/customerModel");
const sellerModel = require("../models/sellerModel");

const { responseReturn } = require("../utilities/response");
const chatMessagesModel = require("../models/chat/chatMessagesModel");

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
}

module.exports = new chatControllers();
