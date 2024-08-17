import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export function ContentModule({ numberDate, imageDate }) {
  if (numberDate) {
    return numberDate.map((each, index) => (
      <tr key={index}>
        <th scope="row" className="py-4 px-6 font-medium whitespace-nowrap">
          {each}
        </th>
      </tr>
    ));
  }

  if (imageDate) {
    return imageDate.map((each, index) => (
      <tr key={index}>
        <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
          {index + 1}
        </th>

        {each.image && (
          <th
            scope="row"
            className="py-2 px-6 font-medium whitespace-nowrap flex justify-center "
          >
            <img
              src={`/images/category/${each.image}`}
              alt=""
              className="w-[50px] h-[50px]"
            />
          </th>
        )}

        {each.productName && (
          <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
            {each.productName}
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
            {each.price}
          </th>
        )}

        {each.discount && (
          <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
            {each.discount}
          </th>
        )}

        {each.stock && (
          <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
            {each.stock}
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

        {each.name && (
          <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
            {each.name}
          </th>
        )}

        {each.shopName && (
          <th scope="row" className="py-2 px-6 font-medium whitespace-nowrap">
            {each.shopName}
          </th>
        )}

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
            {each.status || each.orderStatue ? (
              <Link
                to={`/admin/${each.orderStatue ? "order" : "seller"}/2`}
                className="p-[6px] bg-green-500 rounded-full hover:shadow-lg hover:shadow-green-500/50"
              >
                <FaEye className="w-[18px] h-[18px]" />
              </Link>
            ) : each.request_status ? (
              <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-[2px cursor-pointer text-white rounded-sm text-sm]">
                Confirm
              </button>
            ) : (
              <>
                <Link className="p-[6px] bg-yellow-500 rounded-full hover:shadow-lg hover:shadow-yellow-500/50">
                  <FaEdit className="w-[18px] h-[18px]" />
                </Link>{" "}
                <Link className="p-[6px] bg-red-500 rounded-full hover:shadow-lg hover:shadow-red-500/50">
                  <FaTrash className="w-[18px] h-[18px]" />
                </Link>
              </>
            )}
          </div>
        </th>
      </tr>
    ));
  }
}
