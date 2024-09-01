import { FadeLoader } from "react-spinners";
import { FaImages } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import React from "react";
import { update_profile_image } from "../../store/Reducers/profileReducer";

const SellerProfilePic = React.memo(function SellerProfilePic({
  userInfo,
  loader,
}) {
  const dispatch = useDispatch();

  function updateProfileImage(e) {
    if (e.target.files.length === 0) return;

    const image = e.target.files[0];
    const formDate = new FormData();

    formDate.append("profileImage", image);

    dispatch(update_profile_image(formDate));
  }
  return (
    <div className="flex justify-center items-center py-3">
      {userInfo.image ? (
        <label
          htmlFor="img"
          className="h-[150px] w-[200px] relative p-3 cursor-pointer overflow-hidden"
        >
          <img src={userInfo.image} alt="" className="h-[150px] w-[200px]" />
          {loader && (
            <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
              <span>
                <FadeLoader />
              </span>
            </div>
          )}
        </label>
      ) : (
        <label
          className="flex justify-center items-center flex-col h-[150px] w-[200px] cursor-pointer border border-dashed hover:border-red-500 border-[#d0d2d6] relative"
          htmlFor="img"
        >
          <span>
            <FaImages />{" "}
          </span>
          <span>Select Image</span>
          {loader && (
            <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
              <span>
                <FadeLoader />
              </span>
            </div>
          )}
        </label>
      )}
      <input
        type="file"
        className="hidden"
        id="img"
        onChange={(e) => updateProfileImage(e)}
      />
    </div>
  );
});

export default SellerProfilePic;
