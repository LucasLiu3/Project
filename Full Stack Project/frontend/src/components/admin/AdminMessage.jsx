import { Link } from "react-router-dom";

function AdminMessage() {
  return (
    <div className="w-full bg-[#6a5fdf] p-4 rounded-md text-[#d0d2d6]">
      <div className="flex justify-between items-center font-semibold pb-3">
        <h2 className=" text-lg">Recent Messages</h2>
        <Link className="text-sm">View all</Link>
      </div>

      <div className="flex flex-col gap-2 pt-6">
        <ol className="relative border-1 border-slate-600 ml-4">
          <li className="mb-3 ml-6">
            <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#4c7fe2] rounded-full z-10 ">
              <img
                src="/images/admin.jpg"
                alt=""
                className="w-full h-full rounded-full shadow-lg"
              />
            </div>

            <div className="p-3 bg-slate-800 rounded-lg border border-slate-500 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <Link className="text-md font-normal">Admin</Link>
                <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                  2 days ago
                </time>
              </div>

              <div className="p-2 text-xs font-normal bg-slate-500 rounded-lg border-slate-800">
                Message hoderplace
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default AdminMessage;