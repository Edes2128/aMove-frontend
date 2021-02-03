import React, { useState, useContext, useEffect } from "react";
import DepoContext from "../../../../context/depoContext/DepoContext";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import PlaylistAddOutlinedIcon from "@material-ui/icons/PlaylistAddOutlined";
import DeleteSweepOutlinedIcon from "@material-ui/icons/DeleteSweepOutlined";

export default function CategoryClientOfertaForm() {
  useEffect(() => {
    depoContext.getCategoryClients();
    depoContext.getCategoryProducts();
    depoContext.getAllProducts();
  }, []);

  const depoContext = useContext(DepoContext);
  const { categoryClients, produktet, categoryProducts } = depoContext;
  const [kategoriKlientiZgjedhur, setKategoriKlientiZgjedhur] = useState({});
  const [njesia, setNjesia] = useState("");
  const [ulja, setUlja] = useState("");
  const [dataFillimit, setDataFillimit] = useState("");
  const [dataMbarimit, setDataMbarimit] = useState("");
  const [kategoriteProdukteve, setKategoriteProdukteve] = useState([]);
  const [produkteSpecifike, setProdukteSpecfike] = useState([]);
  const [setet, setSetet] = useState([
    { emriProduktit: {}, bli: "", perfito: "" },
  ]);
  const deleteSet = (seti) => {
    setSetet(setet.filter((obj) => obj !== seti));
  };

  return (
    <>
      <form className="oferta-categoryClient-form">
        <div className="oferta-categoryClient-form-catKlient">
          <Autocomplete
            id="combo-box-demo"
            options={categoryClients}
            getOptionLabel={(option) => option.name}
            style={{ width: 200 }}
            autoHighlight
            onChange={(event, newValue) => {
              setKategoriKlientiZgjedhur(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Kategoria Klientit"
                variant="outlined"
              />
            )}
          />
          <TextField
            style={{ width: "100px" }}
            variant="outlined"
            label="Ulja"
            value={ulja}
            onChange={(e) => setUlja(e.target.value)}
          />
          <FormControl variant="outlined">
            <InputLabel htmlFor="njesia-label">Njesia</InputLabel>
            <Select
              value={njesia}
              onChange={(e) => setNjesia(e.target.value)}
              style={{ width: "130px" }}
              label="Status"
              inputProps={{
                name: "status",
                id: "njesia-label",
              }}
            >
              <MenuItem value={"Leke"}>Leke</MenuItem>
              <MenuItem value={"%"}>%</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="date"
            variant="outlined"
            label="Data e fillimit"
            onChange={(e) => setDataFillimit(e.target.value)}
            value={dataFillimit}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            type="date"
            variant="outlined"
            label="Data e mbarimit"
            value={dataMbarimit}
            onChange={(e) => setDataMbarimit(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="oferta-categoryClient-form-categoryProduct">
          <Autocomplete
            multiple
            filterSelectedOptions
            id="combo-box-demo"
            options={categoryProducts}
            getOptionLabel={(option) => option.name}
            style={{ width: "100%" }}
            autoHighlight
            onChange={(event, newValue) => {
              setKategoriKlientiZgjedhur(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Kategoria e Produktit"
                variant="outlined"
              />
            )}
          />
          <Autocomplete
            multiple
            filterSelectedOptions
            id="combo-box-demo"
            options={produktet}
            getOptionLabel={(option) => option.titulli}
            style={{ width: "100%" }}
            autoHighlight
            onChange={(event, newValue) => {
              setKategoriKlientiZgjedhur(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Produkt Specifik"
                variant="outlined"
              />
            )}
          />
        </div>
        <div className="oferta-categoryClient-form-setProduktesh">
          <div className="oferta-categoryClient-form-setProduktesh-btnShtoSet">
            <p>Set Produktesh</p>
            <Button
              startIcon={<PlaylistAddOutlinedIcon />}
              color="primary"
              variant="contained"
              onClick={() => {
                setSetet((result) => [
                  ...result,
                  { emriProduktit: {}, bli: "", perfito: "" },
                ]);
              }}
            >
              Shto set
            </Button>
          </div>
          {setet.map((set) => (
            <div className="oferta-categoryClient-form-setProduktesh-item">
              <DeleteSweepOutlinedIcon
                style={{
                  color: "red",
                  cursor: "pointer",
                  fontSize: "25px",
                  display: setet.length === 1 ? "none" : "",
                }}
                onClick={() => deleteSet(set)}
              />
              <Autocomplete
                id="combo-box-demo"
                options={produktet}
                getOptionLabel={(option) => option.titulli}
                style={{ width: "30%" }}
                autoHighlight
                onChange={(event, newValue) => {
                  set.emriProduktit = newValue;
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Produktet" variant="outlined" />
                )}
              />
              <TextField
                variant="outlined"
                label="Bli"
                type={"number"}
                onChange={(e) => (set.bli = e.target.value)}
              />
              <p style={{ fontSize: "30px" }}>+</p>
              <TextField
                variant="outlined"
                label="Perfito"
                type={"number"}
                onChange={(e) => (set.perfito = e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="oferta-categoryClient-form-buttons">
          <Button color="primary" variant="outlined">
            Ruaj
          </Button>
          <Button color="secondary" variant="contained">
            Anullo
          </Button>
        </div>
      </form>
    </>
  );
}
