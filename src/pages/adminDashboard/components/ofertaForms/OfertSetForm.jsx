import React, { useState, useContext, useEffect } from "react";
import DepoContext from "../../../../context/depoContext/DepoContext";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";

export default function OfertSetForm() {
  useEffect(() => {
    depoContext.getAllProducts();
  }, []);

  const depoContext = useContext(DepoContext);
  const { produktet } = depoContext;
  const [emriProduktit, setEmriProduktit] = useState({});
  const [sasiaProduktit, setSasiaProduktit] = useState("");
  const [sasiaFalas, setSasiaFalas] = useState("");
  const [produktiDhurat, setProduktiDhurat] = useState({});

  return (
    <>
      <form className="oferta-set-form">
        <div className="oferta-set-form-emriProduktit">
          <Autocomplete
            id="combo-box-demo"
            options={produktet}
            getOptionLabel={(option) => option.titulli}
            style={{ width: 200 }}
            autoHighlight
            onChange={(event, newValue) => {
              setEmriProduktit(newValue);
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
            label="Sasia"
            value={sasiaProduktit}
            onChange={(e) => setSasiaProduktit(e.target.value)}
            variant="outlined"
            type="number"
          />
          <TextField
            label="Falas"
            value={sasiaFalas}
            onChange={(e) => setSasiaFalas(e.target.value)}
            variant="outlined"
            type="number"
          />
          <Autocomplete
            id="combo-box-demo"
            options={produktet}
            getOptionLabel={(option) => option.titulli}
            style={{ width: 200 }}
            autoHighlight
            onChange={(event, newValue) => {
              setProduktiDhurat(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Produkti Dhurat"
                variant="outlined"
              />
            )}
          />
        </div>
        <div className="oferta-set-form-buttons">
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
