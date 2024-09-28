import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  update_profile,
  messageClear,
} from "../../../store/Reducers/customerReducer";
import toast from "react-hot-toast";

const Index = () => {
  const dispatch = useDispatch();

  const { customerInfo, successMessage } = useSelector(
    (state) => state.customer
  );
  const [profile, setProfile] = useState(
    customerInfo.profile || {
      name: "",
      address: "",
      phone: "",
      email: "",
      city: "",
    }
  );

  function updateProfile() {
    dispatch(update_profile({ profile, customerId: customerInfo.id }));
  }

  useEffect(
    function () {
      if (successMessage) toast.success(successMessage);
      dispatch(messageClear());
    },
    [successMessage, dispatch]
  );

  // Update local profile state when updatedProfile from redux store changes
  useEffect(() => {
    setProfile(
      customerInfo.profile || {
        name: "",
        address: "",
        phone: "",
        email: "",
        city: "",
      }
    );
  }, [customerInfo.profile]);

  return (
    <div className="w-full bg-white">
      <div className="py-2 px-5 text-xl font-semibold text-slate-600">
        <h2>My Profile</h2>
      </div>

      <div className="grid grid-cols-2 gap-5 py-5 px-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="border rounded-md py-2 px-1"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="border rounded-md py-2 px-1"
            value={profile.address}
            onChange={(e) =>
              setProfile({ ...profile, address: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="border rounded-md py-2 px-1"
            value={profile.phone}
            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="border rounded-md py-2 px-1"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="city">City</label>
          <input
            type="text"
            className="border rounded-md py-2 px-1"
            value={profile.city}
            onChange={(e) => setProfile({ ...profile, city: e.target.value })}
          />
        </div>
      </div>

      <div className="px-5">
        <button
          className="bg-red-500 py-2 px-2 rounded-lg text-white mb-5"
          onClick={updateProfile}
        >
          Update
        </button>
      </div>
    </div>
  );
};
export default Index;
