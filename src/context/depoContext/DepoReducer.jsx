import {
  GET_ALL_CLIENTS,
  GET_ORDERS_SINGLE_USER,
  GET_ALL_ORDERS,
  GET_USER,
  GET_ALL_PRODUCTS,
} from "./types";

export default (state, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.payload };
    case GET_ALL_CLIENTS:
      return { ...state, klientet: action.payload };
      case GET_ALL_PRODUCTS: 
      return {...state, produktet: action.payload};
      case GET_ALL_ORDERS: 
      return {...state, porosite : action.payload}
  }
};

