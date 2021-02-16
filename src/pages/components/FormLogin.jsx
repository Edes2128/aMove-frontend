import React, { useState, useContext } from "react";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import AlertContext from "../../context/alertContext/AlertContext";
import Alerts from "./Alert";
export default function FormLogin({ history }) {
  const alertContext = useContext(AlertContext);
  const [email, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://amove.alcodeit.com/login.php", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.status === 1 && res.data.role === "1") {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          localStorage.setItem("auth", true);
          alertContext.setAlert(`${res.data.message}`, "success");
          setTimeout(() => history.push("/admin"), 2000);
        } else if (res.data.status === 1 && res.data.role === "3") {
          localStorage.setItem("token", JSON.stringify(res.data.token));
          localStorage.setItem("auth", true);
          localStorage.setItem("id", JSON.stringify(res.data.id));
          alertContext.setAlert(`${res.data.message}`, "success");
          setTimeout(() => history.push("/klient/produktet"), 2000);
        } else {
          alertContext.setAlert(`${res.data.message}`, "error");
        }
      });
  };

  return (
    <>
      <Alerts />
      <div className="App">
        <form className="form-login-home" onSubmit={onSubmit}>
          <div className="div-img-form-login-home">
            <img
              className="img-form-login-home"
              src="move-logo.png"
              alt="amove logo"
            />
          </div>
          <p
            style={{
              fontSize: "17px",
              color: "white",
              textShadow: "0 5px 10px black",
            }}
          >
            Sign in to continue
          </p>
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
              style={{ borderColor: "white" }}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            className="submit-form-login-home"
            type="submit"
            style={{
              backgroundColor: "#2a7ebf",
              color: "white",
              boxShadow: "0 4px 10px rgba(0,0,0,.3)",
            }}
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
