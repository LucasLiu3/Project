import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function ProtectCustomer({ children }) {
  const { customerInfo } = useSelector((state) => state.customer);

  if (customerInfo) return <div>{children}</div>;
  else return <Navigate to="/login" replace={true}></Navigate>;
}

export default ProtectCustomer;
