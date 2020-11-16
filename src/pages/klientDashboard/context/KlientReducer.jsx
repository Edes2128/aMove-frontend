import {useContext} from 'react';
import KlientContext from './KlientContext';
import {GET_ALL_PRODUCTS,GET_CART_PRODUCTS,GET_USER,GET_WISHLIST_PRODUCTS } from './types';


export default (state,action) => {

    const klientContext = useContext(KlientContext);

    switch(action.type){
        case GET_USER : return {...state,user: action.payload};
        case GET_ALL_PRODUCTS : return {...state,products: action.payload};
        case GET_CART_PRODUCTS : return {...state,cartProducts : action.payload};
        case GET_WISHLIST_PRODUCTS : return {...state,wishlistProducts: action.payload};
        default : return state;
    }
}
