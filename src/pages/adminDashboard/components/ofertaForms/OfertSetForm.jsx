import React, { useState, useContext, useEffect } from "react";
import DepoContext from "../../../../context/depoContext/DepoContext";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import PlaylistAddOutlinedIcon from "@material-ui/icons/PlaylistAddOutlined";
import DeleteSweepOutlinedIcon from "@material-ui/icons/DeleteSweepOutlined";

export default function OfertSetForm() {
  useEffect(() => {
    depoContext.getAllProducts();
  }, []);

  const depoContext = useContext(DepoContext);
  const { produktet } = depoContext;
  const [setet, setSetet] = useState([
    {
      emriProduktit: {},
      sasiaProduktit: "",
      sasiaFalas: "",
      produktiDhurat: {},
    },
  ]);

  const deleteSet = (seti) => {
    setSetet(setet.filter((obj) => obj !== seti));
  };

  return (
    <>
      <form className="oferta-set-form">
        <div className="oferta-set-form-shtoSetBtn">
          <Button
            startIcon={<PlaylistAddOutlinedIcon />}
            color="primary"
            variant="contained"
            size="large"
            onClick={() => {
              setSetet((result) => [
                ...result,
                {
                  emriProduktit: {},
                  sasiaProduktit: "",
                  sasiaFalas: "",
                  produktiDhurat: {},
                },
              ]);
            }}
          >
            Shto Set
          </Button>
        </div>

        {setet.map((set, index) => (
          <div key={index} className="oferta-set-form-emriProduktit">
            <DeleteSweepOutlinedIcon
              style={{
                color: "red",
                fontSize: "26px",
                cursor: "pointer",
                display: setet.length === 1 ? "none" : "",
              }}
              onClick={() => deleteSet(set)}
            />
            <Autocomplete
              id="combo-box-demo"
              options={produktet}
              getOptionLabel={(option) => option.titulli}
              style={{ width: 200 }}
              autoHighlight
              onChange={(event, newValue) => {
                set.emriProduktit = newValue;
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
              onChange={(e) => (set.sasiaProduktit = e.target.value)}
              variant="outlined"
              type="number"
            />
            <TextField
              label="Falas"
              onChange={(e) => (set.sasiaFalas = e.target.value)}
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
                set.produktiDhurat = newValue;
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
        ))}

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
