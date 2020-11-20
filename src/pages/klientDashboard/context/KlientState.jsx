import React, { useReducer} from "react";
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
      `http://localhost/demo_react_server/api/config/get_products_fromCart.php?klient=${JSON.parse(
        localStorage.getItem("id")
      )}`
    );
    dispatch({
      type: GET_CART_PRODUCTS,
      payload: res.data,
    });
  };

  const getWishlistProducts = async () => {
    const res = await axios.get(
      `http://localhost/demo_react_server/api/config/get_productsWishlist.php?klient=${JSON.parse(
        localStorage.getItem("id")
      )}`
    );
    dispatch({
      type: GET_WISHLIST_PRODUCTS,
      payload: res.data,
    });
  };

  const addToCart = async (product) => {
    const payload = {
      productID: product.id,
      klientID: JSON.parse(localStorage.getItem("id")),
    };
    await axios.post(
      "http://localhost/demo_react_server/api/config/add_toCart.php",
      payload
    );
    setTimeout(() => getCartProducts(), 100);
  };

  const removeFromCart = async (product) => {
    axios.post(
      `http://localhost/demo_react_server/api/config/remove_product_fromCart.php?klient=${JSON.parse(
        localStorage.getItem("id")
      )}&product=${product.id}`
    );

    setTimeout(() => getCartProducts(), 100);
  };

  const addToWishlist = async (product) => {
    const payload = {
      productID: product.id,
      klientID: JSON.parse(localStorage.getItem("id")),
    };

    axios.post(
      "http://localhost/demo_react_server/api/config/add_toWishlist.php",
      payload
    );

    setTimeout(() => getWishlistProducts(), 100);
  };

  const removeFromWishlist = async (product) => {
    axios.post(
      `http://localhost/demo_react_server/api/config/remove_product_fromWishlist.php?klient=${JSON.parse(
        localStorage.getItem("id")
      )}&product=${product.id}`
    );

    setTimeout(() => getWishlistProducts(), 100);
  };

  const increaseQty = async (product) => {
    const payload = {
      id: product.product_id,
    };

    axios.post(
      "http://localhost/demo_react_server/api/config/increase_qty.php",
      payload
    );

    setTimeout(() => getCartProducts(), 100);
  };

  const decreaseQty = async (product) => {
    const payload = {
      id: product.product_id,
    };

    axios.post(
      "http://localhost/demo_react_server/api/config/decrease_qty.php",
      payload
    );

    setTimeout(() => getCartProducts(), 100);
  };

  const editQtySinlge = async (product) => {
        const payload = {
            id: product.product_id,
        };

        axios.post("http://localhost/demo_react_server/api/config/edit_qty_singleProduct.php",payload);
  }

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
        getWishlistProducts,
        addToCart,
        addToWishlist,
        removeFromWishlist,
        removeFromCart,
        increaseQty,
        decreaseQty,
        editQtySinlge
      }}
    >
      {children}
    </KlientContext.Provider>
  );
}
