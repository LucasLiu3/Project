function AdminOrderDetailsCard() {
  return (
    <div className="flex flex-col gap-2 text-lg text-[#d0d2d6] w-[30%] pl-20">
      <h2>Invoice: #213123</h2>
      <span>Date: 17 Aug 2024</span>
      <span>Payment Status: paid</span>
      <span>Price: 333</span>
      <h2>Delivery to : Customer Name </h2>
      <span>Address: xxx street</span>
    </div>
  );
}

export default AdminOrderDetailsCard;
