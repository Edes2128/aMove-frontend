import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthSate({ children }) {
  const [auth, setAuth] = useState(false);

  return (
    <AuthContext.Provider value={(auth, setAuth)}>
      {children}
    </AuthContext.Provider>
  );
}
