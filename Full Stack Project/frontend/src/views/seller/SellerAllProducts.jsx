import { useEffect, useState } from "react";

import Pagination from "../../components/Pagination";
import { HeadModule } from "../../components/shared/HeadModule";
import { ContentModule } from "./../../components/shared/ContentModule";
import Filter from "../../components/shared/Filter";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/Reducers/productReducer";

function SellerAllProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchContent, setSearchContent] = useState("");

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  const allProducts = products.map((each, index) => ({
    ...each,
    number: index,
  }));

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  let selectedProduct = allProducts.slice(startIndex, endIndex);

  if (searchContent) {
    selectedProduct = selectedProduct.filter(
      (each) =>
        each.product.toLowerCase().indexOf(searchContent.toLowerCase()) > -1
    );
  }

  useEffect(
    function () {
      dispatch(getProducts());
    },
    [dispatch]
  );

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

  return (
    <div className="w-full p-4 bg-[#f8f9fa] rounded-md">
      <Filter
        perPage={perPage}
        setPerPage={setPerPage}
        setSearchContent={setSearchContent}
      ></Filter>

      <div className="relative mt-5 overflow-y-auto overflow-x-hidden">
        <table className="w-full text-sm text-[#212529]">
          <thead className=" uppercase border-b border-slate-700">
            <HeadModule headerTitle={headerTitle}></HeadModule>
          </thead>

          <tbody>
            {selectedProduct.length > 0 ? (
              <ContentModule
                data={selectedProduct}
                content="products"
              ></ContentModule>
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  <span className="text-2xl font-bold">No Product Found!</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="w-full flex justify-end mt-4 mr-4 pr-10 bottom-4 right-4">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          perPage={perPage}
          totalItem={searchContent ? selectedProduct.length : products.length}
          showPageNmber={3}
        ></Pagination>
      </div>
    </div>
  );
}

export default SellerAllProducts;
