import { CallToActionSharp, Satellite } from '@material-ui/icons';
import {GET_ALL_PRODUCTS,GET_CART_PRODUCTS,GET_USER,GET_WISHLIST_PRODUCTS,GET_ORDERS_SINGLE_USER  } from './types';

export default (state,action) => {
    switch(action.type){
        case GET_USER : return {...state,user: action.payload};
        case GET_ALL_PRODUCTS : return {...state,products: action.payload};
        case GET_CART_PRODUCTS : return {...state,cartProducts : action.payload};
        case GET_WISHLIST_PRODUCTS : return {...state,wishlistProducts: action.payload};
        case GET_ORDERS_SINGLE_USER : return {...state,ordersSingleUser: action.payload}
        default : return state;
    }
}
