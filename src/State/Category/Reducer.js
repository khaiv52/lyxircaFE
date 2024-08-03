import { GET_ADMIN_DATA_FAILURE } from "../Auth/ActionType";
import {
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_SUCCESS,
  RESET_CATEGORIES,
} from "./ActionType";

const initialState = {
  loading: false,
  error: null,
  categories: [],
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        categories: action.payload,
      };
    case RESET_CATEGORIES:
      return { ...state, categories: [] };
    case GET_ADMIN_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
