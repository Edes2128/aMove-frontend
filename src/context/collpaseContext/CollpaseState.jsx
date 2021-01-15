import React, { useReducer } from "react";
import CollapseContext from "./CollpaseContext";
import CollpaseReducer from "./CollapseReducer";
import { SET_COLLAPSE_TRUE, SET_COLLAPSE_FALSE } from "./types";

export default function CollpaseState({ children }) {
  const initialState = false;

  const [state, dispatch] = useReducer(CollpaseReducer, initialState);

  const setTrue = () => {
    dispatch({
      type: SET_COLLAPSE_TRUE,
      payload: true,
    });
  };

  const setFalse = () => {
    dispatch({
      type: SET_COLLAPSE_FALSE,
      payload: false,
    });
  };

  return (
    <CollapseContext.Provider value={{ value: state, setFalse, setTrue }}>
      {children}
    </CollapseContext.Provider>
  );
}
