import { AiOutlineDashboard } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { FaUserTimes } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoChatbubblesOutline } from "react-icons/io5";
import { GoGift } from "react-icons/go";
import { CiDiscount1 } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

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
    path: "/admin/sellers",
  },
  {
    id: 5,
    title: "Payment Request",
    icon: <MdPayment></MdPayment>,
    role: "admin",
    path: "/admin/payment_request",
  },
  // {
  //   id: 6,
  //   title: "Deactive Sellers",
  //   icon: <FaUserTimes></FaUserTimes>,
  //   role: "admin",
  //   path: "/admin/deactive_sellers",
  // },
  // {
  //   id: 7,
  //   title: "Seller Request",
  //   icon: <FaCodePullRequest></FaCodePullRequest>,
  //   role: "admin",
  //   path: "/admin/seller_request",
  // },
  {
    id: 8,
    title: "Live Chat",
    icon: <IoChatbubbleEllipsesOutline></IoChatbubbleEllipsesOutline>,
    role: "admin",
    path: "/admin/chat",
  },
  {
    id: 9,
    title: "Dashboard",
    icon: <AiOutlineDashboard></AiOutlineDashboard>,
    role: "seller",
    path: "/seller/dashboard",
  },
  {
    id: 10,
    title: "All Products",
    icon: <BiCategory></BiCategory>,
    role: "seller",
    path: "/seller/products",
  },
  {
    id: 11,
    title: "New Products",
    icon: <GoGift></GoGift>,
    role: "seller",
    path: "/seller/new_product",
  },
  // {
  //   id: 12,
  //   title: "Discount Products",
  //   icon: <CiDiscount1></CiDiscount1>,
  //   role: "seller",
  //   path: "/seller/discount_products",
  // },

  {
    id: 13,
    title: "Orders",
    icon: <IoCartOutline></IoCartOutline>,
    role: "seller",
    path: "/seller/orders",
  },
  {
    id: 14,
    title: "Payments",
    icon: <MdPayment></MdPayment>,
    role: "seller",
    path: "/seller/payments",
  },
  {
    id: 15,
    title: "Customer-Chat",
    icon: <IoChatbubblesOutline />,
    role: "seller",
    path: "/seller/customer_chat",
  },
  {
    id: 16,
    title: "Admin-Chat",
    icon: <IoChatbubbleEllipsesOutline></IoChatbubbleEllipsesOutline>,
    role: "seller",
    path: "/seller/admin_chat",
  },
  {
    id: 16,
    title: "Profile",
    icon: <CgProfile />,
    role: "seller",
    path: "/seller/profile",
  },
];
