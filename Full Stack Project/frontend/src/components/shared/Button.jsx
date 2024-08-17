function Button({ children }) {
  return (
    <button className="bg-red-500 w-[170px] hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2">
      {children}
    </button>
  );
}

export default Button;
