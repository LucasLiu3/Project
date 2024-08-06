import { useEffect, useState } from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoute";
import { allPrivateRoutes } from "./router/routes";

export default function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);

  useEffect(function () {
    const routes = allPrivateRoutes();
    setAllRoutes((allRoutes) => [...allRoutes, routes]);
  }, []);

  return <Router allRouters={allRoutes}></Router>;
}
