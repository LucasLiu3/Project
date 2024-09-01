import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { update_shop_info } from "../../store/Reducers/profileReducer";

function SellerProfileShop({ userInfo }) {
  const [shopInfo, setShopInfo] = useState({
    shopName: "",
    address: "",
    description: "",
  });

  const dispatch = useDispatch();

  function updateShopInfo(e) {
    e.preventDefault();

    dispatch(update_shop_info(shopInfo));
  }

  return (
    <div className="px-0 md:px-5 py-2">
      {!userInfo.shopInfo ? (
        <form onSubmit={updateShopInfo}>
          <div className="flex flex-col w-full gap-1 mb-2">
            <label htmlFor="Shop">Shop Name</label>
            <input
              className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
              type="text"
              name="shopName"
              id="Shop"
              placeholder="Shop Name"
              onChange={(e) => {
                setShopInfo({ ...shopInfo, shopName: e.target.value });
              }}
            />
          </div>

          <div className="flex flex-col w-full gap-1 mb-2">
            <label htmlFor="division">Shop Address</label>
            <input
              className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
              type="text"
              name="address"
              id="address"
              placeholder="Shop Address"
              onChange={(e) => {
                setShopInfo({ ...shopInfo, address: e.target.value });
              }}
            />
          </div>

          <div className="flex flex-col w-full gap-1 mb-2">
            <label htmlFor="district">Shop Description</label>
            <input
              className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
              type="text"
              name="description"
              id="description"
              placeholder="Shop Description"
              onChange={(e) => {
                setShopInfo({ ...shopInfo, description: e.target.value });
              }}
            />
          </div>

          <button className="bg-red-500  hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2">
            Save Changes
          </button>
        </form>
      ) : (
        <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
          <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
            <FaRegEdit />{" "}
          </span>
          <div className="flex gap-2">
            <span>Shop Name : </span>
            <span>{userInfo.shopInfo?.shopName}</span>
          </div>
          <div className="flex gap-2">
            <span>Shop Address : </span>
            <span>{userInfo.shopInfo?.address}</span>
          </div>
          <div className="flex gap-2">
            <span>Shop Description : </span>
            <span>{userInfo.shopInfo?.description}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default SellerProfileShop;
