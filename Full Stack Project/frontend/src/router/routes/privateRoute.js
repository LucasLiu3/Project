import adminRoutes from "./adminRoute";
import sellerRoutes from "./sellerRoute";

export const privateRoutes = [...adminRoutes, ...sellerRoutes];
