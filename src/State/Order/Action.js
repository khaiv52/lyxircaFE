import { api } from "../../config/apiConfig";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  FETCH_USER_ORDERS_FAILURE,
  FETCH_USER_ORDERS_REQUEST,
  FETCH_USER_ORDERS_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  FETCH_ORDERS_BY_STATUS_REQUEST,
  FETCH_ORDERS_BY_STATUS_SUCCESS,
  FETCH_ORDERS_BY_STATUS_FAILURE,
} from "./ActionType";

export const createOrder = (reqData) => async (dispatch) => {
  console.log("req data: ", reqData);
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const { data } = await api.post(`/api/orders`, reqData.address);
    if (data.id) {
      reqData.navigate({ search: `step=3&order_id=${data.id}` });
    }
    console.log("created order - ", data);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("catch error: ", error);
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: error.message,
    });
  }
};

export const getOrderById = (orderId) => async (dispatch) => {
  dispatch({ type: GET_ORDER_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/orders/${orderId}`);

    console.log("Order by id - ", data);
    dispatch({
      type: GET_ORDER_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("catch error: ", error);
    dispatch({
      type: GET_ORDER_BY_ID_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchUserOrders = (jwt) => async (dispatch) => {
  dispatch({ type: FETCH_USER_ORDERS_REQUEST });
  try {
    const response = await api.get("/api/orders/user");
    dispatch({
      type: FETCH_USER_ORDERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USER_ORDERS_FAILURE,
      payload: error.message,
    });
  }
};


  // Action to fetch orders by status
  export const getOrdersByStatus = (jwt, status = '') => async (dispatch) => {
    dispatch({ type: FETCH_ORDERS_BY_STATUS_REQUEST });
    try {
      const params = status ? { params: { orderStatus: status } } : {};
      const response = await api.get("/api/orders/orderStatus", params);
      dispatch({
        type: FETCH_ORDERS_BY_STATUS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ORDERS_BY_STATUS_FAILURE,
        payload: error.message,
      });
    }
};

