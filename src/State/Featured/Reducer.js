import {
  GET_ALL_FEATURES_FAILURE,
  GET_ALL_FEATURES_REQUEST,
  GET_ALL_FEATURES_SUCCESS,
} from "./ActionType";

const initialState = {
  featured: {},
  features: [],
  loading: false,
  error: null,
};

export const featuredReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FEATURES_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_ALL_FEATURES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        features: action.payload,
      };
    case GET_ALL_FEATURES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        features: state.features,
      };
    default:
      return state;
  }
};
