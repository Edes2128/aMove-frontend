import React, { useState } from "react";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";

export default function ShtoProduktPopup({ closePopup }) {
  const [titulli, setTitulli] = useState("");
  const [sku, setSku] = useState("");
  const [pershkrimi, setPershkrimi] = useState("");
  const [kategoriForm, setKategoriForm] = useState("");
  const [cmimi, setCmimi] = useState("");
  const [sasia, setSasia] = useState("");
  const [njesia, setNjesia] = useState("");
  const [ngjyrat, setNgjyrat] = useState([]);
  const [masat, setMasat] = useState([]);
  const [image, setImage] = useState("");

  return (
    <div className="shtoprodukt-popup">
      <div className="shtoprodukt-popup-opa" onClick={() => closePopup()}></div>
      <div className="shtoprodukt-popup-form">
        <div className="shtoprodukt-popup-form-header">
          <h2>Shto Produkt</h2>
          <CancelPresentationIcon
            style={{ fontSize: "35px", cursor: "pointer" }}
            onClick={() => closePopup()}
          />
        </div>
        <form className="form">
          <div className="form-titulli-sku">
            <div className="titulli">
              <InputLabel style={{ marginBottom: "20px" }}>Titulli</InputLabel>
              <TextField
                variant="outlined"
                onChange={(e) => setTitulli(e.target.value)}
                type="text"
                style={{ width: "70%" }}
                placeholder="Titulli"
              />
            </div>
            <div className="sku">
              <InputLabel style={{ marginBottom: "20px" }}>SKU</InputLabel>
              <TextField
                variant="outlined"
                onChange={(e) => setSku(e.target.value)}
                type="text"
                style={{ width: "60%" }}
                placeholder="SKU"
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
            <div className="image">
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
                onChange={(e) => setImage(e.target.files[0])}
                id="image"
                type="file"
                style={{ display: "none" }}
              />
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
            />
            <TextField
              variant="outlined"
              onChange={(e) => setSasia(e.target.value)}
              label="Stock"
              placeholder="Sasia"
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
                    
                </div>





        </form>
      </div>
    </div>
  );
}
