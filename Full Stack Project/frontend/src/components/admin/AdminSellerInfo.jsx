function AdminSellerInfo() {
  return (
    <>
      <div className="px-0 py-2">
        <span className="py-2 text-lg">Basic Info</span>
      </div>

      <div className="flex justify-between text-sm flex-col gap-3 p-4 bg-[#9e97e9] rounded-md">
        <div className="flex gap-3 font-bold text-[#000000]">
          <span>Name:</span>
          <span>Place Holder</span>
        </div>
        <div className="flex gap-3 font-bold text-[#000000]">
          <span>Email:</span>
          <span>test@gmail.com</span>
        </div>
        <div className="flex gap-3 font-bold text-[#000000]">
          <span>Role:</span>
          <span>Seller</span>
        </div>
        <div className="flex gap-3 font-bold text-[#000000]">
          <span>Shop name:</span>
          <span>Shop1</span>
        </div>
        <div className="flex gap-3 font-bold text-[#000000]">
          <span>Address:</span>
          <span>133 street</span>
        </div>
        <div className="flex gap-3 font-bold text-[#000000]">
          <span>Status:</span>
          <span>Active</span>
        </div>
      </div>
    </>
  );
}

export default AdminSellerInfo;
