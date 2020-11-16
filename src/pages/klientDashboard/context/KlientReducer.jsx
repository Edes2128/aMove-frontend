import {GET_ALL_PRODUCTS,GET_CART_PRODUCTS,GET_USER,GET_WISHLIST_PRODUCTS} from './types';

export default (state,action) => {


    switch(action.type){
        case GET_USER : return {...state,user: action.payload};
        default : return state;
    }

}