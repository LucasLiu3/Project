function NewProductForm({ formInfo, categoryName, setFormInfo }) {
  function handleChange(e) {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <>
      <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
        <div className="flex flex-col w-full gap-1">
          <label>Product Name</label>
          <input
            type="text"
            name="product"
            id="product"
            onChange={handleChange}
            value={formInfo.product}
            className="h-[40px] px-3 py-2 mt-2 rounded-md bg-[#b1addf] 
      border bg-transparent border-slate-700 text-white focus:border-indigo-700 
      overflow-hidden outline-none placeholder-bold "
          />
        </div>
        <div className="flex flex-col w-full gap-1">
          <label>Brand Name</label>
          <input
            type="text"
            name="brand"
            id="brand"
            onChange={handleChange}
            value={formInfo.brand}
            className="h-[40px] px-3 py-2 mt-2 rounded-md bg-[#b1addf] 
      border bg-transparent border-slate-700 text-white focus:border-indigo-700 
      overflow-hidden outline-none placeholder-bold "
          />
        </div>
      </div>

      <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
        <div className="flex flex-col w-full gap-1">
          <label>Category Name</label>
          <select
            className="px-4 py-2 mt-2 focus:border-slate-700 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
            name="category"
            id="category"
            value={formInfo.category ? formInfo.category : ""}
            onChange={handleChange}
          >
            <option value="">--Select Category--</option>
            {categoryName.map((each, index) => (
              <option value={each.categoryName} key={index}>
                {each.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-full gap-1">
          <label>Stock</label>
          <input
            type="text"
            name="stock"
            id="stock"
            onChange={handleChange}
            value={formInfo.stock}
            className="h-[40px] px-3 py-2 mt-2 rounded-md bg-[#b1addf] 
      border bg-transparent border-slate-700 text-white focus:border-indigo-700 
      overflow-hidden outline-none placeholder-bold "
          />
        </div>
      </div>

      <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
        <div className="flex flex-col w-full gap-1">
          <label>Price</label>
          <input
            type="text"
            name="price"
            id="price"
            onChange={handleChange}
            value={formInfo.price}
            className="h-[40px] px-3 py-2 mt-2 rounded-md bg-[#b1addf] 
      border bg-transparent border-slate-700 text-white focus:border-indigo-700 
      overflow-hidden outline-none placeholder-bold "
          />
        </div>
        <div className="flex flex-col w-full gap-1">
          <label>Discount</label>
          <input
            type="text"
            name="discount"
            id="discount"
            onChange={handleChange}
            value={formInfo.discount}
            className="h-[40px] px-3 py-2 mt-2 rounded-md bg-[#b1addf] 
      border bg-transparent border-slate-700 text-white focus:border-indigo-700 
      overflow-hidden outline-none placeholder-bold "
          />
        </div>
      </div>

      <div className="flex flex-col w-full gap-1 text-[#d0d2d6]">
        <label>Description</label>
        <textarea
          cols="2"
          rows="3"
          type="text"
          name="description"
          id="description"
          onChange={handleChange}
          value={formInfo.description}
          className=" px-3 py-2 mt-2 rounded-md bg-[#b1addf] 
      border bg-transparent border-slate-700 text-white focus:border-indigo-700 
      overflow-hidden outline-none placeholder-bold "
        ></textarea>
      </div>
    </>
  );
}

export default NewProductForm;
