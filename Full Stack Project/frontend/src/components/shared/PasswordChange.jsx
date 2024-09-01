function PasswordChange() {
  return (
    <div className="w-full md:w-6/12">
      <div className="w-full pl-0 md:pl-7 mt-6 md:mt-0">
        <div className="bg-[#6a5fdf] rounded-md text-[#d0d2d6] p-4">
          <h1 className="text-[#d0d2d6] text-lg mb-3 font-semibold">
            Change Password
          </h1>
          <form>
            <div className="flex flex-col w-full gap-1 mb-2">
              <label htmlFor="email">Email</label>
              <input
                className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                type="email"
                name="email"
                id="email"
                placeholder="email"
              />
            </div>

            <div className="flex flex-col w-full gap-1 mb-2">
              <label htmlFor="o_password">Old Password</label>
              <input
                className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                type="password"
                name="old_password"
                id="o_password"
                placeholder="Old Password"
              />
            </div>

            <div className="flex flex-col w-full gap-1 mb-2">
              <label htmlFor="n_password">New Password</label>
              <input
                className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
                type="password"
                name="new_password"
                id="n_password"
                placeholder="New Password"
              />
            </div>

            <button className="bg-red-500  hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordChange;
