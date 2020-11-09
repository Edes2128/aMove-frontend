import React, { useState, useEffect } from "react";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PostAddIcon from "@material-ui/icons/PostAdd";
import ShtoProduktPopup from "./ShtoProduktPopup";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Pagination from "@material-ui/lab/Pagination";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";

export default function Produkte() {
  const [kategoria, setKategoria] = useState("");
  const [produktPopup, showProduktPopup] = useState(false);
  const [produktet, merrTegjithaProduktet] = useState([]);
  const [page, setPage] = useState(1);
  const [itemPage, setItempage] = useState(5);
  const start = (page - 1) * itemPage;
  const end = page * itemPage;
  const [pastock, setPastock] = useState([]);
  const paSasi = pastock.filter((stock) => stock.sasia == 0);
  const [fundi, setFundi] = useState([]);
  const drejtFunit = fundi.filter((end) => end.sasia > 10 && end.sasia < 20);

  useEffect(() => {
    axios
      .get("http://localhost/demo_react_server/api/config/get_allProducts.php")
      .then((res) => setFundi(res.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost/demo_react_server/api/config/get_allProducts.php")
      .then((res) => setPastock(res.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost/demo_react_server/api/config/get_allProducts.php")
      .then((res) => merrTegjithaProduktet(res.data));
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const stockColor = (item) => {
    if (item <= 10) {
      return "red";
    } else if (item > 10 && item < 20) {
      return "yellow";
    } else {
      return "green";
    }
  };

  return (
    <>
      {produktPopup && (
        <ShtoProduktPopup closePopup={() => showProduktPopup(false)} />
      )}
      <div className="produkte-header">
        <div className="produkte-header-item">
          <div className="produkte-header-item-left">
            <p>te gjitha produktet</p>
            <h1>{produktet.length}</h1>
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
            <h1> {paSasi.length} </h1>
            <p>75%(30 dite)</p>
          </div>
          <div className="produkte-header-item-right">
            <LocalMallOutlinedIcon style={{ fontSize: "40px" }} />
          </div>
        </div>

        <div className="produkte-header-item">
          <div className="produkte-header-item-left">
            <p>Produkte drejt perfundimit</p>
            <h1> {drejtFunit.length} </h1>
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
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Foto</TableCell>
              <TableCell align="left">Emri</TableCell>
              <TableCell align="left">Kategoria</TableCell>
              <TableCell align="left">Stok</TableCell>
              <TableCell align="left">Cmimi</TableCell>
              <TableCell align="center">Veprimet</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produktet.slice(start, end).map((produkt) => (
              <TableRow key={produkt.id}>
                <TableCell>{produkt.id} </TableCell>
                <TableCell>
                  <img
                    width="50"
                    height="50"
                    src={`http://localhost/demo_react_server/images/${produkt.image}`}
                    alt="Foto Produkti"
                  />
                </TableCell>
                <TableCell>{produkt.titulli}</TableCell>
                <TableCell>{produkt.kategoria}</TableCell>
                <TableCell
                  style={{
                    color: stockColor(produkt.sasia),
                    fontWeight: "bold",
                  }}
                >
                  {produkt.sasia == 0 ? "Ska stok" : produkt.sasia}
                </TableCell>
                <TableCell>{produkt.cmimi}</TableCell>
                <TableCell align="center">
                  <div className="veprime" style={{ cursor: "pointer" }}>
                    <VisibilityOutlinedIcon />
                    <EditOutlinedIcon />
                    <DeleteOutlineOutlinedIcon />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="pagination">
          <div style={{ display: "flex", alignItems: "center" }}>
            <InputLabel style={{ marginRight: "10px" }} id="row">
              Produkte ne faqe
            </InputLabel>
            <Select
              labelId="row"
              onChange={(e) => setItempage(e.target.value)}
              value={itemPage}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </div>
          <Pagination
            count={Math.ceil(produktet.length / itemPage)}
            color="primary"
            page={page}
            size="large"
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
}
