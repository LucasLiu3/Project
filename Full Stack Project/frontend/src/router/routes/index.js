import { privateRoutes } from "./privateRoute";
import MainLayout from "./../../layout/MainLayout";
import ProtectRoute from "./ProtectRoute";

export const allPrivateRoutes = () => {
  privateRoutes.map(
    (r) => (r.element = <ProtectRoute route={r}>{r.element}</ProtectRoute>)
  );

  return {
    element: <MainLayout></MainLayout>,
    children: privateRoutes,
  };
};
