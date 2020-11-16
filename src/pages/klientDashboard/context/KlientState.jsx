import React , {useEffect,useState,useReducer} from 'react';
import axios from 'axios';
import KlientContext from './KlientContext';
import klientContext from './KlientContext';
import KlientReducer from './KlientReducer';
import {GET_USER,GET_ALL_PRODUCTS,GET_WISHLIST_PRODUCTS,GET_CART_PRODUCTS} from './types';


export default function KlientState({children}) {
   
    const initialState = {
        user : {},

    }
        const [state,dispatch] = useReducer(KlientReducer,initialState)
    
        const getUser = async (token) => {
         const res =  await axios.get(`http://localhost/demo_react_server/api/config/user_profile.php?token="${token}"`);
         dispatch({
             type: GET_USER,
             payload: res.data.user
         })
        }


    return (
        <KlientContext.Provider value={{user:state.user,getUser}} >
            {children}
        </KlientContext.Provider>
    )
}
