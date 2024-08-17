function AdminOrderSelect() {
  return (
    <select
      className="px-4 py-2 focus:border-slate-700 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
      name=""
      id=""
    >
      <option value="pending">pending</option>
      <option value="processing">processing</option>
      <option value="warehouse">warehouse</option>
      <option value="placed">placed</option>
      <option value="cancelled">cancelled</option>
    </select>
  );
}

export default AdminOrderSelect;
