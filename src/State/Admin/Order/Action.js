import { api } from "../../../config/apiConfig";
import {
  CANCELED_ORDER_FAILURE,
  CANCELED_ORDER_REQUEST,
  CANCELED_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELIVERED_ORDER_FAILURE,
  DELIVERED_ORDER_REQUEST,
  DELIVERED_ORDER_SUCCESS,
  DELIVERING_ORDER_FAILURE,
  DELIVERING_ORDER_REQUEST,
  DELIVERING_ORDER_SUCCESS,
} from "./ActionType";
import {
  CONFIRMED_ORDER_FAILURE,
  CONFIRMED_ORDER_REQUEST,
  CONFIRMED_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  SHIP_ORDER_FAILURE,
  SHIP_ORDER_REQUEST,
  SHIP_ORDER_SUCCESS,
} from "./ActionType";

export const getOrders = () => async (dispatch) => {
  dispatch({ type: GET_ORDER_REQUEST });
  try {
    const response = await api.get("/api/admin/orders");
    console.log("get all orders", response.data);
    dispatch({ type: GET_ORDER_SUCCESS, payload: response.data });
  } catch (error) {
    console.log("Catch error", error);
    dispatch({ type: GET_ORDER_FAILURE, action: error.message });
  }
};

export const confirmedOrder = (orderId) => async (dispatch) => {
  dispatch({ type: CONFIRMED_ORDER_REQUEST });
  try {
    const response = await api.put(`api/admin/orders/${orderId}/confirmed`);
    const data = response.data;
    console.log("confirmed_order", data);
    dispatch({ type: CONFIRMED_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CONFIRMED_ORDER_FAILURE, payload: error.message });
  }
};

export const shipOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: SHIP_ORDER_REQUEST });
    const { data } = await api.put(`/api/admin/orders/${orderId}/ship`);
    console.log("shipped order", data);
    dispatch({ type: SHIP_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SHIP_ORDER_FAILURE, payload: error.message });
  }
};

export const deliveringOrder = (orderId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DELIVERING_ORDER_REQUEST });
      const { data } = await api.put(`/api/admin/orders/${orderId}/delivering`);
      console.log("delivering order", data);
      dispatch({ type: DELIVERING_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: DELIVERING_ORDER_FAILURE, payload: error.message });
    }
  };
};

export const deliveredOrder = (orderId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DELIVERED_ORDER_REQUEST });
      const { data } = await api.put(`/api/admin/orders/${orderId}/deliver`);
      console.log("delivered order", data);
      dispatch({ type: DELIVERED_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: DELIVERED_ORDER_FAILURE, payload: error.message });
    }
  };
};

export const canceledOrder = (orderId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CANCELED_ORDER_REQUEST });
      const { data } = await api.put(`/api/admin/orders/${orderId}/cancel`);
      console.log("canceled order", data);
      dispatch({ type: CANCELED_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CANCELED_ORDER_FAILURE, payload: error.message });
    }
  };
};

export const deleteOrder = (orderId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DELETE_ORDER_REQUEST });
      const { data } = await api.delete(`/api/admin/orders/${orderId}/delete`);
      console.log("shipped order", data);
      dispatch({ type: DELETE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: DELETE_ORDER_FAILURE, payload: error.message });
    }
  };
};
