function ChatContent() {
  return (
    <div className="mt-3">
      <div className="w-full flex justify-start items-center">
        <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
          <div>
            <img
              className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
              src="http://localhost:3000/images/demo.jpg"
              alt=""
            />
          </div>
          <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white py-1 px-2 rounded-sm">
            <span>How Are you ? </span>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-end items-center">
        <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
          <div className="flex justify-center items-start flex-col w-full bg-red-500 shadow-lg shadow-red-500/50 text-white py-1 px-2 rounded-sm">
            <span>How Are you ? </span>
          </div>
          <div>
            <img
              className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
              src="http://localhost:3000/images/admin.jpg"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-start items-center">
        <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
          <div>
            <img
              className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
              src="http://localhost:3000/images/demo.jpg"
              alt=""
            />
          </div>
          <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white py-1 px-2 rounded-sm">
            <span>I Need some help </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContent;
