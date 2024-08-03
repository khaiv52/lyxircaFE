import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk"; // Correct import of redux-thunk
import { authReducer } from "./Auth/Reducer";
import { customerProductReducer } from "./Product/Reducer";
import { cartReducer } from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import adminOrderReducer from "./Admin/Order/Reducer";
import { categoryReducer } from "./Category/Reducer";
import { featuredReducer } from "./Featured/Reducer";

const rootReducers = combineReducers({
  auth: authReducer,
  products: customerProductReducer,
  cart: cartReducer,
  order: orderReducer,
  admin: adminOrderReducer,
  category: categoryReducer,
  feature: featuredReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
