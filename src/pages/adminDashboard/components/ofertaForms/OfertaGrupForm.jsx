import React, { useState, useContext, useEffect } from "react";
import DepoContext from "../../../../context/depoContext/DepoContext";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

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
        <Autocomplete
            id="combo-box-demo"
            options={categoryClients}
            getOptionLabel={(option) => option.name}
            style={{ width: 200 }}
            autoHighlight
            onChange={(event, newValue) => {
              setProduktSpecifikZgjedhur(newValue);
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
      </form>
    </>
  );
}
