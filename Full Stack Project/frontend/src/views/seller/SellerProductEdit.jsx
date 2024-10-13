import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import NewProductForm from "../../components/sellers/NewProductForm";
import Button from "../../components/shared/Button";
import NewProductImage from "../../components/sellers/NewProductImage";

import { useDispatch, useSelector } from "react-redux";
import {
  getOneProduct,
  messageClear,
  updateProduct,
} from "../../store/Reducers/productReducer";
import toast from "react-hot-toast";

function SellerProductEdit() {
  const dispatch = useDispatch();
  const [formInfo, setFormInfo] = useState({
    product: "",
    brand: "",
    category: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
  });

  const { productId } = useParams();
  const { category } = useSelector((state) => state.category);
  const categoryName = category.map((each) => ({ categoryName: each.slug }));
  const { loader, product, successMessage, errorMessage } = useSelector(
    (state) => state.product
  );

  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    if (!loader && product) {
      setFormInfo({
        product: product.product,
        brand: product.brand,
        category: product.category,
        stock: product.stock,
        price: product.price,
        discount: product.discount,
        description: product.description,
      });
      setImageShow(product.images);
      setOldImages(product.images);
    }
  }, [loader, product]);

  useEffect(
    function () {
      dispatch(getOneProduct(productId));
    },
    [dispatch, productId]
  );

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch, productId]);

  function updateHandler(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("product", formInfo.product);
    formData.append("brand", formInfo.brand);
    formData.append("category", formInfo.category);
    formData.append("stock", formInfo.stock);
    formData.append("price", formInfo.price);
    formData.append("discount", formInfo.discount);
    formData.append("description", formInfo.description);
    formData.append("productId", productId);
    formData.append("oldImages", oldImages);

    if (newImages[0]?.length > 0) {
      for (let i = 0; i < newImages[0].length; i++) {
        formData.append("newImages", newImages[0][i]);
      }
    }

    dispatch(updateProduct(formData));
  }

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
        <form onSubmit={updateHandler}>
          <NewProductForm
            formInfo={formInfo}
            setFormInfo={setFormInfo}
            categoryName={categoryName}
          ></NewProductForm>

          <div className="grid lg:grid-cols-8 grid-cols-1 md:grid-cols-4 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-[#212529] mb-4 mt-5">
            <NewProductImage
              imageShow={imageShow}
              setImages={setImages}
              setImageShow={setImageShow}
              images={images}
              newImages={newImages}
              setNewImages={setNewImages}
              oldImages={oldImages}
              setOldImages={setOldImages}
            ></NewProductImage>
          </div>

          <div className="mt-5 flex">
            <Button>Update</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SellerProductEdit;
