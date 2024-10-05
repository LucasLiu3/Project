function AdminOrderDetailsCard({ orders }) {
  return (
    <div className="flex flex-col gap-2 text-lg text-[#d0d2d6] w-[30%] pl-20">
      <h2>Invoice: {orders?._id}</h2>
      <span>Date: {orders?.data}</span>
      <span>Payment Status: {orders?.payment_status} </span>
      <span>Price: {orders?.price} (Shipping fee inc)</span>
      <h2>Delivery Info : </h2>
      <span>Name: {orders.shippingInfo?.name}</span>
      <span>Email: {orders.shippingInfo?.email}</span>
      <span>Phone: {orders.shippingInfo?.phone}</span>
      <span>Address: {orders.shippingInfo?.address}</span>
    </div>
  );
}

export default AdminOrderDetailsCard;
