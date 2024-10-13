function AdminSellerInfo({ seller }) {
  return (
    <>
      <div className="px-0 py-2">
        <span className="py-2 text-lg">Basic Info</span>
      </div>

      <div className="flex justify-between text-sm flex-col gap-3 p-4 bg-slate-300 rounded-md">
        <div className="flex gap-3 font-bold text-[#212529]">
          <span>Name:</span>
          <span>{seller.name}</span>
        </div>
        <div className="flex gap-3 font-bold text-[#212529]">
          <span>Email:</span>
          <span>{seller.email}</span>
        </div>
        <div className="flex gap-3 font-bold text-[#212529]">
          <span>Role:</span>
          <span>{seller.role}</span>
        </div>
        <div className="flex gap-3 font-bold text-[#212529]">
          <span>Shop name:</span>
          <span>{seller.shopInfo ? seller.shopInfo.shopName : "-"}</span>
        </div>
        <div className="flex gap-3 font-bold text-[#212529]">
          <span>Address:</span>
          <span>{seller.shopInfo ? seller.shopInfo.address : "-"}</span>
        </div>
        <div className="flex gap-3 font-bold text-[#212529]">
          <span>Payment Status:</span>
          <span>{seller.payment}</span>
        </div>
        <div className="flex gap-3 font-bold text-[#212529]">
          <span>Status:</span>
          <span>{seller.status}</span>
        </div>
      </div>
    </>
  );
}

export default AdminSellerInfo;
