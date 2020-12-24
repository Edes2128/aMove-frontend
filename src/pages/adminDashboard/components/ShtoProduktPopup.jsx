import React, { useState, useContext } from "react";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import axios from "axios";
import DepoContext from "../../../context/depoContext/DepoContext";
import AlertContext from "../../../context/alertContext/AlertContext";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

export default function ShtoProduktPopup({ closePopup }) {
  const [titulli, setTitulli] = useState("");
  const [sku, setSku] = useState("");
  const [pershkrimi, setPershkrimi] = useState("");
  const [kategoriForm, setKategoriForm] = useState("");
  const [cmimi, setCmimi] = useState(0);
  const [sasia, setSasia] = useState(0);
  const [njesia, setNjesia] = useState("");
  const [ngjyrat, setNgjyrat] = useState([]);
  const [masat, setMasat] = useState([]);
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const depoContext = useContext(DepoContext);
  const alertContext = useContext(AlertContext);

  const submit = (e) => {
    e.preventDefault();

    let fd = new FormData();
    fd.append("titulli", titulli);
    fd.append("sku", sku);
    fd.append("pershkrimi", pershkrimi);
    fd.append("kategoria", kategoriForm);
    fd.append("cmimi", cmimi);
    fd.append("sasia", sasia);
    fd.append("njesia", njesia);
    fd.append("ngjyrat", ngjyrat);
    fd.append("masat", masat);
    fd.append("image", image);

    axios
      .post(
        "https://192.168.88.250/demo_react_server/api/config/shto_produkt.php",
        fd
      )
      .then((res) => {
        if (res.data.status === 0) {
          alertContext.setAlert(
            "Plotesoni fushat,produkti nuk u shtua",
            "error"
          );
        } else if (res.data.status === 1) {
          alertContext.setAlert("Produkti u shtua", "success");
          depoContext.getAllProducts();
          closePopup();
        }
      });
  };

  const addNgjyrat = (e) => {
    if (e.target.checked) {
      setNgjyrat(ngjyrat.concat(e.target.value));
    } else {
      setNgjyrat(ngjyrat.filter((ngjyra) => ngjyra !== e.target.value));
    }
  };

  const addMasat = (e) => {
    if (e.target.checked) {
      setMasat(masat.concat(e.target.value));
    } else {
      setMasat(masat.filter((masa) => masa !== e.target.value));
    }
  };

  return (
    <>
      <div className="shtoprodukt-popup">
        <div
          className="shtoprodukt-popup-opa"
          onClick={() => {
            alertContext.setAlert("Shtimi i produktit u anullua", "warning");
            closePopup();
          }}
        ></div>
        <div className="shtoprodukt-popup-form">
          <div className="shtoprodukt-popup-form-header">
            <h2>Shto Produkt</h2>
            <CancelPresentationIcon
              style={{ fontSize: "35px", cursor: "pointer" }}
              onClick={() => {
                alertContext.setAlert(
                  "Shtimi i produktit u anullua",
                  "warning"
                );
                closePopup();
              }}
            />
          </div>
          <form className="form" onSubmit={submit}>
            <div className="form-titulli-sku">
              <div className="titulli">
                <TextField
                  variant="outlined"
                  onChange={(e) => setTitulli(e.target.value)}
                  type="text"
                  style={{ width: "70%" }}
                  placeholder="Titulli"
                  label="Titulli"
                />
              </div>
              <div className="sku">
                <TextField
                  variant="outlined"
                  onChange={(e) => setSku(e.target.value)}
                  type="text"
                  style={{ width: "60%" }}
                  placeholder="SKU"
                  label="SKU"
                />
              </div>
            </div>

            <div className="form-pershkrimi-image">
              <div className="pershkrimi">
                <InputLabel>Pershkrimi</InputLabel>
                <textarea
                  onChange={(e) => setPershkrimi(e.target.value)}
                  style={{ width: "80%", height: "80%" }}
                ></textarea>
              </div>
              <div
              className={image === "" ? "image" : "image outlinestyle-none"}
              >
                {image === "" ? (
                  <>
                    <InputLabel
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      htmlFor="image"
                    >
                      <AddIcon style={{ fontSize: "70px" }} /> upload{" "}
                    </InputLabel>

                    <Input
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                        setFile(URL.createObjectURL(e.target.files[0]));
                      }}
                      id="image"
                      type="file"
                      style={{ display: "none" }}
                    />
                  </>
                ) : (
                  <>
                    <DeleteOutlineOutlinedIcon
                      onClick={() => {
                        setImage("");
                        setFile("");
                      }}
                      className="delete-icon-image"
                    />
                    <img src={file} alt="" />
                  </>
                )}
              </div>
            </div>
            <div className="kategori-cmimi-stock">
              <FormControl variant="outlined">
                <InputLabel htmlFor="kategoria-label">Kategoria</InputLabel>
                <Select
                  onChange={(e) => setKategoriForm(e.target.value)}
                  style={{ width: "150px" }}
                  value={kategoriForm}
                  label="Kategoria"
                  inputProps={{
                    name: "kategoria",
                    id: "kategoria-label",
                  }}
                >
                  <MenuItem value="kategoria1">Kategoria1</MenuItem>
                  <MenuItem value="kategoria2">Kategoria2</MenuItem>
                  <MenuItem value="kategoria3">Kategoria3</MenuItem>
                  <MenuItem value="kategoria4">Kategoria4</MenuItem>
                </Select>
              </FormControl>
              <TextField
                variant="outlined"
                onChange={(e) => setCmimi(e.target.value)}
                label="Cmimi"
                placeholder="Cmimi"
                type="number"
              />
              <TextField
                variant="outlined"
                onChange={(e) => setSasia(e.target.value)}
                label="Stock"
                placeholder="Sasia"
                type="number"
              />
              <FormControl variant="outlined">
                <InputLabel htmlFor="njesia-label">Njesia</InputLabel>
                <Select
                  value={njesia}
                  onChange={(e) => setNjesia(e.target.value)}
                  style={{ width: "150px" }}
                  label="Njesia"
                  inputProps={{
                    name: "njesia",
                    id: "njesia-label",
                  }}
                >
                  <MenuItem value="cop">Cop</MenuItem>
                  <MenuItem value="kuti">Kuti</MenuItem>
                  <MenuItem value="pako">Pako</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="atribute-tjera">
              <h3 style={{ marginBottom: "10px" }}>Atribute te tjera</h3>
              <div className="atributes-title">
                <p>
                  {" "}
                  <AddIcon style={{ fontSize: "15px" }} /> Mundesia e ngjyrave
                </p>
                <p>
                  {" "}
                  <AddIcon style={{ fontSize: "15px" }} /> Mundesia e masave
                </p>
              </div>

              <div className="ngjyrat-masat">
                <div className="ngjyrat">
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="ngjyrat"
                        defaultValue="bardhe"
                        value={"bardhe"}
                        onChange={addNgjyrat}
                        color="primary"
                      />
                    }
                    label="E Bardhe"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="ngjyrat"
                        defaultValue="kuqe"
                        value={"kuqe"}
                        onChange={addNgjyrat}
                        color="primary"
                      />
                    }
                    label="E Kuqe"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="ngjyrat"
                        defaultValue="zeze"
                        value={"zeze"}
                        onChange={addNgjyrat}
                        color="primary"
                      />
                    }
                    label="E Zeze"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="ngjyrat"
                        defaultValue="blu"
                        value={"blu"}
                        onChange={addNgjyrat}
                        color="primary"
                      />
                    }
                    label="Blu"
                  />
                </div>
                <div className="masat">
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={addMasat}
                        name="vogel"
                        value={"vogel"}
                        color="primary"
                      />
                    }
                    label="E Vogel"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={addMasat}
                        name="mesme"
                        value={"mesme"}
                        color="primary"
                      />
                    }
                    label="E Mesme"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={addMasat}
                        name="madhe"
                        value={"madhe"}
                        color="primary"
                      />
                    }
                    label="E Madhe"
                  />
                </div>
              </div>
            </div>
            <div className="submit-cancel">
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => {
                  closePopup();
                  alertContext.setAlert(
                    "Shtimi i produktit u anullua",
                    "warning"
                  );
                }}
              >
                Anullo
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Publiko
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
