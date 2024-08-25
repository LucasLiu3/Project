import { useEffect, useState } from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoute";
import { allPrivateRoutes } from "./router/routes";
import { useDispatch, useSelector } from "react-redux";
import { get_user_info } from "./store/Reducers/authReducer";

export default function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);

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

  return <Router allRouters={allRoutes}></Router>;
}
