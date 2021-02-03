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
import { Button } from "@material-ui/core";

export default function OfertaSingleProductForm() {
  const depoContext = useContext(DepoContext);
  const {
    produktet,
    produktAttr,
    attrValues,
    klientet,
    categoryClients,
  } = depoContext;
  const [produktiZgjedhur, setProduktiZgjedhur] = useState({});
  const [njesia, setNjesia] = useState("");
  const [ulja, setUlja] = useState("");
  const [dataFillimit, setDataFillimit] = useState("");
  const [dataMbarimit, setDataMbarimit] = useState("");
  const attrIDPr = produktAttr.map((pr) => pr.attr_id);
  const attrProduktesh = attrValues.filter((atrr) =>
    attrIDPr.includes(atrr.id)
  );
  useEffect(() => {
    depoContext.getAllProducts();
    depoContext.getAttrValues();
    depoContext.getCategoryClients();
    depoContext.getAllClients();
  }, []);

  useEffect(() => {
    if (produktiZgjedhur === null) {
      depoContext.getProduktAttr(0);
    } else {
      depoContext.getProduktAttr(produktiZgjedhur.id);
    }
  }, [produktiZgjedhur]);

  return (
    <>
      <form className="ofert-sinlgeProduct-form">
        <div className="ofert-singleProduct-form-emriProduktit">
          <Autocomplete
            id="combo-box-demo"
            options={produktet}
            getOptionLabel={(option) => option.titulli}
            style={{ width: 200 }}
            autoHighlight
            onChange={(event, newValue) => {
              setProduktiZgjedhur(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Emri Produktit"
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

        {produktiZgjedhur !== {} || produktiZgjedhur !== null ? (
          <div className="ofert-singleProduct-form-prAttributes">
            <>
              {attrProduktesh.length === 0 ? (
                <p> Ky produkt nuk ka atribute </p>
              ) : (
                <>
                  <FormControlLabel
                    control={<Checkbox color={"primary"} />}
                    label={"Zgjidh te gjitha"}
                  />
                  <div className="ofert-singleProduct-form-attributet">
                    {attrProduktesh.map((attr) => (
                      <FormControlLabel
                        control={<Checkbox color={"primary"} />}
                        label={attr.value}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          </div>
        ) : (
          <></>
        )}
        <div className="ofert-singleProduct-form-kategoriKlienti">
        <Autocomplete
            id="combo-box-demo"
            multiple
            filterSelectedOptions
            options={categoryClients}
            getOptionLabel={(option) => option.name}
            style={{ width: "100%" }}
            autoHighlight
            onChange={(event, newValue) => {
              setProduktiZgjedhur(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Kategori Klienti"
                variant="outlined"
              />
            )}
          />
                  <Autocomplete
            id="combo-box-demo"
            multiple
            filterSelectedOptions
            options={klientet}
            getOptionLabel={(option) => option.name}
            style={{ width: "100%" }}
            autoHighlight
            onChange={(event, newValue) => {
              setProduktiZgjedhur(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Klient Specifik"
                variant="outlined"
              />
            )}
          />
                 <FormControlLabel
                    control={<Checkbox color={"primary"} />}
                    label={"Zgjidh te gjithe klientet"}
                  />
        </div>
        <div className="ofert-singleProduct-form-buttons">
              <Button color="primary" variant="outlined" >Ruaj</Button>
              <Button color="secondary" variant="contained" >Anullo</Button>
        </div>
      </form>
    </>
  );
}
