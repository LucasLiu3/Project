import { useState } from "react";

import Pagination from "./../../components/Pagination";
import Filter from "../../components/shared/Filter";
import { HeadModule } from "../../components/shared/HeadModule";
import { ContentModule } from "../../components/shared/ContentModule";

function AdminSellersPage() {
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

  const fakeContent = [
    {
      image: "1.jpg",
      name: "seller1",
      shopName: "seller1 shop",
      status: "active",
      email: "seller1@test.mail",
    },
    {
      image: "2.jpg",
      name: "seller2",
      shopName: "seller2 shop",
      status: "active",
      email: "seller2@test.mail",
    },
    {
      image: "3.jpg",
      name: "seller3",
      shopName: "seller3 shop",
      status: "active",
      email: "seller3@test.mail",
    },
    {
      image: "4.jpg",
      name: "seller4",
      shopName: "seller4 shop",
      status: "active",
      email: "seller4@test.mail",
    },
    {
      image: "5.jpg",
      name: "seller5",
      shopName: "seller5 shop",
      status: "active",
      email: "seller5@test.mail",
    },
  ];

  return (
    <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
      <div>
        <Filter
          perPage={perPage}
          setPerPage={setPerPage}
          setSearchContent={setSearchContent}
        ></Filter>
      </div>

      <div className="relative mt-5 overflow-y-auto">
        <table className="w-full text-sm text-[#d0d2d6]">
          <thead className=" uppercase border-b border-slate-700">
            <HeadModule headerTitle={headerTitle}></HeadModule>
          </thead>

          <tbody>
            <ContentModule imageDate={fakeContent}></ContentModule>
          </tbody>
        </table>
      </div>

      <div className="w-full flex justify-end mt-4 mr-4 bottom-4 right-4">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          perPage={perPage}
          totalItem={35}
          showPageNmber={3}
        ></Pagination>
      </div>
    </div>
  );
}

export default AdminSellersPage;
