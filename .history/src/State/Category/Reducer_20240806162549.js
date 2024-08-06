import { GET_ADMIN_DATA_FAILURE } from "../Auth/ActionType";
import {
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_SUCCESS,
  RESET_CATEGORIES,
  GET_CATEGORIES_BY_SEARCH_TEXT_REQUEST,
  GET_CATEGORIES_BY_SEARCH_TEXT_SUCCESS,
  GET_CATEGORIES_BY_SEARCH_TEXT_FAILURE,
  UPDATE_TOP_LEVEL_CATEGORY_REQUEST,
  UPDATE_TOP_LEVEL_CATEGORY_SUCCESS,
  UPDATE_TOP_LEVEL_CATEGORY_FAILURE,
  UPDATE_SECOND_LEVEL_CATEGORY_REQUEST,
  UPDATE_SECOND_LEVEL_CATEGORY_SUCCESS,
  UPDATE_SECOND_LEVEL_CATEGORY_FAILURE,
  UPDATE_THIRD_LEVEL_CATEGORY_REQUEST,
  UPDATE_THIRD_LEVEL_CATEGORY_SUCCESS,
  UPDATE_THIRD_LEVEL_CATEGORY_FAILURE,
  FETCH_TOP_LEVEL_CATEGORY_REQUEST,
  FETCH_TOP_LEVEL_CATEGORY_SUCCESS,
  FETCH_TOP_LEVEL_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
} from "./ActionType";

const initialState = {
  loading: false,
  error: null,
  categories: [],
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORY_REQUEST:
    case GET_CATEGORIES_BY_SEARCH_TEXT_REQUEST:
    case UPDATE_TOP_LEVEL_CATEGORY_REQUEST:
    case UPDATE_SECOND_LEVEL_CATEGORY_REQUEST:
    case UPDATE_THIRD_LEVEL_CATEGORY_REQUEST:
    case FETCH_TOP_LEVEL_CATEGORY_REQUEST:
      
      return { ...state, loading: true, error: null };
    case GET_ALL_CATEGORY_SUCCESS:
    case GET_CATEGORIES_BY_SEARCH_TEXT_SUCCESS:
    case FETCH_TOP_LEVEL_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        categories: action.payload,
      };
    case UPDATE_TOP_LEVEL_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        categories: state.categories.map((category) =>
          category.id === action.payload.id
            ? { ...category, name: action.payload.newName }
            : category
        ),
      };
    case UPDATE_SECOND_LEVEL_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        categories: state.categories.map((category) => ({
          ...category,
          sections: category.sections.map((section) =>
            section.id === action.payload.id
              ? { ...section, ...action.payload.req }
              : section
          ),
        })),
      };

    case UPDATE_THIRD_LEVEL_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        categories: state.categories.map((category) => ({
          ...category,
          sections: category.sections.map((section) => ({
            ...section,
            categoryItems: section.categoryItems.map((item) =>
              item.id === action.payload.id
                ? { ...item, ...action.payload.req }
                : item
            ),
          })),
        })),
      };

    case RESET_CATEGORIES:
      return { ...state, categories: [] };
    case GET_ADMIN_DATA_FAILURE:
    case GET_CATEGORIES_BY_SEARCH_TEXT_FAILURE:
    case UPDATE_TOP_LEVEL_CATEGORY_FAILURE:
    case UPDATE_SECOND_LEVEL_CATEGORY_FAILURE:
    case UPDATE_THIRD_LEVEL_CATEGORY_FAILURE:
    case FETCH_TOP_LEVEL_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
