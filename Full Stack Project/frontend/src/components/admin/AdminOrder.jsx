import { Link } from "react-router-dom";

export function AdminOrderHeader() {
  const orderHeard = [
    "Order Id",
    "Price",
    "Payment Status",
    "Order Status",
    "Action",
  ];
  return orderHeard.map((each, index) => (
    <th scope="col" className="py-3 px-4" key={index}>
      {each}
    </th>
  ));
}

export function AdminOrderContent() {
  const fakeData = [
    "#Id number",
    "#Id number",
    "#Id number",
    "#Id number",
    " #Id number",
  ];
  return fakeData.map((each, index) => (
    <th
      key={index}
      scope="row"
      className="py-4 px-6 font-medium whitespace-nowrap"
    >
      {each}
    </th>
  ));
}

function AdminOrder() {
  return (
    <>
      <div className="flex justify-between items-center text-[#d0d2d6] font-semibold pb-3">
        <h2 className="text-lg">Recent Orders</h2>
        <Link className="text-sm" to="/admin/orders">
          View All
        </Link>
      </div>

      <div className="relative overflow-y-auto ">
        <table className="w-full text-sm text-[#d0d2d6] ">
          <thead className="py-3 px-4 uppercase border-b border-slate-700">
            <tr>
              <AdminOrderHeader></AdminOrderHeader>
            </tr>
          </thead>

          <tbody>
            <tr>
              <AdminOrderContent></AdminOrderContent>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminOrder;
