import { api, API_BASE_URL } from "../../config/apiConfig";
import {
  CLEAR_PRODUCTS_BY_CATEGORY_FAILURE,
  CLEAR_PRODUCTS_BY_CATEGORY_REQUEST,
  CLEAR_PRODUCTS_BY_CATEGORY_SUCCESS,
  CREATE_PRODUCTS_FAILURE,
  CREATE_PRODUCTS_REQUEST,
  CREATE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_FAILURE,
  DELETE_PRODUCTS_REQUEST,
  DELETE_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCTS_BY_SEARCH_TEXT_FAILURE,
  FIND_PRODUCTS_BY_SEARCH_TEXT_REQUEST,
  FIND_PRODUCTS_BY_SEARCH_TEXT_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  GET_PRODUCTS_BY_CATEGORY_NAME_FAILURE,
  GET_PRODUCTS_BY_CATEGORY_NAME_REQUEST,
  GET_PRODUCTS_BY_CATEGORY_NAME_SUCCESS,
  UPDATE_PRODUCTS_FAILURE,
  UPDATE_PRODUCTS_REQUEST,
  UPDATE_PRODUCTS_SUCCESS
} from "./ActionType";

export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });
  const {
    colors = [],
    sizes = [],
    minPrice = 0,
    maxPrice = 100,
    minDiscount = 0,
    category = null,
    parentCategoryName = null,
    stock = "",
    sort = "price_low",
    pageNumber = 0,
    pageSize = 10,
  } = reqData;

  try {
    const { data } = await api.get("/api/products", {
      params: {
        color: colors.join(","), // Ensure colors are passed as a comma-separated string
        size: sizes.join(","), // Ensure sizes are passed as a comma-separated string
        minPrice: minPrice,
        maxPrice: maxPrice,
        minDiscount: minDiscount,
        category: category,
        parentCategoryName: parentCategoryName,
        stock: stock,
        sort: sort,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    console.log("Products after filtering", data)
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const findProductById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  const productId = reqData;
  try {
    const { data } = await api.get(`/api/products/id/${productId}`);
    // console.log(data);
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};

// Action to get products by category name
export const getProductsByCategoryName = (categoryName) => async (dispatch) => {
  dispatch({ type: GET_PRODUCTS_BY_CATEGORY_NAME_REQUEST });
  console.log(categoryName);
  try {
    // Perform the GET request to fetch products by category name
    const { data } = await api.get(`/api/products/category/${categoryName}`);
    // Dispatch success action with the fetched data
    dispatch({
      type: GET_PRODUCTS_BY_CATEGORY_NAME_SUCCESS,
      payload: { category: categoryName, products: data },
    });
    console.log("categoryName: ", categoryName)
    console.log("Data: ", data)
  } catch (error) {
    // Dispatch failure action with the error message
    dispatch({
      type: GET_PRODUCTS_BY_CATEGORY_NAME_FAILURE,
      payload: error.response ? error.response.data : error.message,
    });
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCTS_REQUEST });
    const { data } = await api.post(
      `/api/admin/products`, // Đảm bảo URL đúng
      product
    );
    console.log("created products: ", data);
    dispatch({
      type: CREATE_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCTS_FAILURE,
      payload: error.message,
    });
  }
};

export const updateProduct = (productId, reqData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCTS_REQUEST });
    // Use PUT method and pass reqData as request body
    const { data } = await api.put(
      `/api/admin/products/update/${productId}`,
      reqData
    );
    console.log("update product: ", data);
    dispatch({
      type: UPDATE_PRODUCTS_SUCCESS,
      payload: data, // Use the response data
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCTS_FAILURE,
      payload: error.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCTS_REQUEST });
    const data = await api.delete(
      `${API_BASE_URL}/api/admin/products/delete/${productId}`
    );
    console.log("delete product: ", data);
    dispatch({
      type: DELETE_PRODUCTS_SUCCESS,
      payload: productId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCTS_FAILURE,
      payload: error.message,
    });
  }
};

export const clearProductsByCategory = () => (dispatch) => {
  dispatch({type: CLEAR_PRODUCTS_BY_CATEGORY_REQUEST});
  try {
    dispatch({type: CLEAR_PRODUCTS_BY_CATEGORY_SUCCESS, payload: {}});
  } catch(error) {
    dispatch({type: CLEAR_PRODUCTS_BY_CATEGORY_FAILURE, payload: error.message});
  }
};

export const findProductsBySearchText = (searchText) => async (dispatch) => {
  try {
    dispatch({ type: FIND_PRODUCTS_BY_SEARCH_TEXT_REQUEST });
    console.log(searchText);
    
    const {data} = await api.get(
      `${API_BASE_URL}/api/products/search?searchText=${searchText}`
    );
    console.log("Get list products: ", data);
    dispatch({
      type: FIND_PRODUCTS_BY_SEARCH_TEXT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCTS_BY_SEARCH_TEXT_FAILURE,
      payload: error.message,
    });
  }
};