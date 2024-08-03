import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  FETCH_USER_ORDERS_REQUEST,
  FETCH_USER_ORDERS_SUCCESS,
  FETCH_USER_ORDERS_FAILURE,
  FETCH_ORDERS_BY_STATUS_REQUEST,
  FETCH_ORDERS_BY_STATUS_SUCCESS,
  FETCH_ORDERS_BY_STATUS_FAILURE,
} from "./ActionType";

const initialState = {
  orders: [],
  order: null,
  error: null,
  loading: false,
};

export const orderReducer = (state = initialState, action) => {
  // console.log('Order reducer received action:', action.type);
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
    case FETCH_USER_ORDERS_REQUEST:
    case FETCH_ORDERS_BY_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_ORDER_SUCCESS:
      console.log("Reducer payload:", action.payload); // Log payload
      return {
        ...state,
        loading: false,
        error: null,
        order: action.payload,
      };
    case CREATE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_ORDER_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        order: action.payload,
      };
    case FETCH_USER_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
        error: "",
      };
    case FETCH_ORDERS_BY_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
        error: "",
      };
    case GET_ORDER_BY_ID_FAILURE:
    case FETCH_ORDERS_BY_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_USER_ORDERS_FAILURE:
      return {
        loading: false,
        orders: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
