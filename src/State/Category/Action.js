import api from "../../config/apiConfig";
import {
  GET_ALL_CATEGORY_FAILURE,
  GET_ALL_CATEGORY_REQUEST,
  GET_ALL_CATEGORY_SUCCESS,
  RESET_CATEGORIES,
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
  dispatch({type: RESET_CATEGORIES})
};