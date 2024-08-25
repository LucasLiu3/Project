import ChatTo from "../../components/shared/ChatTo";
import ChatContent from "../../components/shared/ChatContent";
import ChatInput from "../../components/shared/ChatInput";

function SellerChatAdmin() {
  return (
    <div className="w-full bg-[#6a5fdf] px-4 py-4 rounded-md h-[calc(100vh-140px)]">
      <div className="flex w-full h-full relative">
        <div className="w-full  md:pl-4">
          <div className="flex justify-between items-center">
            <ChatTo></ChatTo>
          </div>

          <div className="py-4">
            <div className="bg-[#475569] h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
              <ChatContent></ChatContent>
            </div>
          </div>

          <ChatInput></ChatInput>
        </div>
      </div>
    </div>
  );
}

export default SellerChatAdmin;
