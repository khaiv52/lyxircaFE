import { startIdleTransaction } from "@sentry/tracing";
import {
  DELETE_PRODUCTS_REQUEST,
  DELETE_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  UPDATE_PRODUCTS_REQUEST,
  UPDATE_PRODUCTS_SUCCESS,
  UPDATE_PRODUCTS_FAILURE,
  GET_PRODUCTS_BY_CATEGORY_NAME_FAILURE,
  GET_PRODUCTS_BY_CATEGORY_NAME_REQUEST,
  GET_PRODUCTS_BY_CATEGORY_NAME_SUCCESS,
  CLEAR_PRODUCTS_BY_CATEGORY_REQUEST,
  CLEAR_PRODUCTS_BY_CATEGORY_SUCCESS,
  CLEAR_PRODUCTS_BY_CATEGORY_FAILURE,
  FIND_PRODUCTS_BY_SEARCH_TEXT_REQUEST,
  FIND_PRODUCTS_BY_SEARCH_TEXT_SUCCESS,
  FIND_PRODUCTS_BY_SEARCH_TEXT_FAILURE,
} from "./ActionType";

const initialState = {
  products: [], // Danh sách sản phẩm
  product: null, // Chi tiết sản phẩm đơn lẻ
  loading: false, // Trạng thái tải
  error: null, // Lỗi nếu có
  productsByCategory: {},
  delete: []
};

export const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_PRODUCTS_REQUEST:
    case FIND_PRODUCT_BY_ID_REQUEST:
    case DELETE_PRODUCTS_REQUEST:
    case UPDATE_PRODUCTS_REQUEST:
    case GET_PRODUCTS_BY_CATEGORY_NAME_REQUEST:
    case CLEAR_PRODUCTS_BY_CATEGORY_REQUEST:
    case FIND_PRODUCTS_BY_SEARCH_TEXT_REQUEST:
      return { ...state, loading: true, error: null };

    case FIND_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload, // Cập nhật danh sách sản phẩm
      };

    case FIND_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        product: action.payload, // Cập nhật sản phẩm chi tiết
      };

    case GET_PRODUCTS_BY_CATEGORY_NAME_SUCCESS:
      return {
        ...state,
        productsByCategory: {
          ...state.productsByCategory,
          [action.payload.category]: action.payload.products,
        },
        loading: false,
      };

    case FIND_PRODUCTS_BY_SEARCH_TEXT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };

    case DELETE_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ), // Cập nhật danh sách sản phẩm sau khi xóa
      };

    case UPDATE_PRODUCTS_SUCCESS: // Add this case
      return {
        ...state,
        loading: false,
        error: null,
        products: state.products.map(
          (product) =>
            product.id === action.payload.id ? action.payload : product // Cập nhật sản phẩm trong danh sách
        ),
        product: action.payload, // Cập nhật sản phẩm chi tiết nếu cần
      };

    case CLEAR_PRODUCTS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        productsByCategory: action.payload,
      };

    case FIND_PRODUCTS_FAILURE:
    case FIND_PRODUCT_BY_ID_FAILURE:
    case UPDATE_PRODUCTS_FAILURE:
    case GET_PRODUCTS_BY_CATEGORY_NAME_FAILURE:
    case CLEAR_PRODUCTS_BY_CATEGORY_FAILURE:
    case FIND_PRODUCTS_BY_SEARCH_TEXT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
