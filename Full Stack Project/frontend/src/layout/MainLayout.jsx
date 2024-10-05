import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import io from "socket.io-client";

import Header from "./Header";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  updateCustomer,
  updateMessage,
  updateSeller,
  updateSellerMessage,
  updateAdminMessage,
} from "../store/Reducers/chatInReducer";

function MainLayout() {
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const { customerId } = useParams();

  const socket = io("http://localhost:5000/");

  const [messageSocket, setMessageSocket] = useState("");
  const [activeCustomer, setActiveCustomer] = useState([]);

  useEffect(
    function () {
      if (userInfo && userInfo.role === "seller") {
        socket.emit("add_seller", userInfo._id, userInfo);
      } else {
        socket.emit("add_admin", userInfo);
      }
    },
    [userInfo, socket]
  );

  useEffect(
    function () {
      socket.on("activeCustomer", (activeCustomer) => {
        dispatch(updateCustomer(activeCustomer));
      });

      socket.on("activeSeller", (activeSeller) => {
        dispatch(updateSeller(activeSeller));
      });
    },
    [socket, dispatch]
  );

  useEffect(
    function () {
      socket.on("customer_messages", (newMessages) => {
        setMessageSocket(newMessages);
      });
    },
    [socket]
  );

  useEffect(
    function () {
      socket.on("get_admin_message", (newMessages) => {
        dispatch(updateSellerMessage(newMessages));
      });
    },
    [dispatch, socket]
  );

  useEffect(
    function () {
      socket.on("get_seller_message", (newMessages) => {
        dispatch(updateAdminMessage(newMessages));
      });
    },
    [dispatch, socket]
  );

  useEffect(
    function () {
      if (messageSocket) {
        if (
          customerId === messageSocket.senderId &&
          userInfo._id === messageSocket.receivewId
        ) {
          dispatch(updateMessage(messageSocket));
        } else {
          toast.success(`A message from ${messageSocket.senderName}`, {
            autoClose: 1500,
          });
        }
      }
    },
    [messageSocket, userInfo, customerId, dispatch]
  );

  return (
    <div className="bg-[##f9fafb] w-full min-h-screen">
      <Header
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      ></Header>
      <SideBar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      ></SideBar>
      <div className="ml-0 lg:ml-[260px] pt-[95px] transition-all ">
        <div className="px-2 md:px-7 py-5">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
