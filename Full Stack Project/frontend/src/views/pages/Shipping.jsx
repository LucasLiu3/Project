import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageTopBackImg from "../../components/customers/PageTopBackImg";
import { useDispatch, useSelector } from "react-redux";
import { place_order } from "../../store/Reducers/orderReducer";

function Shipping() {
  const {
    state: { products, price, shippingFee, items },
  } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { customerInfo, updatedProfile } = useSelector(
    (state) => state.customer
  );
  const [info, setInfo] = useState({
    name: customerInfo.profile.name || "",
    address: customerInfo.profile.address || "",
    phone: customerInfo.profile.phone || "",
    email: customerInfo.profile.email || "",
    city: customerInfo.profile.city || "",
  });

  const [showInput, setShowInput] = useState(true);

  const infoChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  function saveInfo(e) {
    e.preventDefault();
    setShowInput(false);
  }

  function placeOrder() {
    dispatch(
      place_order({
        products,
        price,
        shippingFee,
        items,
        info,
        customerInfo,
        navigate,
      })
    );
  }

  return (
    <div>
      <PageTopBackImg>Shipping Details</PageTopBackImg>

      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] mx-auto py-16">
          <div className="flex flex-wrap ">
            <div className="w-[67%] md-lg:w-full">
              <div className="pr-3 md-lg:pr-0">
                <div className="flex flex-col gap-3">
                  <div className="bg-white p-4 ">
                    <h2 className="text-2xl font-bold">Shipping Info</h2>
                  </div>

                  {showInput ? (
                    <form onSubmit={saveInfo}>
                      <div className="flex bg-white p-2 gap-5 w-full">
                        <div className="flex flex-col gap-1 mb-2 w-full">
                          <label htmlFor="name">Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="name"
                            value={info.name}
                            onChange={infoChange}
                            className="w-full px-3 py-2 border border-slate-300 outline-none focus:border-slate-700 rounded-md"
                          />
                        </div>
                        <div className="flex flex-col gap-1 mb-2 w-full">
                          <label htmlFor="address">Address</label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            place="address"
                            value={info.address}
                            onChange={infoChange}
                            className="w-full px-3 py-2 border border-slate-300 outline-none focus:border-slate-700 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="flex bg-white p-2 gap-5 w-full">
                        <div className="flex flex-col gap-1 mb-2 w-full">
                          <label htmlFor="phone">Phone</label>
                          <input
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="phone"
                            value={info.phone}
                            onChange={infoChange}
                            className="w-full px-3 py-2 border border-slate-300 outline-none focus:border-slate-700 rounded-md"
                          />
                        </div>
                        <div className="flex flex-col gap-1 mb-2 w-full">
                          <label htmlFor="email">Email</label>
                          <input
                            type="text"
                            id="email"
                            name="email"
                            place="email"
                            value={info.email}
                            onChange={infoChange}
                            className="w-full px-3 py-2 border border-slate-300 outline-none focus:border-slate-700 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="flex bg-white p-2 gap-5 w-full">
                        <div className="flex flex-col gap-1 mb-2 w-full">
                          <label htmlFor="city">City</label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="city"
                            value={info.city}
                            onChange={infoChange}
                            className="w-full px-3 py-2 border border-slate-300 outline-none focus:border-slate-700 rounded-md"
                          />
                        </div>
                        <div className="flex flex-col gap-1 mb-2 w-full">
                          <button className="px-3 py-2 border mt-7 rounded-md bg-indigo-200">
                            Save Change
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div className="flex bg-white p-2 gap-5 w-full">
                      <div className="flex flex-col gap-1">
                        <h2 className="text-slate-600 font-semibold pb-2">
                          Deliver To
                        </h2>

                        <div className="flex flex-col gap-3">
                          <span>Name: {info.name}</span>
                          <span>Phone: {info.phone}</span>
                          <span>Email: {info.email}</span>
                          <span>Address: {info.address}</span>
                          <span>City: {info.city}</span>
                          <button
                            className="rounded-md bg-indigo-200"
                            onClick={() => setShowInput(!showInput)}
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {products.map(([sellerId, cartItems], index) => (
                    <div
                      className="flex bg-white p-4 flex-col gap-2"
                      key={index}
                    >
                      <div className="flex justify-start items-start flex-col">
                        <h2 className="text-md text-slate-600 font-bold">
                          {sellerId}
                        </h2>
                        <div className="w-[200px] h-[3px] bg-black mt-1"></div>
                      </div>

                      {cartItems.map((product, index) => (
                        <div className="w-full flex" key={index}>
                          <div className="flex sm:w-full gap-2 w-7/12">
                            <div className="flex gap-2 justify-start items-center">
                              <img
                                src={product.productsInCart[0].images[0]}
                                alt=""
                                className="h-[80px] w-[80px]"
                              />
                              <div className="pr-4 text-slate-600 ">
                                <h2 className="text-md font-semibold">
                                  {product.productsInCart[0].product}
                                </h2>
                                <span className="text-sm">
                                  Brand: {product.productsInCart[0].brand}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-center w-2/12 sm:w-full sm:mt-3">
                            <div className="pl-4 sm:pl-0">
                              <h2 className="text-lg">
                                {product.quantity ? product.quantity : items}{" "}
                                items
                              </h2>
                            </div>
                          </div>

                          <div className="flex justify-start w-3/12 sm:w-full sm:mt-3">
                            <div className="pl-4 sm:pl-0">
                              {product.productsInCart[0].discount ? (
                                <h2 className="text-lg text-red-500">
                                  $
                                  {(
                                    product.productsInCart[0].price *
                                    (1 -
                                      product.productsInCart[0].discount / 100)
                                  ).toFixed(2)}
                                </h2>
                              ) : (
                                ""
                              )}
                              <p
                                className={
                                  product.productsInCart[0].discount
                                    ? `line-through`
                                    : "text-lg"
                                }
                              >
                                ${product.productsInCart[0].price}
                              </p>
                              {product.productsInCart[0].discount ? (
                                <p>-{product.productsInCart[0].discount}%</p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-[33%] md-lg:w-full">
              <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                <div className="bg-white p-3 text-slate-600 flex flex-col gap-3">
                  <h2 className="text-2xl font-bold text-black">
                    Order Summary
                  </h2>
                  <div className="flex justify-between items-center">
                    <span>Items ({items})</span>
                    <span>${price}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span> Shipping Fee</span>
                    <span>$ {shippingFee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span> Total Payment</span>
                    <span>$ {price + shippingFee}</span>
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <span className="text-xl font-bold"> Total</span>
                    <span className="text-lg font-bold">
                      $ {price + shippingFee}
                    </span>
                  </div>
                  <button
                    disabled={showInput ? true : false}
                    className={`p-4 ${showInput ? "bg-red-300" : "bg-red-500"} 
                    } text-white rounded-sm hover:shadow-red-500/50 hover:shadow-md mb-3`}
                    onClick={placeOrder}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Shipping;
