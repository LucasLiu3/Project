import { useState } from "react";

import AdminCategoryForm from "./../../components/admin/AdminCategoryForm";
import Pagination from "../../components/Pagination";

import { HeadModule } from "../../components/shared/HeadModule";
import { ContentModule } from "../../components/shared/ContentModule";
import Filter from "../../components/shared/Filter";

function AdminCategoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const [searchContent, setSearchContent] = useState("");

  const headerTitle = ["No", "Image", "Name", "Action"];

  const fakeContent = [
    { image: "1.jpg", name: "Shoes" },
    { image: "2.jpg", name: "Watches" },
    { image: "3.jpg", name: "Clothes" },
    { image: "4.jpg", name: "Bags" },
    { image: "5.jpg", name: "Furniture" },
  ];

  return (
    <div className=" flex flex-wrap w-full">
      <div className="w-full lg:w-7/12 lg:pr-3 bg-[#6a5fdf] rounded-md p-4">
        <Filter
          perPage={perPage}
          setPerPage={setPerPage}
          setSearchContent={setSearchContent}
        ></Filter>

        <div className="relative overflow-y-auto pt-4 ">
          <table className="w-full text-sm text-[#d0d2d6] ">
            <thead className="py-3 px-4 uppercase border-b border-slate-700">
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
            totalItem={5}
            showPageNmber={3}
          ></Pagination>
        </div>
      </div>

      <div className="w-full lg:w-5/12 lg:pl-5 lg:mt-0 sm:mt-5">
        <AdminCategoryForm></AdminCategoryForm>
      </div>
    </div>
  );
}

export default AdminCategoryPage;
