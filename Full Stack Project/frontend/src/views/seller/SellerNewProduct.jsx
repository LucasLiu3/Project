import { useState } from "react";
import { Link } from "react-router-dom";

import NewProductForm from "../../components/sellers/NewProductForm";
import Button from "../../components/shared/Button";
import NewProductImage from "../../components/sellers/NewProductImage";

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

  function handleChange(e) {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  }

  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

  function imageHandler(e) {
    console.log(e.target.files);

    const imageFiles = e.target.files;
    const length = imageFiles.length;

    if (length > 0) {
      setImages([...images, imageFiles]);

      const imageUrl = [];

      for (let i = 0; i < length; i++) {
        imageUrl.push({ url: URL.createObjectURL(imageFiles[i]) });
      }

      setImageShow([...imageShow, ...imageUrl]);
    }
  }

  function changeImage(image, index) {
    console.log(image);
    if (image) {
      const tempUrl = imageShow;
      const tempImage = images;

      tempImage[index] = image;
      tempUrl[index] = { url: URL.createObjectURL(image) };

      setImages([...tempImage]);
      setImageShow([...tempUrl]);
    }
  }

  function removeImage(index) {
    const filterImage = images.filter((each, i) => i !== index);
    const filterUrl = imageShow.filter((each, i) => i !== index);

    setImages([...filterImage]);
    setImageShow([...filterUrl]);
  }

  return (
    <div className="w-full bg-[#6a5fdf] rounded-md p-4">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-lx font-semibold text-[#d0d2d6]">
          Add New Product
        </h1>

        <Link
          to="/seller/products"
          className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 "
        >
          All Product
        </Link>
      </div>

      <div>
        <form>
          <NewProductForm
            formInfo={formInfo}
            handleChange={handleChange}
          ></NewProductForm>

          <div className="grid lg:grid-cols-8 grid-cols-1 md:grid-cols-4 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-[#d0d2d6] mb-4 mt-5">
            <NewProductImage
              imageShow={imageShow}
              changeImage={changeImage}
              removeImage={removeImage}
              imageHandler={imageHandler}
            ></NewProductImage>
          </div>

          <div className="mt-5 flex">
            <Button>Add Product</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SellerNewProduct;
