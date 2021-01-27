import React, { useReducer } from "react";
import DepoContext from "./DepoContext";
import DepoReducer from "./DepoReducer";
import axios from "axios";
import {
  GET_ALL_CLIENTS,
  GET_ALL_ORDERS,
  GET_USER,
  GET_ALL_PRODUCTS,
  GET_ORDER_DETAILS,
  EMPTY_ORDER_DETAILS,
  GET_ATTR_NAMES,
  GET_ATTR_VALUES,
  GET_CATEGORY_PRODUCTS,
  GET_CATEGORY_CLIENTS,
  GET_ZONA_CLIENTS,
} from "./types";

export default function DepoState({ children }) {
  const initialState = {
    user: {},
    klientet: [],
    produktet: [],
    porosite: [],
    orderDetails: [],
    attrNames: [],
    attrValues: [],
    categoryProducts: [],
    categoryClients: [],
    zonaClients: [],
  };

  const [state, dispatch] = useReducer(DepoReducer, initialState);

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

  const getOrderDetails = async (order) => {
    const res = await axios.get(
      `https://amove.alcodeit.com/get_orderDetails.php?klient=${order.klientID}&order_id=${order.ID}`
    );

    dispatch({
      type: GET_ORDER_DETAILS,
      payload: res.data,
    });
  };

  const emptyOrderDetails = async () => {
    dispatch({
      type: EMPTY_ORDER_DETAILS,
    });
  };

  const getAllClients = async () => {
    const res = await axios.get(
      "https://amove.alcodeit.com/getAll_clients.php"
    );

    dispatch({
      type: GET_ALL_CLIENTS,
      payload: res.data,
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

  const getAllOrders = async () => {
    const res = await axios.get("https://amove.alcodeit.com/getAll_orders.php");

    dispatch({
      type: GET_ALL_ORDERS,
      payload: res.data,
    });
  };

  const cancelOrder = async (order_id) => {
    await axios.post(
      `https://amove.alcodeit.com/cancel_order.php?order_id=${order_id}`
    );

    setTimeout(() => getAllOrders(), 100);
  };

  const deleteProduct = async (product_id) => {
    await axios.post(
      `https://amove.alcodeit.com/delete_product.php?product_id=${product_id}`
    );

    setTimeout(() => getAllProducts(), 100);
  };

  const deleteUser = async (user_id) => {
    await axios.post(
      `https://amove.alcodeit.com/delete_user.php?user_id=${user_id}`
    );

    setTimeout(() => getAllClients(), 100);
  };

  const increaseOrderQty = async (order) => {
    await axios.post(
      `https://amove.alcodeit.com/increase_order_qty.php?order_id=${order.ID}&produkt_id=${order.produktID}`
    );
    setTimeout(() => getOrderDetails(order), 100);
    setTimeout(() => getAllOrders(), 100);
  };

  const decreaseOrderQty = async (order) => {
    await axios.post(
      `https://amove.alcodeit.com/decrease_order_qty.php?order_id=${order.ID}&produkt_id=${order.produktID}`
    );
    setTimeout(() => getOrderDetails(order), 100);
    setTimeout(() => getAllOrders(), 100);
  };

  const deleteProductFromOrder = async (orderID, productID, order) => {
    await axios.post(
      `https://amove.alcodeit.com/delete_product_from_order.php?order_id=${orderID}&produkt_id=${productID}`
    );

    setTimeout(() => getOrderDetails(order), 100);
    setTimeout(() => getAllOrders(), 100);
    setTimeout(() => getAllProducts(), 100);
  };

  const addProductToOrder = async (data, orderID) => {
    const payload = {
      cmimi: data.cmimi,
      produktID: data.id,
    };
    await axios.post(
      `https://amove.alcodeit.com/add_product_to_order.php?order_id=${orderID}`,
      payload
    );
    setTimeout(() => getAllOrders(), 100);
    setTimeout(() => getAllProducts(), 100);
  };

  const getAttrNames = async () => {
    const res = await axios.get(
      "https://amove.alcodeit.com/get_all_attr_names.php"
    );
    dispatch({
      type: GET_ATTR_NAMES,
      payload: res.data,
    });
  };

  const getAttrValues = async () => {
    const res = await axios.get(
      "https://amove.alcodeit.com/get_name_values_attribues.php"
    );
    dispatch({
      type: GET_ATTR_VALUES,
      payload: res.data,
    });
  };

  const getCategoryProducts = async () => {
    const res = await axios.get(
      "https://amove.alcodeit.com/get_productCategory.php"
    );
    dispatch({
      type: GET_CATEGORY_PRODUCTS,
      payload: res.data,
    });
  };

  const getCategoryClients = async () => {
    const res = await axios.get(
      "https://amove.alcodeit.com/get_category_client.php"
    );
    dispatch({
      type: GET_CATEGORY_CLIENTS,
      payload: res.data,
    });
  };

  const getZonaClients = async () => {
    const res = await axios.get(
      "https://amove.alcodeit.com/get_zona_clients.php"
    );
    dispatch({
      type: GET_ZONA_CLIENTS,
      payload: res.data,
    });
  };

  return (
    <DepoContext.Provider
      value={{
        user: state.user,
        klientet: state.klientet,
        produktet: state.produktet,
        porosite: state.porosite,
        orderDetails: state.orderDetails,
        attrNames: state.attrNames,
        attrValues: state.attrValues,
        categoryProducts: state.categoryProducts,
        categoryClients: state.categoryClients,
        zonaClients: state.zonaClients,
        getUser,
        getAllClients,
        getAllProducts,
        getAllOrders,
        cancelOrder,
        deleteProduct,
        deleteUser,
        increaseOrderQty,
        getOrderDetails,
        emptyOrderDetails,
        decreaseOrderQty,
        deleteProductFromOrder,
        addProductToOrder,
        getAttrNames,
        getAttrValues,
        getCategoryProducts,
        getCategoryClients,
        getZonaClients,
      }}
    >
      {children}
    </DepoContext.Provider>
  );
}
