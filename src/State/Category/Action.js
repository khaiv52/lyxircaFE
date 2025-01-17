import api from "../../config/apiConfig";
import {
  GET_ALL_CATEGORY_FAILURE,
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_SUCCESS,
  GET_CATEGORIES_BY_SEARCH_TEXT_REQUEST,
  GET_CATEGORIES_BY_SEARCH_TEXT_SUCCESS,
  GET_CATEGORIES_BY_SEARCH_TEXT_FAILURE,
  RESET_CATEGORIES,
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

export const getAllCategory = () => async (dispatch) => {
  dispatch({ type: GET_ALL_CATEGORY_REQUEST });
  try {
    const { data } = await api.get("/api/categories/all");
    console.log(data);
    dispatch({ type: GET_ALL_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error fetching categories:", error);
    dispatch({
      type: GET_ALL_CATEGORY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const resetCategories = () => async (dispatch) => {
  dispatch({ type: RESET_CATEGORIES });
};

export const getCategoriesBySearchText = (searchText) => async (dispatch) => {
  dispatch({ type: GET_CATEGORIES_BY_SEARCH_TEXT_REQUEST });
  try {
    console.log("Search Text by user: ", searchText);
    const { data } = await api.get(
      `/api/categories/all-pages?searchText=${searchText}`
    );
    console.log("Data sent from the server: ", data);
    dispatch({ type: GET_CATEGORIES_BY_SEARCH_TEXT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_CATEGORIES_BY_SEARCH_TEXT_FAILURE,
      payload: error.message,
    });
  }
};

export const updateTopLevelCategory = (id, newName) => async (dispatch) => {
  dispatch({ type: UPDATE_TOP_LEVEL_CATEGORY_REQUEST });
  try {
    // Chuyển đổi newName thành đối tượng JSON
    console.log(id, newName);

    const { data } = await api.put(
      `/api/admin/categories/update/top-level/${id}`,
      newName,
      {
        headers: {
          "Content-Type": "text/plain", // Đảm bảo header Content-Type là text/plain
        },
      }
    );
    console.log(data);

    dispatch({
      type: UPDATE_TOP_LEVEL_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TOP_LEVEL_CATEGORY_FAILURE,
      payload: error.message,
    });
  }
};

export const updateSecondLevelCategory = (id, req) => async (dispatch) => {
  dispatch({ type: UPDATE_SECOND_LEVEL_CATEGORY_REQUEST });
  try {
    await api.put(`/update/second-level/${id}`, req);
    dispatch({
      type: UPDATE_SECOND_LEVEL_CATEGORY_SUCCESS,
      payload: { id, req },
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SECOND_LEVEL_CATEGORY_FAILURE,
      payload: error.message,
    });
  }
};

export const updateThirdLevelCategory = (id, req) => async (dispatch) => {
  dispatch({ type: UPDATE_THIRD_LEVEL_CATEGORY_REQUEST });
  try {
    await api.put(`/update/third-level/${id}`, req);
    dispatch({
      type: UPDATE_THIRD_LEVEL_CATEGORY_SUCCESS,
      payload: { id, req },
    });
  } catch (error) {
    dispatch({
      type: UPDATE_THIRD_LEVEL_CATEGORY_FAILURE,
      payload: error.message,
    });
  }
};

// Fetch top-level category by ID
export const fetchTopLevelCategory = (id) => async (dispatch) => {
  dispatch({ type: FETCH_TOP_LEVEL_CATEGORY_REQUEST });
  try {
    console.log("ID: ", id);

    const response = await api.get(`/api/categories/top-level?id=${id}`);
    dispatch({
      type: FETCH_TOP_LEVEL_CATEGORY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_TOP_LEVEL_CATEGORY_FAILURE,
      payload: error.message,
    });
  }
};

// Action creators
export const createCategoryRequest = () => ({
  type: CREATE_CATEGORY_REQUEST,
});

export const createCategorySuccess = (category) => ({
  type: CREATE_CATEGORY_SUCCESS,
  payload: category,
});

export const createCategoryFailure = (error) => ({
  type: CREATE_CATEGORY_FAILURE,
  payload: error,
});

// Async action
export const createCategory = (categoryData) => async (dispatch) => {
  dispatch(createCategoryRequest());
  try {
    const {data} = await api.post('/api/admin/categories/create', categoryData);
    console.log(data);
    
    dispatch(createCategorySuccess(data));
  } catch (error) {
    dispatch(createCategoryFailure(error.message));
  }
};