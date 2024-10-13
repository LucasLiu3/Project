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
  updateAdmin,
  updateSellerMessage,
  updateAdminMessage,
  messageClear,
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

        socket.on("activeAdmin", (activeAdmin) => {
          dispatch(updateAdmin(activeAdmin));
        });

        socket.on("activeCustomer", (activeCustomer) => {
          dispatch(updateCustomer(activeCustomer));
        });
      } else if (userInfo && userInfo.role === "admin") {
        socket.emit("add_admin", userInfo);
        socket.on("activeSeller", (activeSeller) => {
          dispatch(updateSeller(activeSeller));
        });
      }
    },
    [userInfo, socket, dispatch]
  );

  // useEffect(
  //   function () {
  //     socket.on("activeCustomer", (activeCustomer) => {
  //       dispatch(updateCustomer(activeCustomer));
  //     });

  //     socket.on("activeSeller", (activeSeller) => {
  //       console.log("seller是active的");
  //       dispatch(updateSeller(activeSeller));
  //     });

  //     socket.on("activeAdmin", (activeAdmin) => {
  //       console.log("admin没激活吗?");
  //       dispatch(updateAdmin(activeAdmin));
  //     });
  //   },
  //   [socket, dispatch]
  // );

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
        if (newMessages.receivewId !== userInfo._id) {
          setMessageSocket(newMessages);
          return;
        }

        dispatch(updateSellerMessage(newMessages));
      });
    },
    [dispatch, socket, messageSocket, userInfo]
  );

  const { sellerId } = useParams();

  useEffect(
    function () {
      socket.on("get_seller_message", (newMessages) => {
        if (sellerId !== newMessages.senderId) {
          setMessageSocket(newMessages);
          return;
        }

        dispatch(updateAdminMessage(newMessages));
      });
    },
    [dispatch, socket, sellerId, messageSocket]
  );

  useEffect(
    function () {
      if (messageSocket !== "") {
        if (
          customerId === messageSocket.senderId &&
          userInfo._id === messageSocket.receivewId
        ) {
          dispatch(updateMessage(messageSocket));
          setMessageSocket("");
        } else {
          toast.success(`A message from ${messageSocket.senderName}`, {
            autoClose: 1000,
          });
          setMessageSocket("");
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
      <div className="ml-0 lg:ml-[260px] pt-[95px] transition-all h-full ">
        <div className="px-2 md:px-7 py-5 bg-slate-300 h-full min-h-screen">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
