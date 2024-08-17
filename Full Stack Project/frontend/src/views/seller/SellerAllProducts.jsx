import { useState } from "react";

import Pagination from "../../components/Pagination";
import { HeadModule } from "../../components/shared/HeadModule";
import { ContentModule } from "./../../components/shared/ContentModule";
import Filter from "../../components/shared/Filter";

function SellerAllProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const [searchContent, setSearchContent] = useState("");

  const headerTitle = [
    "Product ID",
    "Image",
    "Product Name",
    "Category",
    "Brand",
    "Price",
    "Discount",

    "Stock",
    "Action",
  ];

  const fakeContent = [
    {
      productId: 1,
      image: "1.jpg",
      productName: "Product 1",
      category: "Shoes",
      brand: "brand1",
      price: "333",
      discount: "20%",
      stock: "2",
    },
    {
      productId: 1,
      image: "1.jpg",
      productName: "Product 1",
      category: "Shoes",
      brand: "brand1",
      price: "333",
      discount: "20%",
      stock: "2",
    },
    {
      productId: 1,
      image: "1.jpg",
      productName: "Product 1",
      category: "Shoes",
      brand: "brand1",
      price: "333",
      discount: "20%",
      stock: "2",
    },
    {
      productId: 1,
      image: "1.jpg",
      productName: "Product 1",
      category: "Shoes",
      brand: "brand1",
      price: "333",
      discount: "20%",
      stock: "2",
    },
    {
      productId: 1,
      image: "1.jpg",
      productName: "Product 1",
      category: "Shoes",
      brand: "brand1",
      price: "333",
      discount: "20%",
      stock: "2",
    },
  ];

  return (
    <div className="w-full p-4 bg-[#6a5fdf] rounded-md">
      <Filter
        perPage={perPage}
        setPerPage={setPerPage}
        setSearchContent={setSearchContent}
      ></Filter>

      <div className="relative mt-5 overflow-y-auto overflow-x-hidden">
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

export default SellerAllProducts;
