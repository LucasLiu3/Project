import { NavLink } from "react-router-dom";

function ChatList({ customers }) {
  return (
    <>
      {customers.map((each, index) => (
        <NavLink
          key={index}
          className={({ isActive }) =>
            `h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-md cursor-pointer 
             ${isActive ? "bg-[#8288ed]" : "bg-transparent"}`
          }
          to={`/seller/customer_chat/${each.fbId}`}
        >
          <div className="relative">
            <img
              className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
              src={each.image || "http://localhost:3000/images/admin.jpg"}
              alt=""
            />
            <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
          </div>

          <div className="flex justify-center items-start flex-col w-full">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-base font-semibold">{each.name}</h2>
            </div>
          </div>
        </NavLink>
      ))}
    </>
  );
}

export default ChatList;
