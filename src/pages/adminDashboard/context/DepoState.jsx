import React, { useReducer } from "react";
import DepoContext from "./DepoContext";
import DepoReducer from "./DepoReducer";
import axios from "axios";

export default function DepoState({children}) {
  const initialState = {
    user: {},
    klientet: [],
    produktet: [],
    porosite: [],
  };

  const [state, dispatch] = useReducer(DepoReducer, initialState);

  return (
    <DepoContext.Provider
      value={{
        user: state.user,
        klientet: state.klientet,
        produktet: state.produktet,
        porosite: state.porosite,
      }}
    >
        {children}
    </DepoContext.Provider>
  );
}
