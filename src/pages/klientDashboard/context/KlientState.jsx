import React, { useReducer, useEffect } from "react";
import axios from "axios";
import KlientContext from "./KlientContext";
import KlientReducer from "./KlientReducer";
import {
  GET_USER,
  GET_ALL_PRODUCTS,
  GET_WISHLIST_PRODUCTS,
  GET_CART_PRODUCTS,
} from "./types";

export default function KlientState({ children }) {
  // axios.get(`http://localhost/demo_react_server/api/config/get_productsWishlist.php?klient=${res.data.user.id}`).then(res => setWishlistProducts(res.data))

  const initialState = {
    user: {},
    products: [],
    cartProducts: [],
    wishlistProducts: [],
  };
  const [state, dispatch] = useReducer(KlientReducer, initialState);

  const getUser = async () => {
    const res = await axios.get(
      `http://localhost/demo_react_server/api/config/user_profile.php?token="${JSON.parse(
        localStorage.getItem("token")
      )}"`
    );
    dispatch({
      type: GET_USER,
      payload: res.data.user,
    });
  };

  const getAllProducts = async () => {
    const res = await axios.get(
      "http://localhost/demo_react_server/api/config/get_allProducts.php"
    );
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: res.data,
    });
  };

  const getCartProducts = async () => {
    const res = await axios.get(
      `http://localhost/demo_react_server/api/config/get_products_fromCart.php?klient=${state.user.id}`
    );
    dispatch({
      type: GET_CART_PRODUCTS,
      payload: res.data,
    });
  };

  const getWishlistProducts = async () => {
      const res = await axios.get(`http://localhost/demo_react_server/api/config/get_productsWishlist.php?klient=${state.user.id}`);
      dispatch({
          type : GET_WISHLIST_PRODUCTS,
          payload : res.data
      })
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <KlientContext.Provider
      value={{
        user: state.user,
        products: state.products,
        cartProducts: state.cartProducts,
        wishlistProducts: state.wishlistProducts,
        getUser,
        getAllProducts,
        getCartProducts,
        getWishlistProducts
      }}
    >
      {children}
    </KlientContext.Provider>
  );
}
