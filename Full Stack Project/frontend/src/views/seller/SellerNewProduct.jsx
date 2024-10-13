import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import NewProductForm from "../../components/sellers/NewProductForm";
import Button from "../../components/shared/Button";
import NewProductImage from "../../components/sellers/NewProductImage";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../store/Reducers/categoryReducer";
import {
  createNewProduct,
  messageClear,
} from "../../store/Reducers/productReducer";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";

function SellerNewProduct() {
  const [formInfo, setFormInfo] = useState({
    product: "",
    brand: "",
    category: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
  });

  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(getCategory());
    },
    [dispatch]
  );

  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.product
  );

  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);

  const { category } = useSelector((state) => state.category);
  const categoryName = category.map((each) => ({ categoryName: each.slug }));

  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

  function addNewProduct(e) {
    e.preventDefault();

    const formDate = new FormData();
    formDate.append("product", formInfo.product);
    formDate.append("brand", formInfo.brand);
    formDate.append("category", formInfo.category);
    formDate.append("stock", formInfo.stock);
    formDate.append("price", formInfo.price);
    formDate.append("discount", formInfo.discount);
    formDate.append("description", formInfo.description);
    formDate.append("shopName", userInfo.shopInfo.shopName);

    for (let i = 0; i < images[0].length; i++) {
      formDate.append("images", images[0][i]);
    }

    dispatch(createNewProduct(formDate));
  }

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setFormInfo({
        product: "",
        brand: "",
        category: "",
        stock: "",
        price: "",
        discount: "",
        description: "",
      });
      setImageShow([]);
      setImages([]);
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  return (
    <div className="w-full bg-[#f8f9fa] rounded-md p-4">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-lx font-semibold text-[#212529]">
          Add New Product
        </h1>

        <Link
          to="/seller/products"
          className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-[#212529] rounded-md px-7 py-2 "
        >
          All Product
        </Link>
      </div>

      <div>
        <form onSubmit={addNewProduct}>
          <NewProductForm
            formInfo={formInfo}
            categoryName={categoryName}
            setFormInfo={setFormInfo}
          ></NewProductForm>

          <div className="grid lg:grid-cols-8 grid-cols-1 md:grid-cols-4 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-[#212529] mb-4 mt-5">
            <NewProductImage
              imageShow={imageShow}
              setImages={setImages}
              setImageShow={setImageShow}
              images={images}
            ></NewProductImage>
          </div>

          <div className="mt-5 flex">
            <Button>
              {loader ? (
                <PropagateLoader className="px-7 py-2" />
              ) : (
                "Add Product"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SellerNewProduct;
