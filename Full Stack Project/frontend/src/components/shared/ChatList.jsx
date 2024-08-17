function ChatList() {
  return (
    <>
      <div
        className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-md cursor-pointer bg-[#8288ed]  `}
      >
        <div className="relative">
          <img
            className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
            src="http://localhost:3000/images/admin.jpg"
            alt=""
          />
          <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
        </div>

        <div className="flex justify-center items-start flex-col w-full">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-base font-semibold">Kazi Ariyan</h2>
          </div>
        </div>
      </div>

      <div
        className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-sm cursor-pointer`}
      >
        <div className="relative">
          <img
            className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
            src="http://localhost:3000/images/admin.jpg"
            alt=""
          />
          <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
        </div>

        <div className="flex justify-center items-start flex-col w-full">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-base font-semibold">Jhon</h2>
          </div>
        </div>
      </div>

      <div
        className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-sm cursor-pointer`}
      >
        <div className="relative">
          <img
            className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
            src="http://localhost:3000/images/admin.jpg"
            alt=""
          />
          <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
        </div>

        <div className="flex justify-center items-start flex-col w-full">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-base font-semibold">Raju</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatList;
