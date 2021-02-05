import React, { useReducer } from "react";
import axios from "axios";
import KlientContext from "./KlientContext";
import KlientReducer from "./KlientReducer";

import {
  GET_USER,
  GET_ALL_PRODUCTS,
  GET_WISHLIST_PRODUCTS,
  GET_CART_PRODUCTS,
  GET_ORDERS_SINGLE_USER,
  GET_PRODUCTS_CATEGORIES,
} from "./types";

export default function KlientState({ children }) {
  const initialState = {
    user: {},
    products: [],
    cartProducts: [],
    wishlistProducts: [],
    ordersSingleUser: [],
    produktCategories: [],
  };
  const [state, dispatch] = useReducer(KlientReducer, initialState);

  const getUser = async () => {
    const res = await axios.get(
      `https://amove.alcodeit.com/user_profile.php?token="${JSON.parse(
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
      "https://amove.alcodeit.com/get_allProducts.php"
    );
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: res.data,
    });
  };

  const getCartProducts = async () => {
    const res = await axios.get(
      `https://amove.alcodeit.com/get_products_fromCart.php?klient=${JSON.parse(
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
      `https://amove.alcodeit.com/get_productsWishlist.php?klient=${JSON.parse(
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
    await axios.post("https://amove.alcodeit.com/add_toCart.php", payload);
    setTimeout(() => getCartProducts(), 100);
  };

  const removeFromCart = async (product) => {
    axios.post(
      `https://amove.alcodeit.com/remove_product_fromCart.php?klient=${JSON.parse(
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

    axios.post("https://amove.alcodeit.com/add_toWishlist.php", payload);

    setTimeout(() => getWishlistProducts(), 100);
  };

  const removeFromWishlist = async (product) => {
    axios.post(
      `https://amove.alcodeit.com/remove_product_fromWishlist.php?klient=${JSON.parse(
        localStorage.getItem("id")
      )}&product=${product.id}`
    );

    setTimeout(() => getWishlistProducts(), 100);
  };

  const increaseQty = async (product) => {
    const payload = {
      id: product.product_id,
      klient_id: parseInt(JSON.parse(localStorage.getItem("id"))),
    };

    axios.post("https://amove.alcodeit.com/increase_qty.php", payload);

    setTimeout(() => getCartProducts(), 100);
  };

  const decreaseQty = async (product) => {
    const payload = {
      id: product.product_id,
      klient_id: parseInt(JSON.parse(localStorage.getItem("id"))),
    };

    axios.post("https://amove.alcodeit.com/decrease_qty.php", payload);

    setTimeout(() => getCartProducts(), 100);
  };

  const makeOrder = async (payload, totali) => {
    await axios
      .post(
        `https://amove.alcodeit.com/add_Order.php?klient=${JSON.parse(
          localStorage.getItem("id")
        )}`,
        { payload, totali }
      )
      .then((res) => {
        if (res.data.status === 1) {
          axios.post(
            "https://amove.alcodeit.com/remove_AllProducts_from_cart.php"
          );

          setTimeout(() => getCartProducts(), 100);
        }
      });
  };

  const getAllOrders = async () => {
    const res = await axios.get(
      `https://amove.alcodeit.com/getAllOrders_forSingleUser.php?klient=${JSON.parse(
        localStorage.getItem("id")
      )}`
    );

    dispatch({
      type: GET_ORDERS_SINGLE_USER,
      payload: res.data,
    });
  };

  const getCategoryProducts = async () => {
    const res = await axios.get(
      "https://amove.alcodeit.com/get_productCategory.php"
    );
    dispatch({
      type: GET_PRODUCTS_CATEGORIES,
      payload: res.data,
    });
  };

  return (
    <KlientContext.Provider
      value={{
        user: state.user,
        products: state.products,
        cartProducts: state.cartProducts,
        wishlistProducts: state.wishlistProducts,
        ordersSingleUser: state.ordersSingleUser,
        produktCategories: state.produktCategories,
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
        makeOrder,
        getAllOrders,
        getCategoryProducts,
      }}
    >
      {children}
    </KlientContext.Provider>
  );
}
