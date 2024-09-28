import { useEffect, useState } from "react";
import { AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import io from "socket.io-client";
import {
  customer_add_friends,
  send_message_to_seller,
} from "../../../store/Reducers/chatReducer";
import toast from "react-hot-toast";
const socket = io("http://localhost:5000");

function Chat() {
  const dispatch = useDispatch();

  const { sellerId } = useParams();

  const { customerInfo } = useSelector((state) => state.customer);

  const { customer_side, customer_current_friend, customer_side_messages } =
    useSelector((state) => state.chat);

  const [sendText, setSendText] = useState("");

  useEffect(
    function () {
      socket.emit("add_user", customerInfo.id, customerInfo);
    },
    [customerInfo]
  );

  useEffect(
    function () {
      dispatch(
        customer_add_friends({
          sellerId: sellerId || "",
          customerId: customerInfo.id,
        })
      );
    },
    [dispatch, sellerId, customerInfo]
  );

  function send() {
    if (sendText === "") toast.error("Please input message");

    dispatch(
      send_message_to_seller({
        sendText,
        customerId: customerInfo.id,
        sellerId,
        name: customerInfo.name,
      })
    );
    setSendText("");
  }

  return (
    <div className="bg-white p-3 rounded-md">
      <div className="w-full flex">
        <div className="w-[230px]">
          <div className="flex justify-center gap-3 items-center text-slate-600 text-xl h-[50px]">
            <span>
              <AiOutlineMessage />
            </span>
            <span>Message</span>
          </div>
          <div className="w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3 gap-3">
            {customer_side?.map((each, index) => (
              <Link
                key={index}
                to={`/customerDashboard/chat/${each.fbId}`}
                className={`flex gap-2 justify-start items-center pl-2 py-[5px] hover:bg-indigo-300`}
              >
                <div className="w-[30px] h-[30px] rounded-full relative">
                  <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>

                  <img src={each.image} alt="" />
                </div>
                <span>{each.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-[calc(100%-230px)]">
          {customer_current_friend ? (
            <div className="w-full h-full">
              <div className="flex justify-start gap-3 items-center text-slate-600 text-xl h-[50px]">
                <div className="w-[30px] h-[30px] rounded-full relative">
                  <div className="w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>

                  <img src={customer_current_friend.image} alt="" />
                </div>
                <span>{customer_current_friend.name}</span>
              </div>
              <div className="h-[400px] w-full bg-slate-100 p-3 rounded-md">
                <div className="w-full h-full overflow-y-auto flex flex-col gap-3">
                  {customer_side_messages.map((each, index) => {
                    if (customer_current_friend?.fbId !== each.receivewId) {
                      return (
                        <div
                          key={index}
                          className="w-full flex gap-2 justify-start items-center text-[14px]"
                        >
                          <img
                            className="w-[30px] h-[30px]"
                            src="http://localhost:3000/images/user.png"
                            alt=""
                          />
                          <div className="p-2 bg-purple-500 text-white rounded-md">
                            <span>{each.messages}</span>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={index}
                          className="w-full flex gap-2 justify-end items-center text-[14px]"
                        >
                          <img
                            className="w-[30px] h-[30px]"
                            src="http://localhost:3000/images/user.png"
                            alt=""
                          />
                          <div className="p-2 bg-cyan-500 text-white rounded-md">
                            <span>{each.messages}</span>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="flex p-2 justify-between items-center w-full">
                <div className="w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full">
                  <label className="cursor-pointer" htmlFor="">
                    <AiOutlinePlus />
                  </label>
                  <input className="hidden" type="file" />
                </div>
                <div className="border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative">
                  <input
                    type="text"
                    placeholder="input message"
                    className="w-full rounded-full h-full outline-none p-3"
                    value={sendText}
                    onChange={(e) => setSendText(e.target.value)}
                  />
                  <div className="text-2xl right-2 top-2 absolute cursor-auto">
                    <span>
                      <GrEmoji />
                    </span>
                  </div>
                </div>
                <div className="w-[40px] p-2 justify-center items-center rounded-full">
                  <div className="text-2xl cursor-pointer" onClick={send}>
                    <IoSend />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center text-lg ont-bold text-slate-600  border-l">
              <span>select seller</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
