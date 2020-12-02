import React, { useReducer } from "react";
import DepoContext from "./DepoContext";
import DepoReducer from "./DepoReducer";
import axios from "axios";
import {
  GET_ALL_CLIENTS,
  GET_ORDERS_SINGLE_USER,
  GET_ALL_ORDERS,
  GET_USER,
  GET_ALL_PRODUCTS,
} from "./types";


export default function DepoState({ children }) {
  const initialState = {
    user: {},
    klientet: [],
    produktet: [],
    porosite: [],
  };

  const [state, dispatch] = useReducer(DepoReducer, initialState);

  const getUser = async () => {
    const res = await axios.get(
      `https://192.168.88.250/demo_react_server/api/config/user_profile.php?token="${JSON.parse(
        localStorage.getItem("token")
      )}"`
    );
    dispatch({
        type : GET_USER,
        payload : res.data.user
    })
  };

  return (
    <DepoContext.Provider
      value={{
        user: state.user,
        klientet: state.klientet,
        produktet: state.produktet,
        porosite: state.porosite,
        getUser
      }}
    >
      {children}
    </DepoContext.Provider>
  );
}
