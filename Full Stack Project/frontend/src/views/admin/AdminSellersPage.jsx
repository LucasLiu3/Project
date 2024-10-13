import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "./../../components/Pagination";
import Filter from "../../components/shared/Filter";
import { HeadModule } from "../../components/shared/HeadModule";
import { ContentModule } from "../../components/shared/ContentModule";
import { getSellers } from "../../store/Reducers/sellerReducer";

function AdminSellersPage() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchContent, setSearchContent] = useState("");

  const headerTitle = [
    "No",
    "Image",
    "Name",
    "Shop Name",
    "Email",
    "Status",
    "Action",
  ];

  const { loader, sellersInfo } = useSelector((state) => state.seller);

  const sellerContent = sellersInfo.map((each, index) => ({
    number: index,
    ...each,
  }));

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  let selectedSeller = sellerContent.slice(startIndex, endIndex);

  if (searchContent) {
    selectedSeller = selectedSeller.filter(
      (each) =>
        each.name.toLowerCase().indexOf(searchContent.toLowerCase()) > -1
    );
  }

  useEffect(
    function () {
      dispatch(getSellers());
    },
    [dispatch]
  );

  return (
    <div className="w-full p-4 bg-[#f8f9fa] rounded-md">
      <div>
        <Filter
          perPage={perPage}
          setPerPage={setPerPage}
          setSearchContent={setSearchContent}
        ></Filter>
      </div>

      <div className="relative mt-5 overflow-y-auto">
        <table className="w-full text-sm text-[#212529]">
          <thead className=" uppercase border-b border-slate-700">
            <HeadModule headerTitle={headerTitle}></HeadModule>
          </thead>

          <tbody>
            <ContentModule
              data={selectedSeller}
              content="sellers"
            ></ContentModule>
          </tbody>
        </table>
      </div>

      <div className="w-full flex justify-end mt-4 mr-4 bottom-4 right-4">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          perPage={perPage}
          totalItem={sellerContent.length}
          showPageNmber={3}
        ></Pagination>
      </div>
    </div>
  );
}

export default AdminSellersPage;
