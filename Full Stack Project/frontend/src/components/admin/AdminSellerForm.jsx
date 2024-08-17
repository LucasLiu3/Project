import Button from "../shared/Button";

function AdminSellerForm() {
  return (
    <div>
      <form>
        <div className="flex gap-4 py-3">
          <select
            className="px-4 py-2 focus:border-slate-700 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]"
            name=""
            id=""
          >
            <option value="">--Select Status--</option>
            <option value="active">Active</option>
            <option value="deactive">Deactive</option>
          </select>

          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default AdminSellerForm;
