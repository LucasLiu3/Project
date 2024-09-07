import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#f7f7f7]">
      <div className="w-[85%] flex flex-warp mx-auto border-b py-16 md-lg:pb-10 sm:pb-6">
        <div className="w-3/12 lg:w-4/12 sm:w-full">
          <div className="flex flex-col gap-3">
            <img src="/images/logo.png" alt="" className="h-[70px] w-[190px]" />
            <ul className="flex flex-col gap-2 text-slate-600 font-bold">
              <li>Address : 85084 Ellesmere Junction Road, Lincoln 7647</li>
              <li>Email : support@gmail.com</li>
              <li>Phone : 04-473 1234 </li>
            </ul>
          </div>
        </div>

        <div className="w-4/12 lg:w-8/12 sm:w-full">
          <div className="flex justify-center w-full sm:justify-start sm:mt-6 ">
            <div>
              <h2 className="font-bold text-lg mb-2">Useful Links</h2>
              <div className="flex justify-between gap-[120px] lg:gap-[40px] font-semibold">
                <ul className="flex flex-col gap-3 text-slate-600 text-sm">
                  <li>
                    <Link>About us</Link>
                  </li>
                  <li>
                    <Link>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link>Delivery Policy</Link>
                  </li>{" "}
                  <li>
                    <Link>Return Policy</Link>
                  </li>{" "}
                  <li>
                    <Link>Refund Policy</Link>
                  </li>
                </ul>
                <ul className="flex flex-col gap-3 text-slate-600 text-sm">
                  <li>
                    <Link>Our Service</Link>
                  </li>
                  <li>
                    <Link>Sell on Easy</Link>
                  </li>
                  <li>
                    <Link>Help</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-4/12 lg:w-full lg:mt-6">
          <div className="w-full flex flex-col justify-start gap-5">
            <h2 className="font-bold text-lg mb-2">Join Us</h2>
            <span>Subscribe to get our lastes and special offers</span>
            <div className=" h-[50px] w-full bg-white border relative ">
              <input
                type="text"
                placeholder="Email"
                className="h-full bg-transparent w-full px-3 outline-none "
              />
              <button className="h-full w-[100px] absolute bg-[#059473] right-0 text-white">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[85%] flex flex-warp justify-center items-center text-slate-600 mx-auto py-5 text-center">
        <span>Copyright @ 2024 All Rights Reserved</span>
      </div>
    </footer>
  );
}

export default Footer;
