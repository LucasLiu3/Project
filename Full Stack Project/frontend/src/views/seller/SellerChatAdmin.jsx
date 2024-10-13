import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  admin_message_seller,
  seller_get_messages,
  messageClear,
} from "../../store/Reducers/chatInReducer";
import socket from "./../../utils/socket";

function SellerChatAdmin() {
  const { userInfo } = useSelector((state) => state.auth);

  const scrollref = useRef();

  const {
    sellers,
    activeSeller,
    seller_admin_message,
    currentSeller,
    successMessage,
    activeAdmin,
  } = useSelector((state) => state.chatIn);

  const dispatch = useDispatch();
  const [text, setText] = useState("");

  function sendText(e) {
    e.preventDefault();
    dispatch(
      admin_message_seller({
        senderId: userInfo._id,
        receivewId: "",
        message: text,
        senderName: userInfo.name,
      })
    );
    setText("");
  }

  useEffect(
    function () {
      dispatch(seller_get_messages());
    },
    [dispatch]
  );

  useEffect(
    function () {
      if (successMessage) {
        socket.emit(
          "send_message_seller_to_admin",
          seller_admin_message[seller_admin_message.length - 1]
        );

        dispatch(messageClear());
      }
    },
    [successMessage, seller_admin_message, dispatch]
  );

  useEffect(
    function () {
      if (scrollref.current) {
        scrollref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    },
    [seller_admin_message]
  );

  return (
    <div className="w-full bg-[#f8f9fa] px-4 py-4 rounded-md h-[calc(100vh-140px)]">
      <div className="flex w-full h-full relative">
        <div className="w-full  md:pl-4">
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-3">
              <div className="relative flex">
                <img
                  className="w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] p-[2px] rounded-full"
                  src="http://localhost:3000/images/admin.png"
                  alt=""
                />
                {Object.keys(activeAdmin).length !== 0 && (
                  <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                )}
              </div>
              <div>Admin</div>
            </div>
          </div>

          <div className="py-4">
            <div className="bg-slate-300 h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
              {seller_admin_message.map((each, index) => {
                if (each.senderId === userInfo._id) {
                  return (
                    <div
                      className="w-full flex justify-end items-center"
                      key={index}
                      ref={scrollref}
                    >
                      <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                        <div className="flex justify-center items-start flex-col w-full bg-green-500 shadow-lg text-[#212529] py-2 px-3 rounded-md">
                          <span>{each.message}</span>
                        </div>
                        <div>
                          <img
                            className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
                            src={
                              userInfo.image ||
                              "http://localhost:3000/images/image/register.jpg"
                            }
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="w-full flex justify-start items-center"
                      key={index}
                      ref={scrollref}
                    >
                      <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                        <div>
                          <img
                            className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
                            src="http://localhost:3000/images/admin.png"
                            alt=""
                          />
                        </div>
                        <div className="flex justify-center items-start flex-col w-full bg-white  text-[#212529] py-2 px-3 rounded-md">
                          <span>{each.message}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>

          <form onSubmit={sendText} className="flex gap-3">
            <input
              className="w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent text-[#212529]"
              type="text"
              placeholder="Input Your Message"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button className="shadow-lg bg-[#06b6d4] hover:shadow-cyan-500/50 text-semibold w-[75px] h-[35px] rounded-md text-white flex justify-center items-center">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SellerChatAdmin;
