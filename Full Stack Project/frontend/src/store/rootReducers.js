import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer";
import productReducer from "./Reducers/productReducer";
import profileReducer from "./Reducers/profileReducer";
import sellerReducer from "./Reducers/sellerReducer";
import customerReducer from "./Reducers/customerReducer";
import cartReducer from "./Reducers/cartReducer";
import orderReducer from "./Reducers/orderReducer";
import CustomerDashboardReducer from "./Reducers/CustomerDashboardReducer";
import chatReducer from "./Reducers/chatReducer";
import chatInReducer from "./Reducers/chatInReducer";
import paymentReducer from "./Reducers/paymentReducer";
import dashboardReducer from "./Reducers/dashboardReducer";

const rootReducer = {
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  profile: profileReducer,
  seller: sellerReducer,
  customer: customerReducer,
  cart: cartReducer,
  order: orderReducer,
  customerDashboard: CustomerDashboardReducer,
  chat: chatReducer,
  chatIn: chatInReducer,
  payment: paymentReducer,
  dashboard: dashboardReducer,
};

export default rootReducer;
