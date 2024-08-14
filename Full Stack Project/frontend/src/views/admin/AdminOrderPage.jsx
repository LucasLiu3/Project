import { useState } from "react";

import {
  AdminOrderContent,
  AdminOrderHeader,
} from "../../components/admin/AdminOrder";
import Pagination from "../../components/Pagination";

function AdminOrderPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const [searchContent, setSearchContent] = useState("");

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
        <div className="flex justify-between items-center">
          <select
            className="h-[40px] px-3 py-2 rounded-md bg-[#b1addf] border bg-transparent
            border-slate-700 text-black focus:border-indigo-700 outline-none placeholder-bold "
            name="perPage"
            id="perPage"
            value={perPage}
            onChange={(e) => setPerPage(parseInt(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>

          <input
            type="text"
            name="search"
            placeholder="search..."
            className="h-[40px] px-3 py-2 rounded-md bg-[#b1addf] 
            border bg-transparent border-slate-700 text-white focus:border-indigo-700 
            overflow-hidden outline-none placeholder-bold "
            onChange={(e) => setSearchContent(e.target.value)}
          />
        </div>

        <div className="relative mt-5 overflow-y-auto">
          <table className="w-full text-sm text-[#d0d2d6]">
            <thead className=" uppercase border-b border-slate-700">
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

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          perPage={perPage}
          totalItem={35}
          showPageNmber={5}
        ></Pagination>
      </div>
    </div>
  );
}

export default AdminOrderPage;
