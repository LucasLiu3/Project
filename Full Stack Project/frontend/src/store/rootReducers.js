import authReducer from "./Reducers/authReducer";
import categoryReducer from "./Reducers/categoryReducer";
import productReducer from "./Reducers/productReducer";
import profileReducer from "./Reducers/profileReducer";
import sellerReducer from "./Reducers/sellerReducer";

const rootReducer = {
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  profile: profileReducer,
  seller: sellerReducer,
};

export default rootReducer;
