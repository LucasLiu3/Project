import { useState } from "react";
import { Link } from "react-router-dom";
import PageTopBackImg from "../../components/customers/PageTopBackImg";

function Shipping() {
  const fakeCart = [1, 2];

  const [info, setInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    city: "",
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
    console.log(info);
    setShowInput(false);
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
                          <span>Name:</span>
                          <span>Phone:</span>
                          <span>Email:</span>
                          <span>Address:</span>
                          <span>City:</span>
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

                  <div className="flex bg-white p-4 flex-col gap-2">
                    <div className="flex justify-start items-start flex-col">
                      <h2 className="text-md text-slate-600 font-bold">
                        Shop Name PlaceHolder
                      </h2>
                      <div className="w-[200px] h-[3px] bg-black mt-1"></div>
                    </div>
                    <div className="w-full flex">
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
                            <span className="text-sm">Brand: Brand Name</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end w-5/12 sm:w-full sm:mt-3">
                        <div className="pl-4 sm:pl-0">
                          <h2 className="text-lg text-red-500">$300</h2>
                          <p className="line-through">$330</p>
                          <p>-20%</p>
                        </div>
                      </div>
                    </div>
                  </div>
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
                    <span>Items (5)</span>
                    <span>$10000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span> Shipping Fee</span>
                    <span>$ 30</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span> Total Payment</span>
                    <span>$ 30</span>
                  </div>
                  <div className="flex justify-between items-center p-3">
                    <span className="text-xl font-bold"> Total</span>
                    <span className="text-lg font-bold">$ 30</span>
                  </div>
                  <button
                    disabled={showInput ? true : false}
                    className={`p-4 ${showInput ? "bg-red-300" : "bg-red-500"} 
                    } text-white rounded-sm hover:shadow-red-500/50 hover:shadow-md mb-3`}
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
