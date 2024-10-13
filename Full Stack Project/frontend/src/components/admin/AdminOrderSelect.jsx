function AdminOrderSelect({ orderState, updateOrderState }) {
  return (
    <select
      className="px-4 py-2 focus:border-slate-700 outline-none bg-[#f8f9fa] 
       border border-slate-700 rounded-md text-[#212529]"
      name=""
      id=""
      value={orderState}
      onChange={updateOrderState}
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
