import React, { useState, useContext, useEffect } from "react";
import DepoContext from "../../../../context/depoContext/DepoContext";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function OfertaGrupForm() {
  useEffect(() => {
    depoContext.getCategoryClients();
    depoContext.getCategoryProducts();
    depoContext.getAllProducts();
    depoContext.getAllClients();
  }, []);
  const depoContext = useContext(DepoContext);
  const {
    categoryClients,
    produktet,
    categoryProducts,
    klientet,
  } = depoContext;
  const [catProductZgjedhur, setCatProductZgjedhur] = useState({});
  const [catPrUlja, setCatPrUlja] = useState("");
  const [catPrNjesia, setCatPrNjesia] = useState("");
  const [catPrPeriudhaFillimit, setCatPrPeriudhaFillimit] = useState("");
  const [catPrPeriudhaMbarimit, setCatPrPeriudhaMbarimit] = useState("");

  const [produktSpecifikZgjedhur, setProduktSpecifikZgjedhur] = useState({});
  const [prSpeUlja, setPrSpeUlja] = useState("");
  const [prSpeNjesia, setPrSpeNjesia] = useState("");
  const [prSpePeriudhaFillmit, setPrSpePeriudhaFillmit] = useState("");
  const [prSpePeriudhaMbarimit, setPrSpePeriudhaMbarimit] = useState("");

  const [kategoriKlientiZgjedhur, setKategoriKlientiZgjedhur] = useState({});
  const [katKliUlja, setKatKliUlja] = useState("");
  const [katKliNjesia, setKatKliNjesia] = useState("");
  const [katKliPeriudhaFillimit, setKatKliPeriudhaFillimit] = useState("");
  const [katKliPeriudhaMbarimit, setKatKliPeriudhaMbarimit] = useState("");
  const [tegjithekateogritKient, settegjitheKategoriteKliente] = useState(
    false
  );
  const [klientSpecifik, setKlientSpecifik] = useState([]);

  return (
    <>
      <form className="oferta-grup-form">
        <div className="oferta-grup-form-kategoriProdukti">
          <Autocomplete
            id="combo-box-demo"
            options={categoryProducts}
            getOptionLabel={(option) => option.name}
            style={{ width: 200 }}
            autoHighlight
            onChange={(event, newValue) => {
              setCatProductZgjedhur(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Kategoria Produktit"
                variant="outlined"
              />
            )}
          />
          <TextField
            style={{ width: "100px" }}
            variant="outlined"
            label="Ulja"
            value={catPrUlja}
            onChange={(e) => setCatPrUlja(e.target.value)}
            type="number"
          />
          <FormControl variant="outlined">
            <InputLabel htmlFor="njesia-label">Njesia</InputLabel>
            <Select
              value={catPrNjesia}
              onChange={(e) => setCatPrNjesia(e.target.value)}
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
            onChange={(e) => setCatPrPeriudhaFillimit(e.target.value)}
            value={catPrPeriudhaFillimit}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            type="date"
            variant="outlined"
            label="Data e mbarimit"
            value={catPrPeriudhaMbarimit}
            onChange={(e) => setCatPrPeriudhaMbarimit(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="oferta-grup-form-produktSpecifik">
          <Autocomplete
            id="combo-box-demo"
            options={produktet}
            getOptionLabel={(option) => option.titulli}
            style={{ width: 200 }}
            autoHighlight
            onChange={(event, newValue) => {
              setProduktSpecifikZgjedhur(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Produkt Specifik"
                variant="outlined"
              />
            )}
          />
          <TextField
            style={{ width: "100px" }}
            variant="outlined"
            label="Ulja"
            value={prSpeUlja}
            onChange={(e) => setPrSpeUlja(e.target.value)}
            type="number"
          />
          <FormControl variant="outlined">
            <InputLabel htmlFor="njesia-label">Njesia</InputLabel>
            <Select
              value={prSpeNjesia}
              onChange={(e) => setPrSpeNjesia(e.target.value)}
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
            onChange={(e) => setPrSpePeriudhaFillmit(e.target.value)}
            value={prSpePeriudhaFillmit}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            type="date"
            variant="outlined"
            label="Data e mbarimit"
            value={prSpePeriudhaMbarimit}
            onChange={(e) => setPrSpePeriudhaMbarimit(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="oferta-grup-form-kategoriKlienti">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Autocomplete
              disabled={tegjithekateogritKient}
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
                  label="Kategori Klienti"
                  variant="outlined"
                />
              )}
            />
            <TextField
              style={{ width: "100px" }}
              variant="outlined"
              label="Ulja"
              value={katKliUlja}
              onChange={(e) => setKatKliUlja(e.target.value)}
              type="number"
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="njesia-label">Njesia</InputLabel>
              <Select
                value={katKliNjesia}
                onChange={(e) => setKatKliNjesia(e.target.value)}
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
              onChange={(e) => setKatKliPeriudhaFillimit(e.target.value)}
              value={katKliPeriudhaFillimit}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              type="date"
              variant="outlined"
              label="Data e mbarimit"
              value={katKliPeriudhaMbarimit}
              onChange={(e) => setKatKliPeriudhaMbarimit(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <FormControlLabel
            control={
              <Checkbox
                id={"check-all-categoriesClient"}
                name={"check-all-categoriesClient"}
                defaultValue={"check-all-categoriesClient"}
                onChange={() => {
                  settegjitheKategoriteKliente(!tegjithekateogritKient);
                }}
                color="primary"
                checked={tegjithekateogritKient}
              />
            }
            label={"Zgjidh te gjithe kategorite e klienteve"}
          />
        </div>
        <div className="oferta-grup-form-klientSpecifik">
          <Autocomplete
            multiple
            filterSelectedOptions
            id="combo-box-demo"
            options={klientet}
            getOptionLabel={(option) => option.name}
            style={{ width: "100%" }}
            autoHighlight
            onChange={(event, newValue) => {
              setKlientSpecifik(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Klient Specifik"
                variant="outlined"
              />
            )}
          />
        </div>
        <div className="oferta-grup-form-buttons">
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
