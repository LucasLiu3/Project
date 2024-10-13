import { useEffect, useRef, useState } from "react";

import { IoMdClose } from "react-icons/io";
import { FaList } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";
import {
  admin_get_sellers,
  admin_message_seller,
  admin_get_messages,
  messageClear,
} from "../../store/Reducers/chatInReducer";
import { NavLink, useParams } from "react-router-dom";
import socket from "./../../utils/socket";

function AdminChat() {
  const [show, setShow] = useState(false);

  const scrollref = useRef();

  const dispatch = useDispatch();

  const { sellerId } = useParams();

  const [text, setText] = useState("");

  const {
    sellers,
    activeSeller,
    seller_admin_message,
    currentSeller,
    successMessage,
  } = useSelector((state) => state.chatIn);

  useEffect(
    function () {
      dispatch(admin_get_sellers());
    },
    [dispatch]
  );

  function sendText(e) {
    e.preventDefault();
    dispatch(
      admin_message_seller({
        senderId: "",
        receivewId: sellerId,
        message: text,
        senderName: "admin",
      })
    );
    setText("");
  }

  useEffect(
    function () {
      if (sellerId) {
        dispatch(admin_get_messages(sellerId));
      }
    },
    [sellerId, dispatch]
  );

  const filter = activeSeller.some(
    (each) => each.sellerId === currentSeller._id
  );

  useEffect(
    function () {
      if (successMessage) {
        if (filter) {
          socket.emit(
            "send_message_admin_to_seller",
            seller_admin_message[seller_admin_message.length - 1]
          );

          dispatch(messageClear());
        } else {
          dispatch(messageClear());
        }
      }
    },
    [successMessage, seller_admin_message, dispatch, filter]
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
    <div className="w-full bg-[#f8f9fa]  px-4 py-4 rounded-md h-[calc(100vh-140px)]">
      <div className="flex w-full h-full relative">
        <div
          className={`w-[280px] h-full absolute z-10 ${
            show ? "-left-[16px]" : "-left-[336px]"
          } md:left-0 md:relative transition-all `}
        >
          <div className="w-full h-[calc(100vh-177px)] bg-[#9e97e9] md:bg-transparent overflow-y-auto">
            <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-[#212529]">
              <h2>Sellers</h2>
              <span
                onClick={() => setShow(!show)}
                className="block cursor-pointer md:hidden"
              >
                <IoMdClose />{" "}
              </span>
            </div>

            <div className="mt-5">
              {sellers.map((each, index) => (
                <NavLink
                  key={index}
                  className={({ isActive }) =>
                    `h-[60px] flex justify-start gap-2 items-center text-[#212529] px-2 py-2 rounded-md cursor-pointer 
                     ${isActive ? "bg-indigo-300" : "bg-transparent"}`
                  }
                  to={`/admin/chat/${each._id}`}
                >
                  <div className="relative">
                    <img
                      className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
                      src={
                        each.image ||
                        "http://localhost:3000/images/image/register.jpg"
                      }
                      alt=""
                    />

                    {activeSeller.some((i) => i.sellerId === each._id) && (
                      <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                    )}
                  </div>

                  <div className="flex justify-center items-start flex-col w-full">
                    <div className="flex justify-between items-center w-full">
                      <h2 className="text-base font-semibold">{each.name}</h2>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-[calc(100%-200px)] md:pl-4">
          <div className="flex justify-between items-center">
            {currentSeller && (
              <div className="flex justify-start items-center gap-3">
                <div className="relative flex">
                  <img
                    className="w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] p-[2px] rounded-full"
                    src={
                      currentSeller.image ||
                      "http://localhost:3000/images/image/register.jpg"
                    }
                    alt=""
                  />
                  {activeSeller.some(
                    (i) => i.sellerId === currentSeller._id
                  ) && (
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  )}
                </div>
                <div>{currentSeller.name}</div>
              </div>
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
            <div className="bg-slate-300 h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
              {sellerId ? (
                seller_admin_message.map((each, index) => {
                  if (each.senderId === sellerId) {
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
                              src={
                                currentSeller.image ||
                                "http://localhost:3000/images/image/register.jpg"
                              }
                              alt=""
                            />
                          </div>
                          <div className="flex justify-center items-start flex-col w-full bg-white  text-[#212529] py-2 px-3 rounded-md">
                            <span>{each.message}</span>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        className="w-full flex justify-end items-center"
                        key={index}
                        ref={scrollref}
                      >
                        <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                          <div className="flex justify-center items-start flex-col w-full bg-green-500  text-[#212529] py-2 px-3 rounded-md">
                            <span>{each.message}</span>
                          </div>
                          <div>
                            <img
                              className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
                              src="http://localhost:3000/images/admin.png"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }
                })
              ) : (
                <div className="w-full h-full flex justify-center items-center text-white gap-2 flex-col">
                  <span>Select seller</span>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={sendText} className="flex gap-3">
            <input
              className="w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent text-[#212529]"
              type="text"
              placeholder="Input Your Message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              readOnly={sellerId ? false : true}
            />
            <button
              disabled={sellerId ? false : true}
              className="shadow-lg bg-[#06b6d4] hover:shadow-cyan-500/50 text-semibold w-[75px] h-[35px] rounded-md text-white flex justify-center items-center"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminChat;
