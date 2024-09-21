function ChangePassword() {
  return (
    <div className="p-4 bg-white">
      <h2 className="text-xl text-slate-600 pb-5">Change Password</h2>

      <form>
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            id="oldPassword"
            className="outline-none px-3 py-1 border rounded-md text-slate-600"
          />
        </div>

        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            className="outline-none px-3 py-1 border rounded-md text-slate-600"
          />
        </div>

        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="confirmPassword">Comfirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="outline-none px-3 py-1 border rounded-md text-slate-600"
          />
        </div>

        <button className="px-8 py-2 bg-red-500 text-white rounded-lg hover:shadow-red-500/30 ">
          Change Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
