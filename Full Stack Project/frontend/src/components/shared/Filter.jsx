function Filter({ perPage, setPerPage, setSearchContent }) {
  return (
    <div className="flex justify-between items-center">
      <select
        className="h-[40px] px-3 py-2 rounded-md bg-[#b1addf] border bg-transparent
      border-slate-700 text-black focus:border-indigo-700 outline-none placeholder-bold "
        name="perPage"
        id="perPage"
        value={perPage}
        onChange={(e) => setPerPage(parseInt(e.target.value))}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>

      <input
        type="text"
        name="search"
        placeholder="search..."
        className="h-[40px] px-3 py-2 rounded-md bg-[#b1addf] 
      border bg-transparent border-slate-700 text-white focus:border-indigo-700 
      overflow-hidden outline-none placeholder-bold "
        onChange={(e) => setSearchContent(e.target.value)}
      />
    </div>
  );
}

export default Filter;
