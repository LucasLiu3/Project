import { privateRoutes } from "./privateRoute";
import MainLayout from "./../../layout/MainLayout";

export const allPrivateRoutes = () => {
  return {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: privateRoutes,
  };
};
