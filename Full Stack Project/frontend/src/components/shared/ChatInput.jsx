import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { seller_message_customer } from "../../store/Reducers/chatInReducer";

function ChatInput({ userInfo, customerId }) {
  const [sendText, setSendText] = useState("");

  const dispatch = useDispatch();

  function send(e) {
    e.preventDefault();
    if (sendText === "") return toast.error("Please input message");

    dispatch(
      seller_message_customer({
        senderId: userInfo._id,
        receivewId: customerId,
        sendText,
        name: userInfo?.shopInfo?.shopName,
      })
    );
    setSendText("");
  }

  return (
    <form onSubmit={send} className="flex gap-3">
      <input
        className="w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent text-[#d0d2d6]"
        type="text"
        placeholder="Input Your Message"
        value={sendText}
        onChange={(e) => setSendText(e.target.value)}
      />
      <button className="shadow-lg bg-[#06b6d4] hover:shadow-cyan-500/50 text-semibold w-[75px] h-[35px] rounded-md text-white flex justify-center items-center">
        Send
      </button>
    </form>
  );
}

export default ChatInput;
