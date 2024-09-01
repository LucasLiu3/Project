import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export function ContentModule({ data, content, role }) {
  if (content === "category") {
    return data.map((each, index) => (
      <tr key={index}>
        <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
          {each.number ? each.number + 1 : index + 1}
        </th>

        {each.image ? (
          <th
            scope="row"
            className="py-2 px-6 font-medium whitespace-nowrap flex justify-center "
          >
            <img src={`${each.image}`} alt="" className="w-[50px] h-[50px]" />
          </th>
        ) : (
          <th
            scope="row"
            className="py-2 px-6 font-medium whitespace-nowrap flex justify-center "
          >
            <img src={`${each.image}`} alt="" className="w-[50px] h-[50px]" />
          </th>
        )}

        {each.category && (
          <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
            {each.category}
          </th>
        )}

        {each.name && (
          <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
            {each.name}
          </th>
        )}

        <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap ">
          <div className="flex justify-center items-center gap-5">
            <>
              <Link className="p-[6px] bg-yellow-500 rounded-full hover:shadow-lg hover:shadow-yellow-500/50">
                <FaEdit className="w-[18px] h-[18px]" />
              </Link>{" "}
              <Link className="p-[6px] bg-red-500 rounded-full hover:shadow-lg hover:shadow-red-500/50">
                <FaTrash className="w-[18px] h-[18px]" />
              </Link>
            </>
          </div>
        </th>
      </tr>
    ));
  }

  if (content === "order") {
    return data.map((each, index) => (
      <tr key={index}>
        <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
          {each.number ? each.number + 1 : index + 1}
        </th>

        {each.price && (
          <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
            ${each.price}
          </th>
        )}

        {each.payment_status && (
          <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
            {each.payment_status}
          </th>
        )}

        {each.orderStatue && (
          <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
            {each.orderStatue}
          </th>
        )}

        <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap ">
          <div className="flex justify-center items-center gap-5">
            <>
              <Link
                to={
                  role === "seller"
                    ? `/seller/order/2`
                    : `/admin/${each.orderStatue ? "order" : "seller"}/2`
                }
                className="p-[6px] bg-green-500 rounded-full hover:shadow-lg hover:shadow-green-500/50"
              >
                <FaEye className="w-[18px] h-[18px]" />
              </Link>
            </>
          </div>
        </th>
      </tr>
    ));
  }

  if (content === "payment") {
    return data.map((each, index) => (
      <tr key={index}>
        <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
          {each.number ? each.number + 1 : index + 1}
        </th>
        {each.amount && (
          <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
            {each.amount}
          </th>
        )}
        {each.request_status && (
          <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
            {each.request_status}
          </th>
        )}
        {each.date && (
          <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
            {each.date}
          </th>
        )}

        {!role && (
          <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap ">
            <div className="flex justify-center items-center gap-5">
              <>
                <Link className="p-[6px] bg-green-500 rounded-full hover:shadow-lg hover:shadow-green-500/50">
                  <FaEye className="w-[18px] h-[18px]" />
                </Link>
              </>
            </div>
          </th>
        )}
      </tr>
    ));
  }

  if (content === "sellers") {
    return data.map((each, index) => (
      <tr key={index}>
        <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
          {each.number ? each.number + 1 : index + 1}
        </th>

        {each.image ? (
          <th
            scope="row"
            className="py-2 px-6 font-medium whitespace-nowrap flex justify-center "
          >
            <img src={`${each.image}`} alt="" className="w-[50px] h-[50px]" />
          </th>
        ) : (
          <th
            scope="row"
            className="py-2 px-6 font-medium whitespace-nowrap flex justify-center "
          >
            <img
              src="https://res.cloudinary.com/djtucvk60/image/upload/v1725066386/profile/kie4jlanxsjom7du7gkm.jpg"
              alt=""
              className="w-[50px] h-[50px]"
            />
          </th>
        )}

        {each.name && (
          <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
            {each.name}
          </th>
        )}

        <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
          {each.shopInfo ? each.shopInfo.shopName : "-"}
        </th>

        {each.email && (
          <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
            {each.email}
          </th>
        )}

        {each.status && (
          <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
            {each.status}
          </th>
        )}
        <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap ">
          <div className="flex justify-center items-center gap-5">
            <Link
              to={`/admin/seller/${each._id}`}
              className="p-[6px] bg-green-500 rounded-full hover:shadow-lg hover:shadow-green-500/50"
            >
              <FaEye className="w-[18px] h-[18px]" />
            </Link>
          </div>
        </th>
      </tr>
    ));
  }

  if (content === "products") {
    return data.map((each, index) => (
      <tr key={index}>
        <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
          {each.number ? each.number + 1 : index + 1}
        </th>

        {each.images && (
          <th
            scope="row"
            className="py-2 px-6 font-medium whitespace-nowrap flex justify-center "
          >
            <img
              src={`${each.images[0]}`}
              alt=""
              className="w-[50px] h-[50px]"
            />
          </th>
        )}

        {each.product && (
          <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
            {each.product}
          </th>
        )}

        {each.category && (
          <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
            {each.category}
          </th>
        )}

        {each.brand && (
          <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
            {each.brand}
          </th>
        )}

        {each.price && (
          <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
            ${each.price}
          </th>
        )}

        <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
          {each.discount ? `${each.discount}%` : "-"}
        </th>

        {each.stock && (
          <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
            {each.stock}
          </th>
        )}

        {
          <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap ">
            <div className="flex justify-center items-center gap-5">
              <Link
                to={`/seller/product/edit/${each._id}`}
                className="p-[6px] bg-yellow-500 rounded-full hover:shadow-lg hover:shadow-yellow-500/50"
              >
                <FaEdit className="w-[18px] h-[18px]" />
              </Link>{" "}
              <Link className="p-[6px] bg-red-500 rounded-full hover:shadow-lg hover:shadow-red-500/50">
                <FaTrash className="w-[18px] h-[18px]" />
              </Link>
            </div>
          </th>
        }
      </tr>
    ));
  }
}

// if (imageDate) {
//   return imageDate.map((each, index) => (
// <tr key={index}>
//   <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
//     {each.number ? each.number + 1 : index + 1}
//   </th>

//   {each.image ? (
//     <th
//       scope="row"
//       className="py-2 px-6 font-medium whitespace-nowrap flex justify-center "
//     >
//       <img src={`${each.image}`} alt="" className="w-[50px] h-[50px]" />
//     </th>
//   ) : (
//     <th
//       scope="row"
//       className="py-2 px-6 font-medium whitespace-nowrap flex justify-center "
//     >
//       <img src={`${each.image}`} alt="" className="w-[50px] h-[50px]" />
//     </th>
//   )}

//   {each.images && (
//     <th
//       scope="row"
//       className="py-2 px-6 font-medium whitespace-nowrap flex justify-center "
//     >
//       <img
//         src={`${each.images[0]}`}
//         alt=""
//         className="w-[50px] h-[50px]"
//       />
//     </th>
//   )}

//   {each.product && (
//     <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
//       {each.product}
//     </th>
//   )}

//   {each.productName && (
//     <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
//       {each.productName}
//     </th>
//   )}

//   {each.category && (
//     <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
//       {each.category}
//     </th>
//   )}

//   {each.brand && (
//     <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
//       {each.brand}
//     </th>
//   )}

//   {each.price && (
//     <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
//       ${each.price}
//     </th>
//   )}

//   {each.discount && (
//     <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
//       {each.discount ? `${each.discount}%` : "-"}
//     </th>
//   )}

//   {each.stock && (
//     <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
//       {each.stock}
//     </th>
//   )}

//   {each.payment_status && (
//     <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
//       {each.payment_status}
//     </th>
//   )}

//   {each.orderStatue && (
//     <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
//       {each.orderStatue}
//     </th>
//   )}

//   {each.request_status && (
//     <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
//       {each.request_status}
//     </th>
//   )}

//   {each.date && (
//     <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
//       {each.date}
//     </th>
//   )}

//   {each.name && (
//     <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
//       {each.name}
//     </th>
//   )}

//   {each.email && (
//     <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
//       {each.email}
//     </th>
//   )}

//   {each.shopInfo && (
//     <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
//       {each.shopInfo.shopName}
//     </th>
//   )}

//   {each.status && (
//     <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
//       {each.status}
//     </th>
//   )}

//   <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap ">
//     <div className="flex justify-center items-center gap-5">
//       {each.status || each.orderStatue ? (
//         <Link
//           to={
//             role === "seller"
//               ? `/seller/order/2`
//               : `/admin/${each.orderStatue ? "order" : "seller"}/2`
//           }
//           className="p-[6px] bg-green-500 rounded-full hover:shadow-lg hover:shadow-green-500/50"
//         >
//           <FaEye className="w-[18px] h-[18px]" />
//         </Link>
//       ) : each.request_status ? (
//         <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-[2px cursor-pointer text-white rounded-sm text-sm]">
//           Confirm
//         </button>
//       ) : (
//         <>
//           <Link
//             to={`/seller/product/edit/${each._id}`}
//             className="p-[6px] bg-yellow-500 rounded-full hover:shadow-lg hover:shadow-yellow-500/50"
//           >
//             <FaEdit className="w-[18px] h-[18px]" />
//           </Link>{" "}
//           <Link className="p-[6px] bg-red-500 rounded-full hover:shadow-lg hover:shadow-red-500/50">
//             <FaTrash className="w-[18px] h-[18px]" />
//           </Link>
//         </>
//       )}
//     </div>
//   </th>
// </tr>
//   ));
// }
