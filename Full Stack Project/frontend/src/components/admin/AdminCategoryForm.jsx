import { FaImage } from "react-icons/fa";
import Button from "../shared/Button";

function AdminCategoryForm() {
  return (
    <div
      className="rounded-md bg-[#6a5fdf] h-screen lg:h-auto px-3 py-2 
      lg:rounded-md text-[#d0d2d6] sm:h-full ]"
    >
      <h1 className="text-center font-semibold text-xl mb-4 w-full sm:pt-5">
        Add Category
      </h1>

      <form>
        <div className="flex flex-col wfull gap-1 mb-3">
          <span>Category Name</span>
          <input
            type="text"
            name="categoryName"
            id="categoryName"
            className="h-[40px] px-3 py-2 mt-2 rounded-md bg-[#b1addf] 
              border bg-transparent border-slate-700 text-white focus:border-indigo-700 
              overflow-hidden outline-none placeholder-bold "
          />
        </div>

        <div>
          <label className="flex justify-center items-center flex-col h-[238px] w-full cursor-pointer border border-dashed border-[#d0d2d6] hover:border-black">
            <span>
              <FaImage></FaImage>
            </span>
            <span>Select Image</span>
            <input type="file" name="image" id="image" className="hidden" />
          </label>

          <div className="pt-5 mb-5">
            <Button>Add Category</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdminCategoryForm;
