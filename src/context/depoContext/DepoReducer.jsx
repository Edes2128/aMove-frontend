import {
  GET_ALL_CLIENTS,
  GET_ORDER_DETAILS,
  GET_ALL_ORDERS,
  GET_USER,
  GET_ALL_PRODUCTS,
  EMPTY_ORDER_DETAILS,
  GET_ATTR_VALUES,
  GET_ATTR_NAMES,
  GET_CATEGORY_PRODUCTS,
} from "./types";

export default (state, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.payload };
    case GET_ALL_CLIENTS:
      return { ...state, klientet: action.payload };
    case GET_ALL_PRODUCTS:
      return { ...state, produktet: action.payload };
    case GET_ALL_ORDERS:
      return { ...state, porosite: action.payload };
    case GET_ORDER_DETAILS:
      return { ...state, orderDetails: action.payload };
    case EMPTY_ORDER_DETAILS:
      return { ...state, orderDetails: [] };
    case GET_ATTR_NAMES:
      return { ...state, attrNames: action.payload };
    case GET_ATTR_VALUES:
      return { ...state, attrValues: action.payload };
    case GET_CATEGORY_PRODUCTS:
      return { ...state, categoryProducts: action.payload };
    default:
      return state;
  }
};
