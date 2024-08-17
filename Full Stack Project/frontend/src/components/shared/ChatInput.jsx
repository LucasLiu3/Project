function ChatInput() {
  return (
    <form className="flex gap-3">
      <input
        className="w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent text-[#d0d2d6]"
        type="text"
        placeholder="Input Your Message"
      />
      <button className="shadow-lg bg-[#06b6d4] hover:shadow-cyan-500/50 text-semibold w-[75px] h-[35px] rounded-md text-white flex justify-center items-center">
        Send
      </button>
    </form>
  );
}

export default ChatInput;
