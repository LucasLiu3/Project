import { FaImage } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  createNewCategory,
  messageClear,
} from "../../store/Reducers/categoryReducer";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import NewButton from "../shared/NewButton";

function AdminCategoryForm() {
  const [newCategory, setNewCategory] = useState({
    name: "",
    image: "",
  });

  const [imageShow, setImageShow] = useState("");
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.category
  );

  // if (loader) return;

  function iamgeHandle(e) {
    let files = e.target.files;

    if (files.length > 0) {
      setImageShow(URL.createObjectURL(files[0]));
      setNewCategory({ ...newCategory, image: files[0] });
    }
  }

  function add_category(e) {
    e.preventDefault();
    dispatch(createNewCategory(newCategory));
  }

  useEffect(
    function () {
      if (successMessage) {
        toast.success(successMessage);
        setNewCategory({ name: "", image: "" });
        setImageShow("");
        dispatch(messageClear());
      }
      if (errorMessage) {
        toast.error(errorMessage);
        dispatch(messageClear());
      }
    },
    [successMessage, errorMessage, dispatch]
  );

  return (
    <div
      className="rounded-md bg-[#f8f9fa] h-screen lg:h-auto px-3 py-2 
      lg:rounded-md text-[#212529] sm:h-full ]"
    >
      <h1 className="text-center font-semibold text-xl mb-4 w-full sm:pt-5">
        Add Category
      </h1>

      <form onSubmit={add_category}>
        <div className="flex flex-col wfull gap-1 mb-3">
          <span>Category Name</span>
          <input
            value={newCategory.name}
            type="text"
            id="name"
            name="category_name"
            className="h-[40px] px-3 py-2 mt-2 rounded-md bg-[#f8f9fa] 
              border bg-transparent border-slate-700 text-[#212529] focus:border-indigo-700 
              overflow-hidden outline-none placeholder-bold "
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
          />
        </div>

        <div>
          <label className="flex justify-center items-center flex-col h-[238px] w-full cursor-pointer border border-dashed border-[#d0d2d6] hover:border-black">
            {imageShow ? (
              <img src={imageShow} alt="" className="h-full w-full" />
            ) : (
              <>
                {" "}
                <span>
                  <FaImage></FaImage>
                </span>
                <span>Select Image</span>
              </>
            )}

            <input
              type="file"
              name="image"
              id="image"
              className="hidden"
              onChange={iamgeHandle}
            />
          </label>

          <div className="pt-5 mb-5">
            <NewButton loader={loader}>Add Category</NewButton>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdminCategoryForm;
