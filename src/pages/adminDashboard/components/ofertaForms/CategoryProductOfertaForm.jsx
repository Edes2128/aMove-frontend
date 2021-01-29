import React, { useState, useContext, useEffect } from "react";
import DepoContext from "../../../../context/depoContext/DepoContext";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

export default function CategoryProductOfertaForm() {
  useEffect(() => {
    depoContext.getCategoryProducts();
    depoContext.getCategoryClients();
    depoContext.getAllClients();
  }, []);

  const depoContext = useContext(DepoContext);
  const { categoryProducts, categoryClients, klientet } = depoContext;
  const [kategoriProduktZgjedhur, setKategoriProduktZgjedhur] = useState({});
  const [njesia, setNjesia] = useState("");
  const [ulja, setUlja] = useState("");
  const [dataFillimit, setDataFillimit] = useState("");
  const [dataMbarimit, setDataMbarimit] = useState("");
  const [kategoriteKlienteve, setKategoriteKlienteve] = useState([]);
  const [tegjithekateogritKient, settegjitheKategoriteKliente] = useState(
    false
  );
  const [klientSpecifik, setKlientSpecifik] = useState({});

  return (
    <>
      <form className="ofert-categoryProduct-form">
        <div className="ofert-categoryProduct-form-kategoriProdukti">
          <Autocomplete
            id="combo-box-demo"
            options={categoryProducts}
            getOptionLabel={(option) => option.name}
            style={{ width: 200 }}
            autoHighlight
            onChange={(event, newValue) => {
              setKategoriProduktZgjedhur(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Kategoria e Produktit"
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
        <div className="ofert-categoryProduct-form-kategoriKlienti">
          <Autocomplete
            multiple
            filterSelectedOptions
            id="combo-box-demo"
            options={categoryClients}
            getOptionLabel={(option) => option.name}
            style={{ width: "100%" }}
            autoHighlight
            disabled={tegjithekateogritKient}
            onChange={(event, newValue) => {
              setKategoriteKlienteve(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Kategorite e Klienteve"
                variant="outlined"
              />
            )}
          />
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
          <Autocomplete
            id="combo-box-demo"
            multiple
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
        <div className="ofert-categoryProduct-form-buttons">
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
