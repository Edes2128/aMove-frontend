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
  GET_CATEGORY_CLIENTS,
  GET_ZONA_CLIENTS,
  GET_PRODUKT_ATTR,
  SET_LOADING
} from "./types";

export default (state, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.payload  };
    case GET_ALL_CLIENTS:
      return { ...state, klientet: action.payload, loading: false };
    case GET_ALL_PRODUCTS:
      return { ...state, produktet: action.payload, loading : false };
    case GET_ALL_ORDERS:
      return { ...state, porosite: action.payload, loading: false };
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
    case GET_CATEGORY_CLIENTS:
      return { ...state, categoryClients: action.payload };
    case GET_ZONA_CLIENTS:
      return { ...state, zonaClients: action.payload };
    case GET_PRODUKT_ATTR:
      return { ...state, produktAttr: action.payload };
      case SET_LOADING:
        return {...state,loading : true }
    default:
      return state;
  }
};
