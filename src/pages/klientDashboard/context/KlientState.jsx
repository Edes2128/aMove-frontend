import React , {useReducer} from 'react';
import axios from 'axios';
import KlientContext from './KlientContext';
import KlientReducer from './KlientReducer';
import {GET_USER,GET_ALL_PRODUCTS,GET_WISHLIST_PRODUCTS,GET_CART_PRODUCTS} from './types';


export default function KlientState({children}) {
     // axios.get(`http://localhost/demo_react_server/api/config/get_products_fromCart.php?klient=${res.data.user.id}`,).then((res) => setCartProducts(res.data))
  // axios.get(`http://localhost/demo_react_server/api/config/get_productsWishlist.php?klient=${res.data.user.id}`).then(res => setWishlistProducts(res.data))

    const initialState = {
        user : {},
        products: [],
        cartProducts : [],
        wishlistProducts: [],

    }
        const [state,dispatch] = useReducer(KlientReducer,initialState)

        const getUser = async (token) => {
         const res =  await axios.get(`http://localhost/demo_react_server/api/config/user_profile.php?token="${token}"`);
         dispatch({
             type: GET_USER,
             payload: res.data.user
         })
        }

        const getAllProducts = async () => {
            const res = await axios.get("http://localhost/demo_react_server/api/config/get_allProducts.php");
            dispatch({
                type: GET_ALL_PRODUCTS,
                payload: res.data
            })
        }

    return (
        <KlientContext.Provider value={{
            user:state.user,
            products: state.products,
            getUser,
            getAllProducts}} >
            {children}
        </KlientContext.Provider>
    )
}
