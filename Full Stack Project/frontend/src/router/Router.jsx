import { useRoutes } from "react-router-dom";

const Router = ({ allRouters }) => {
  const routes = useRoutes([...allRouters]);

  return routes;
};

export default Router;
