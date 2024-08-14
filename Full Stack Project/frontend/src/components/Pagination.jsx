function Pagination({
  currentPage,
  setCurrentPage,
  perPage,
  totalItem,
  showPageNmber,
}) {
  const totalPage = Math.ceil(totalItem / perPage);

  const startPage = currentPage <= 0 ? 1 : currentPage;

  const endPage = startPage === 1 ? showPageNmber : showPageNmber + startPage;

  function createBtn() {
    const btns = [];

    for (let i = startPage; i < endPage; i++) {
      btns.push(
        <li
          key={i}
          onClick={() => setCurrentPage(i)}
          className={` ${
            currentPage === i
              ? "bg-indigo-300 shadow-lg shadow-indigo-300/50 text-white"
              : "bg-slate-600 hover:bg-indigo-400 shadow-lg hover:shadow-indigo-500/50 hover:text-white text-[#d0d2d6]"
          } w-[33px] h-[33px] rounded-full flex justify-center items-center cursor-pointer `}
        >
          {i}
        </li>
      );

      return btns;
    }
  }

  return (
    <ul className="flex gap-3">
      {currentPage > 1 && <button>Left</button>}
      {createBtn()}
    </ul>
  );
}

export default Pagination;
