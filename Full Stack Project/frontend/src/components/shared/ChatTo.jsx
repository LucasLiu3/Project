function ChatTo({ currentCustomer, customerId, activeCustomer }) {
  return (
    <>
      {customerId && (
        <div className="flex justify-start items-center gap-3">
          <div className="relative flex">
            <img
              className="w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] p-[2px] rounded-full"
              src="http://localhost:3000/images/admin.jpg"
              alt=""
            />

            {activeCustomer.some((each) => each.customerId === customerId) && (
              <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
            )}
          </div>
          <div>{currentCustomer.name}</div>
        </div>
      )}
    </>
  );
}

export default ChatTo;
