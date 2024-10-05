import { useEffect, useRef, useState } from "react";

import { IoMdClose } from "react-icons/io";
import { FaList } from "react-icons/fa6";
import ChatList from "../../components/shared/ChatList";
import ChatTo from "../../components/shared/ChatTo";
import ChatContent from "../../components/shared/ChatContent";
import ChatInput from "../../components/shared/ChatInput";
import { useDispatch, useSelector } from "react-redux";
import {
  messageClear,
  seller_get_customers,
  seller_get_customers_message,
  updateMessage,
} from "../../store/Reducers/chatInReducer";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import socket from "../../utils/socket";

function SellerChatCustomer() {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const { customerId } = useParams();

  const { messages, customers, currentCustomer, successMessage } = useSelector(
    (state) => state.chatIn
  );

  const [messageSocket, setMessageSocket] = useState("");
  const [activeCustomer, setActiveCustomer] = useState([]);

  useEffect(
    function () {
      dispatch(seller_get_customers(userInfo._id));
    },
    [userInfo, dispatch]
  );

  useEffect(
    function () {
      if (customerId) {
        dispatch(seller_get_customers_message(customerId));
      }
    },
    [customerId, dispatch]
  );

  useEffect(
    function () {
      if (successMessage) {
        socket.emit("send_seller_message", messages[messages.length - 1]);
        dispatch(messageClear());
      }
    },
    [successMessage, messages, dispatch]
  );

  // useEffect(function () {
  //   socket.on("customer_messages", (newMessages) => {
  //     setMessageSocket(newMessages);
  //   });
  // }, []);

  // useEffect(
  //   function () {
  //     if (messageSocket) {
  //       if (
  //         customerId === messageSocket.senderId &&
  //         userInfo._id === messageSocket.receivewId
  //       ) {
  //         dispatch(updateMessage(messageSocket));
  //       } else {
  //         toast.success(`A message from ${messageSocket.senderName}`, {
  //           autoClose: 1500,
  //         });
  //       }
  //     }
  //   },
  //   [messageSocket, userInfo, customerId, dispatch]
  // );

  // useEffect(function () {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, []);

  return (
    <div className="w-full bg-[#6a5fdf] px-4 py-4 rounded-md h-[calc(100vh-140px)]">
      <div className="flex w-full h-full relative">
        <div
          className={`w-[280px] h-full absolute z-10 ${
            show ? "-left-[16px]" : "-left-[336px]"
          } md:left-0 md:relative transition-all `}
        >
          <div className="w-full h-[calc(100vh-177px)] bg-[#9e97e9] md:bg-transparent overflow-y-auto">
            <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white">
              <h2>Customers</h2>
              <span
                onClick={() => setShow(!show)}
                className="block cursor-pointer md:hidden"
              >
                <IoMdClose />{" "}
              </span>
            </div>

            <div className="mt-5">
              <ChatList customers={customers}></ChatList>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[calc(100%-200px)] md:pl-4">
          <div className="flex justify-between items-center">
            {userInfo._id && (
              <ChatTo
                currentCustomer={currentCustomer}
                customerId={customerId}
              ></ChatTo>
            )}

            <div
              onClick={() => setShow(!show)}
              className="w-[35px] flex md:hidden h-[35px] rounded-sm bg-blue-500 shadow-lg hover:shadow-blue-500/50 justify-center cursor-pointer items-center text-white"
            >
              <span>
                <FaList />{" "}
              </span>
            </div>
          </div>

          <div className="py-4">
            <div className="bg-[#475569] h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
              <ChatContent
                messages={messages}
                customerId={customerId}
                // ref={scrollRef}
              ></ChatContent>
            </div>
          </div>

          <ChatInput userInfo={userInfo} customerId={customerId}></ChatInput>
        </div>
      </div>
    </div>
  );
}

export default SellerChatCustomer;
