import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";

export default function FormLogin({ history }) {
  const [email, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (!error == "") {
      setTimeout(() => setError(""), 3000);
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost/demo_react_server/api/config/login.php", {email,password})
      .then((res) => {
        console.log(res.data)
        if(res.data.status === 1 && res.data.role === '1'){
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("auth",true);
        localStorage.setItem('id',JSON.stringify(res.data.id))
        history.push('/admin')
        }else if(res.data.status === 1 && res.data.role === '3'){
          localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("auth",true);
        localStorage.setItem('id',JSON.stringify(res.data.id))
        history.push('/klient')
        }else{
            setError(res.data.message);
        }
      });
  };

  return (
    <div className="App">
      <form className="form-login-home" onSubmit={onSubmit}>
        <div className="div-img-form-login-home">
          <img
            className="img-form-login-home"
            src="move-logo.png"
            width="100px"
            alt="amove logo"
          />
        </div>
        <p style={{ fontSize: "17px" }}>Sign in to continue</p>
        <div className="div-input-form-login-home">
          <TextField
            className="input-form-login-home"
            type="email"
            label="Email"
            variant="outlined"
            name="email"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="div-input-form-login-home">
          <TextField
            className="input-form-login-home"
            type="password"
            label="Password"
            variant="outlined"
            name="passowrd"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          className="submit-form-login-home"
          variant="contained"
          type="submit"
          color="primary"
        >
          Submit
        </Button>
        <p className="error">{error}</p>
      </form>
    </div>
  );
}
