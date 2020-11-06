import React, { useState, useEffect } from "react";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PostAddIcon from "@material-ui/icons/PostAdd";
import ShtoProduktPopup from "./ShtoProduktPopup";
import axios from "axios";

export default function Produkte() {
  const [kategoria, setKategoria] = useState("");
  const [produktPopup, showProduktPopup] = useState(false);
  const [produktet, merrTegjithaProduktet] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/demo_react_server/api/config/get_allProducts.php")
      .then((res) => merrTegjithaProduktet(res.data));
  }, []);

  return (
    <>
      {produktPopup && (
        <ShtoProduktPopup closePopup={() => showProduktPopup(false)} />
      )}
      <div className="produkte-header">
        <div className="produkte-header-item">
          <div className="produkte-header-item-left">
            <p>te gjitha produktet</p>
            <h1>890</h1>
            <p>20%(30 dite)</p>
          </div>
          <div className="produkte-header-item-right">
            <LocalMallOutlinedIcon style={{ fontSize: "40px" }} />
          </div>
        </div>

        <div className="produkte-header-item">
          <div className="produkte-header-item-left">
            <p>Kategoria</p>
            <Select
              variant="filled"
              fullWidth
              onChange={(e) => setKategoria(e.target.value)}
              value={kategoria === "" ? "None" : kategoria}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Kategoria1">Kategoria1</MenuItem>
              <MenuItem value="Kategoria2">Kategoria2</MenuItem>
              <MenuItem value="Kategoria3">Kategoria3</MenuItem>
            </Select>
            <p>
              {" "}
              {kategoria === "" ? "Asnje kategori e zgjedhur" : kategoria}{" "}
            </p>
          </div>
          <div className="produkte-header-item-right">
            <LocalMallOutlinedIcon style={{ fontSize: "40px" }} />
          </div>
        </div>

        <div className="produkte-header-item">
          <div className="produkte-header-item-left">
            <p>Produkte pa stok</p>
            <h1>45</h1>
            <p>75%(30 dite)</p>
          </div>
          <div className="produkte-header-item-right">
            <LocalMallOutlinedIcon style={{ fontSize: "40px" }} />
          </div>
        </div>

        <div className="produkte-header-item">
          <div className="produkte-header-item-left">
            <p>Produkte drejt perfundimit</p>
            <h1>12</h1>
            <p>75%(30 dite)</p>
          </div>
          <div className="produkte-header-item-right">
            <LocalMallOutlinedIcon style={{ fontSize: "40px" }} />
          </div>
        </div>

        <div className="produkte-header-item">
          <h2>Shto produkt</h2>
          <AddOutlinedIcon
            onClick={() => showProduktPopup(true)}
            style={{
              cursor: "pointer",
              fontSize: "70px",
              color: "#e3e3e3",
              height: "70%",
            }}
          />
        </div>
      </div>
      <div className="data-table-produkte">
        <div className="data-table-produkte-header">
          <div className="data-table-produkte-header-left">
            {" "}
            <h3>Produktet</h3>
          </div>
          <div className="data-table-produkte-header-right">
            <TextField
              style={{ marginRight: "30px" }}
              size="small"
              variant="outlined"
              label="Kerko"
              placeholder="Kerko"
            ></TextField>
            <Button
              color="primary"
              onClick={() => showProduktPopup(true)}
              variant="contained"
              startIcon={<PostAddIcon style={{ fontSize: "25px" }} />}
            >
              Shto Produkt
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
