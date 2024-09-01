import { FaImage } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

function NewProductImage({
  images,
  imageShow,
  setImages,
  setImageShow,
  newImages,
  setNewImages,
  oldImages,
  setOldImages,
}) {
  function imageHandler(e) {
    const imageFiles = e.target.files;
    const length = imageFiles.length;

    if (length > 0) {
      setNewImages?.([...newImages, imageFiles]);
      setImages([...images, imageFiles]);

      const imageUrl = [];

      for (let i = 0; i < length; i++) {
        imageUrl.push({ url: URL.createObjectURL(imageFiles[i]) });
      }

      setImageShow([...imageShow, ...imageUrl]);
    }
  }

  function changeImage(image, index) {
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
    if (index < oldImages.length) {
      // Removing an old image
      setOldImages(oldImages.filter((_, i) => i !== index));
    } else {
      // Removing a new image
      const newIndex = index - oldImages.length;
      setNewImages(newImages.filter((_, i) => i !== newIndex));
    }

    const filterImage = images.filter((each, i) => i !== index);
    const filterUrl = imageShow.filter((each, i) => i !== index);

    setImages([...filterImage]);
    setImageShow([...filterUrl]);
  }

  return (
    <>
      {imageShow.map((each, index) => (
        <div key={index} className="h-[180px] w-[180px] relative">
          <label htmlFor={index}>
            <img
              src={each.url ? each.url : each}
              alt=""
              className=" h-full rounded-lg border border-dash border-slate-700"
            />
          </label>
          <input
            onChange={(e) => changeImage(e.target.files[0], index)}
            type="file"
            id={index}
            className="hidden"
          />
          <span
            className=" z-10 cursor-pointer bg-slate-700  hover:shadow-lg hover:shadow-slate-400/50
                text-white top-2 right-2 absolute rounded-full"
            onClick={() => removeImage(index)}
          >
            <IoIosCloseCircle></IoIosCloseCircle>
          </span>
        </div>
      ))}

      <label
        htmlFor="image"
        className="flex justify-center items-center flex-col
            h-[180px] w-[180px] cursor-pointer border border-dashed border-slate-700
            hover:border-white "
      >
        <span>
          <FaImage></FaImage>
        </span>
        <span>Select Image</span>
        <input
          multiple
          type="file"
          name="image"
          id="image"
          className="hidden"
          onChange={imageHandler}
        />
      </label>
    </>
  );
}

export default NewProductImage;
