import { FiberPin } from "@material-ui/icons";
import React, { useReducer } from "react";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
import { SET_ALERT } from "./types";

export default function AlertState({ children }) {
  const initialState = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (msg, type) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, type },
    });
  };

  return (
    <AlertContext.Provider value={{ alerts: state , setAlert}}>
      {children}
    </AlertContext.Provider>
  );
}
