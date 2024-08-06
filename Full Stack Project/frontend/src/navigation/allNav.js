import { AiOutlineDashboard } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { FaUserTimes } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

export const allNav = [
  {
    id: 1,
    title: "Dashboard",
    icon: <AiOutlineDashboard></AiOutlineDashboard>,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Orders",
    icon: <IoCartOutline></IoCartOutline>,
    role: "admin",
    path: "/admin/orders",
  },
  {
    id: 3,
    title: "Category",
    icon: <BiCategory></BiCategory>,
    role: "admin",
    path: "/admin/category",
  },
  {
    id: 4,
    title: "Sellers",
    icon: <FaUsers></FaUsers>,
    role: "admin",
    path: "/admin/seller",
  },
  {
    id: 5,
    title: "Payment Request",
    icon: <MdPayment></MdPayment>,
    role: "admin",
    path: "/admin/payment_request",
  },
  {
    id: 6,
    title: "Deactive Sellers",
    icon: <FaUserTimes></FaUserTimes>,
    role: "admin",
    path: "/admin/deactive_sellers",
  },
  {
    id: 7,
    title: "Seller Request",
    icon: <FaCodePullRequest></FaCodePullRequest>,
    role: "admin",
    path: "/admin/seller_request",
  },
  {
    id: 8,
    title: "Live Chat",
    icon: <IoChatbubbleEllipsesOutline></IoChatbubbleEllipsesOutline>,
    role: "admin",
    path: "/admin/live_chat",
  },
];
