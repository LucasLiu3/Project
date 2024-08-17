import { FaImage } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

function NewProductImage({
  imageShow,
  changeImage,
  removeImage,
  imageHandler,
}) {
  return (
    <>
      {imageShow.map((each, index) => (
        <div key={index} className="h-[180px] w-[180px] relative">
          <label htmlFor={index}>
            <img
              src={each.url}
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
