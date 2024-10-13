function AdminOrderDetailsItem({ ordersDetail, role = "admin" }) {
  if (role === "seller") {
    return (
      <>
        <div className="text-[#212529] mt-5">
          <h2 className="text-xl font-bold">
            Order Status: {ordersDetail.delivery_status}
          </h2>
        </div>
        {ordersDetail?.product?.map((p, i) => (
          <div className="flex justify-start items-center gap-5 mt-3" key={i}>
            <img src={p.images[0]} alt="" className="w-[50px] h-[50px]" />
            <div className="flex flex-col">
              <span>Brand Name : {p.brand}</span>
              <span>
                Price: $ {(p.price * ((100 - p.discount) / 100)).toFixed(2)}
              </span>
              <span>Quantity: {p.quantity}</span>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {ordersDetail.map((each, index) => (
        <div className="text-[#212529] mt-5" key={index}>
          <h2>
            {each.product[0].shopName} Order: {each.delivery_status}
          </h2>
          {each.product.map((p, i) => (
            <div className="flex justify-start items-center gap-5 mt-3" key={i}>
              <img src={p.images[0]} alt="" className="w-[50px] h-[50px]" />
              <div className="flex flex-col">
                <span>Brand Name : {p.brand}</span>
                <span>
                  Price: {(p.price * ((100 - p.discount) / 100)).toFixed(2)}
                </span>
                <span>Quantity: {p.quantity}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default AdminOrderDetailsItem;
