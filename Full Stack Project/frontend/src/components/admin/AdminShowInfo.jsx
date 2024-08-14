import { BsCurrencyDollar } from "react-icons/bs";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

function AdminShowInfo() {
  const displayInfo = [
    {
      title: "Total Sales",
      number: "Placehoer",
      icon: <BsCurrencyDollar></BsCurrencyDollar>,
      bgColor: "#fae8e8",
      textColor: "#5c5a5a",
      iconColor: "#fa0305",
    },
    {
      title: "Products",
      number: "Placehoer",
      icon: (
        <MdOutlineProductionQuantityLimits></MdOutlineProductionQuantityLimits>
      ),
      bgColor: "#fde2ff",
      textColor: "#5c5a5a",
      iconColor: "#760077",
    },
    {
      title: "Sellers",
      number: "Placehoer",
      icon: <FaUsers></FaUsers>,
      bgColor: "#e9feea",
      textColor: "#5c5a5a",
      iconColor: "#038000",
    },
    {
      title: "Total Orders",
      number: "Placehoer",
      icon: <IoCartOutline></IoCartOutline>,
      bgColor: "#ecebff",
      textColor: "#5c5a5a",
      iconColor: "#0200f8",
    },
  ];

  return displayInfo.map((info, index) => {
    return (
      <div
        key={index}
        className={`flex justify-between items-center p-6 rounded-md gap-3 bg-[}]`}
        style={{ backgroundColor: info.bgColor }}
      >
        <div
          className={`flex flex-col justify-start items-start text-[${info.textColor}]`}
          style={{ color: info.textColor }}
        >
          <h2 className="text-3xl font-bold">{info.number}</h2>
          <span className="text-md font-medium">{info.title}</span>
        </div>

        <div
          className={`w-[40px] h-[47px] rounded-full flex justify-center items-center text-xl bg-[${info.iconColor}]`}
          style={{ backgroundColor: info.iconColor }}
        >
          <div className="text-white shadow-lg">{info.icon}</div>
        </div>
      </div>
    );
  });
}

export default AdminShowInfo;