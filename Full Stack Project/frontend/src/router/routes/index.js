import { privateRoutes } from "./privateRoute";
import MainLayout from "./../../layout/MainLayout";

export const allPrivateRoutes = () => {
  return {
    element: <MainLayout></MainLayout>,
    children: privateRoutes,
  };
};
