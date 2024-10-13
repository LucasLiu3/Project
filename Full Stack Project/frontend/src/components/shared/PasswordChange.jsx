function PasswordChange() {
  return (
    <div className="w-full md:w-6/12">
      <div className="w-full pl-0 md:pl-7 mt-6 md:mt-0">
        <div className="bg-[#f8f9fa] rounded-md text-[#212529] p-4">
          <h1 className="text-[#212529] text-lg mb-3 font-semibold">
            Change Password
          </h1>
          <form>
            <div className="flex flex-col w-full gap-1 mb-2">
              <label htmlFor="o_password">Old Password</label>
              <input
                className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#f8f9fa] border border-slate-700 rounded-md text-[#212529]"
                type="password"
                name="o_password"
                id="o_password"
                placeholder="Old Password"
              />
            </div>

            <div className="flex flex-col w-full gap-1 mb-2">
              <label htmlFor="n_password">New Password</label>
              <input
                className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#f8f9fa] border border-slate-700 rounded-md text-[#212529]"
                type="password"
                name="n_password"
                id="n_password"
                placeholder="New Password"
              />
            </div>

            <div className="flex flex-col w-full gap-1 mb-2">
              <label htmlFor="con_password">Confrimed Password</label>
              <input
                className="px-4 py-2 focus:border-indigo-200 outline-none bg-[#f8f9fa] border border-slate-700 rounded-md text-[#212529]"
                type="password"
                name="con_password"
                id="con_password"
                placeholder="Confirmed Password"
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
