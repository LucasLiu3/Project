import { useEffect, useState } from "react";
import Router from "./router/Router";
import { allPrivateRoutes } from "./router/routes";
import { useDispatch, useSelector } from "react-redux";
import { get_user_info } from "./store/Reducers/authReducer";
import publicRoutes from "./router/routes/publicRoute";
import { getCategory } from "./store/Reducers/categoryReducer";
import { getProductsAll } from "./store/Reducers/productReducer";

export default function App() {
  const [allRoutes, setAllRoutes] = useState([publicRoutes()]);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(function () {
    const routes = allPrivateRoutes();
    setAllRoutes((allRoutes) => [...allRoutes, routes]);
  }, []);

  useEffect(
    function () {
      if (!token) return;

      dispatch(get_user_info());
    },
    [token, dispatch]
  );

  useEffect(
    function () {
      dispatch(getCategory());
      dispatch(getProductsAll());
    },
    [dispatch]
  );

  return <Router allRouters={allRoutes}></Router>;
}
