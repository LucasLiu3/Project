import { Outlet } from "react-router-dom";
import Header from "../customers/Header";
import Footer from "./Footer";

function FrontLayout() {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}

export default FrontLayout;
