import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

function Pagination({
  currentPage,
  setCurrentPage,
  perPage,
  totalItem,
  showPageNmber,
}) {
  const totalPage = Math.ceil(totalItem / perPage);

  let startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(showPageNmber / 2),
      totalPage - showPageNmber + 1
    )
  );
  let endPage = Math.min(startPage + showPageNmber - 1, totalPage);

  function createBtn() {
    const btns = [];
    for (let i = startPage; i <= endPage; i++) {
      btns.push(
        <li
          key={i}
          onClick={() => setCurrentPage(i)}
          className={` ${
            currentPage === i
              ? "bg-indigo-300 shadow-lg shadow-indigo-300/50 text-white"
              : "bg-slate-600 hover:bg-indigo-400 shadow-lg hover:shadow-indigo-500/50 hover:text-white text-[#d0d2d6]"
          } w-[30px] h-[30px] rounded-full flex justify-center items-center cursor-pointer `}
        >
          {i}
        </li>
      );
    }
    return btns;
  }

  return (
    <ul className="flex gap-3">
      {totalPage > 1 && (
        <>
          {currentPage > 1 && (
            <li
              className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <MdOutlineKeyboardDoubleArrowLeft />
            </li>
          )}
          {createBtn()}
          {endPage < totalPage && (
            <li
              className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-slate-300 text-[#000000] cursor-pointer"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <MdOutlineKeyboardDoubleArrowRight />
            </li>
          )}
        </>
      )}
    </ul>
  );
}

export default Pagination;
