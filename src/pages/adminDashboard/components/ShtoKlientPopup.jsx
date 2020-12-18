import React, { useState, useEffect, useContext } from "react";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import AlertContext from "../../../context/alertContext/AlertContext";
import DepoContext from "../../../context/depoContext/DepoContext";

export default function ShtoKlientPopup({ closePopup }) {
  const [emri, setEmer] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [zonaForm, setZonaForm] = useState("");
  const [kategoriForm, setKategoriForm] = useState("");
  const [image, setAvatar] = useState("");
  const [msg, setMsg] = useState("");

  const depoContext = useContext(DepoContext);
  const alertContext = useContext(AlertContext);

  useEffect(() => {
    if (!msg == "") {
      setTimeout(() => setMsg(""), 5000);
    }
  });

  const shtoKlient = (e) => {
    e.preventDefault();

    let avatar = new FormData();

    avatar.append("name", emri);
    avatar.append("email", email);
    avatar.append("password", password);
    avatar.append("role", 3);
    avatar.append("zona", zonaForm);
    avatar.append("kategoria", kategoriForm);
    avatar.append("image", image);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post(
        "https://192.168.88.250/demo_react_server/api/config/register_klient.php",
        avatar,
        config
      )
      .then((res) => {
        if (res.data.status == 0) {
          alertContext.setAlert("Plotesoni te gjitha fushat!", "error");
        } else if (res.data.status == 1) {
          alertContext.setAlert("Klienti u shtua!", "success");
          depoContext.getAllClients();
          closePopup();
          setEmer("");
          setEmail("");
          setPassword("");
          setZonaForm("");
          setKategoriForm("");
          setAvatar("");
        }
      });
  };

  return (
    <div className="shtoklient-popup">
      <div className="shtoklient-popup-opa" onClick={() => closePopup()}></div>
      <div className="shtoklient-popup-container">
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            padding: "2px 5px",
          }}
        >
          <CloseOutlinedIcon
            color="secondary"
            fontSize={"large"}
            cursor="pointer"
            onClick={() => closePopup()}
          />
        </div>
        <form className="shtoklient-popup-form" onSubmit={shtoKlient}>
          <TextField
            className="input-popup"
            label="Emri"
            variant="outlined"
            value={emri}
            onChange={(e) => setEmer(e.target.value)}
          />
          <TextField
            className="input-popup"
            label="Email"
            variant="outlined"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className="input-popup"
            label="Password"
            variant="outlined"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="select-group">
            <InputLabel id="zonaForm">Zona</InputLabel>
            <Select
              className="input-select"
              labelId="zonaForm"
              value={zonaForm}
              onChange={(e) => setZonaForm(e.target.value)}
              variant="outlined"
            >
              <MenuItem value="None"></MenuItem>
              <MenuItem value={"Zona 1"}>Zona 1</MenuItem>
              <MenuItem value={"Zona 2"}>Zona 2</MenuItem>
              <MenuItem value={"Zona 3"}>Zona 3</MenuItem>
            </Select>
            <InputLabel id="kategoriForm">Kategoria</InputLabel>
            <Select
              className="input-select"
              labelId="kategoriForm"
              value={kategoriForm}
              onChange={(e) => setKategoriForm(e.target.value)}
              variant="outlined"
              color="primary"
            >
              <MenuItem value="None"></MenuItem>
              <MenuItem value={"Kategoria 1"}>Kategoria 1</MenuItem>
              <MenuItem value={"Ktegoria 2"}>Kategoria 2</MenuItem>
              <MenuItem value={"Kategoria 3"}>Kategoria 3</MenuItem>
            </Select>
          </div>
          <Input
            type="file"
            className="input-file"
            onChange={(e) => setAvatar(e.target.files[0])}
          />

          <Button
            color="primary"
            variant="contained"
            type="submit"
            style={{ width: "40%", marginTop: "50px", marginBottom: "40px" }}
          >
            Shto
          </Button>
          {msg.status === 0 && (
            <Alert duration={5000} severity="error">
              {msg.message}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
