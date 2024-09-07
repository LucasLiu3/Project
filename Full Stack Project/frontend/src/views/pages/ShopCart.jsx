import { Link, useNavigate } from "react-router-dom";
import PageTopBackImg from "../../components/customers/PageTopBackImg";

function ShopCart() {
  const navigate = useNavigate();
  const fakeCart = [1, 2];

  function redirect() {
    navigate("/shipping", {
      state: {
        products: [],
        price: 500,
        shippingFee: 40,
        items: 2,
      },
    });
  }

  return (
    <div>
      <PageTopBackImg>Shop Cart</PageTopBackImg>

      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] mx-auto py-16">
          <div className="flex flex-wrap ">
            {fakeCart.length > 0 ? (
              <div className="w-[67%] md-lg:w-full">
                <div className="pr-3 md-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    <div className="bg-white p-4 ">
                      <h2 className="text-2xl font-bold">
                        Shop Cart ({fakeCart.length})
                      </h2>
                    </div>

                    {fakeCart.map((each, index) => {
                      return (
                        <>
                          <div className="flex bg-white p-4 flex-col gap-2">
                            <div className="flex justify-start items-start flex-col">
                              <h2 className="text-md text-slate-600 font-bold">
                                Shop Name PlaceHolder
                              </h2>
                              <div className="w-[200px] h-[3px] bg-black mt-1"></div>
                            </div>
                            <div className="w-full flex flex-wrap">
                              <div className="flex sm:w-full gap-2 w-7/12">
                                <div className="flex gap-2 justify-start items-center">
                                  <img
                                    src="images1/products/1.webp"
                                    alt=""
                                    className="h-[80px] w-[80px]"
                                  />
                                  <div className="pr-4 text-slate-600 ">
                                    <h2 className="text-md font-semibold">
                                      Product Name
                                    </h2>
                                    <span className="text-sm">
                                      Brand: Brand Name
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-between w-5/12 sm:w-full sm:mt-3">
                                <div className="pl-4 sm:pl-0">
                                  <h2 className="text-lg text-red-500">$300</h2>
                                  <p className="line-through">$330</p>
                                  <p>-20%</p>
                                </div>

                                <div className="pl-4 sm:pl-0">
                                  <h2 className="text-lg text-green-500 pt-5">
                                    2 in stock
                                  </h2>
                                </div>

                                <div className="flex gap-2 flex-col">
                                  <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl">
                                    <div className="px-3 cursor-pointer">-</div>
                                    <div className="px-3">2</div>
                                    <div className="px-3 cursor-pointer">+</div>
                                  </div>
                                  <button className="px-5 py-[3px] bg-red-500 text-white">
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center font-bold text-3xl w-[67%]">
                Your Cart is empty.
                <Link className="px-2 text-blue-500 " to="/shop">
                  Go Shop
                </Link>
              </div>
            )}

            <div className="w-[33%] md-lg:w-full">
              <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                <div className="bg-white p-3 text-slate-600 flex flex-col gap-3">
                  <h2 className="text-2xl font-bold text-black">
                    Order Summary
                  </h2>
                  <div className="flex justify-between items-center">
                    <span> 3 items</span>
                    <span>$ 300</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span> Shipping Fee</span>
                    <span>$ 30</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-slate-600 round-sm"
                      placeholder="Input Coupon"
                    />
                    <button className="px-5 py-[1px] bg-[#059473] text-white rounded-sm uppercase text-sm">
                      Apply
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <span className="text-xl font-bold"> Total</span>
                    <span className="text-lg font-bold">$ 30</span>
                  </div>
                  <button
                    onClick={redirect}
                    className="p-4 bg-red-500 text-white rounded-sm hover:shadow-red-500/50 hover:shadow-md mb-3"
                  >
                    {/* <Link to="/shipping">Process To Payment</Link> */}
                    Process to Checkout
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

export default ShopCart;
