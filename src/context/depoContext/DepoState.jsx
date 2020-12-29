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
  EMPTY_ORDER_DETAILS
} from "./types";

export default function DepoState({ children }) {
  const initialState = {
    user: {},
    klientet: [],
    produktet: [],
    porosite: [],
    orderDetails : []
  };

  const [state, dispatch] = useReducer(DepoReducer, initialState);

  const getUser = async () => {
    const res = await axios.get(
      `https://192.168.88.250/demo_react_server/api/config/user_profile.php?token="${JSON.parse(
        localStorage.getItem("token")
      )}"`
    );
    dispatch({
      type: GET_USER,
      payload: res.data.user,
    });
  };

  const getOrderDetails = async (order) => {

    const res = await axios.get(`https://192.168.88.250/demo_react_server/api/config/get_orderDetails.php?klient=${order.klientID}&order_id=${order.ID}`)

    dispatch({

      type : GET_ORDER_DETAILS,
      payload : res.data

    });
  }

  const emptyOrderDetails = async () => {

      dispatch({
        type: EMPTY_ORDER_DETAILS
      })

  }

  const getAllClients = async () => {
    const res = await axios.get(
      "https://192.168.88.250/demo_react_server/api/config/getAll_clients.php"
    );

    dispatch({
      type: GET_ALL_CLIENTS,
      payload: res.data,
    });
  };

  const getAllProducts = async () => {
    const res = await axios.get(
      "https://192.168.88.250/demo_react_server/api/config/get_allProducts.php"
    );

    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: res.data,
    });
  };

  const getAllOrders = async () => {
    const res = await axios.get(
      "https://192.168.88.250/demo_react_server/api/config/getAll_orders.php"
    );

    dispatch({
      type: GET_ALL_ORDERS,
      payload: res.data,
    });
  };

  const cancelOrder = async (order_id) => {
    await axios.post(
      `https://192.168.88.250/demo_react_server/api/config/cancel_order.php?order_id=${order_id}`
    );

    setTimeout(() => getAllOrders(), 100);
  };

  const deleteProduct = async (product_id) => {
    await axios.post(
      `https://192.168.88.250/demo_react_server/api/config/delete_product.php?product_id=${product_id}`
    );

    setTimeout(() => getAllProducts(), 100);
  };


  const deleteUser = async (user_id) => {

      await axios.post(`https://192.168.88.250/demo_react_server/api/config/delete_user.php?user_id=${user_id}`)

      setTimeout(() => getAllClients(),100);
  }

  const increaseOrderQty = async (order) => {

    await axios.post(`https://192.168.88.250/demo_react_server/api/config/increase_order_qty.php?order_id=${order.ID}&produkt_id=${order.produktID}`)
    setTimeout(() => getOrderDetails(order),100)
    setTimeout(() => getAllOrders(),100)
  }

  const decreaseOrderQty = async (order) => {

    await axios.post(`https://192.168.88.250/demo_react_server/api/config/decrease_order_qty.php?order_id=${order.ID}&produkt_id=${order.produktID}`)
    setTimeout(() => getOrderDetails(order),100)
    setTimeout(() => getAllOrders(),100)

  }


  return (
    <DepoContext.Provider
      value={{
        user: state.user,
        klientet: state.klientet,
        produktet: state.produktet,
        porosite: state.porosite,
        orderDetails : state.orderDetails,
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
        decreaseOrderQty
      }}
    >
      {children}
    </DepoContext.Provider>
  );
}
