import React, { useState, useEffect, useContext } from "react";
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
import InputLabel from "@material-ui/core/InputLabel";
import DepoContext from "../../../context/depoContext/DepoContext";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import AlertContext from "../../../context/alertContext/AlertContext";

export default function Produkte() {
  const [kategoria, setKategoria] = useState("");
  const [produktPopup, showProduktPopup] = useState(false);
  const [page, setPage] = useState(1);
  const [idDelete, setDeleteId] = useState("");
  const [itemPage, setItempage] = useState(5);
  const [searchFilter, setSearchFilter] = useState("");
  const start = (page - 1) * itemPage;
  const end = page * itemPage;
  const depoContext = useContext(DepoContext);
  const { produktet } = depoContext;
  const alertContext = useContext(AlertContext);
  const [propertyName, setProperty] = useState({
    key: "id",
    direction: "descending",
  });
  const [deletePop, showDeletePop] = useState(false);

  const filteredProducts = produktet.filter(
    (order) =>
      order.id.toString().toLowerCase().includes(searchFilter.toLowerCase()) ||
      order.titulli.toLowerCase().includes(searchFilter.toLowerCase()) ||
      order.kategoria.toLowerCase().includes(searchFilter.toLowerCase()) ||
      order.sasia
        .toString()
        .toLowerCase()
        .includes(searchFilter.toLowerCase()) ||
      order.cmimi.toString().toLowerCase().includes(searchFilter.toLowerCase())
  );

  useEffect(() => {
    depoContext.getAllProducts();
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const stockColor = (item) => {
    if (item == 0) {
      return "red";
    } else if (item >= 1 && item <= 20) {
      return "#FECD2F";
    } else {
      return "green";
    }
  };

  if (propertyName !== null) {
    filteredProducts.sort((a, b) => {
      if (a[propertyName.key] < b[propertyName.key]) {
        return propertyName.direction === "ascending" ? -1 : 1;
      }
      if (a[propertyName.key] > b[propertyName.key]) {
        return propertyName.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      propertyName &&
      propertyName.key === key &&
      propertyName.direction === "ascending"
    ) {
      direction = "descending";
    }
    setProperty({ key, direction });
  };
  return (
    <>
      {deletePop && (
        <div className="delete-pop">
          <div
            className="delete-pop-opa"
            onClick={() => {
              showDeletePop(false);
              alertContext.setAlert("Produkti nuk u fshi!", "info");
            }}
          ></div>
          <div className="delete-pop-container">
            <h3>Jeni te sigurt qe doni te fshini produktin?</h3>
            <div className="delete-pop-buttons">
              <Button
                className="btn-delete-opa"
                variant="contained"
                onClick={() => {
                  alertContext.setAlert("Produkti u fshi!", "warning");
                  showDeletePop(false);
                  depoContext.deleteProduct(idDelete);
                }}
              >
                Po
              </Button>
              <Button
                onClick={() => {
                  showDeletePop(false);
                  alertContext.setAlert("Produkti nuk u fshi!", "info");
                }}
                className="btn-delete-opa"
                variant="contained"
              >
                Jo
              </Button>
            </div>
          </div>
        </div>
      )}
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
            <h1> {produktet.filter((stock) => stock.sasia == 0).length} </h1>
            <p>75%(30 dite)</p>
          </div>
          <div className="produkte-header-item-right">
            <LocalMallOutlinedIcon style={{ fontSize: "40px" }} />
          </div>
        </div>

        <div className="produkte-header-item">
          <div className="produkte-header-item-left">
            <p>Produkte drejt perfundimit</p>
            <h1>
              {" "}
              {
                produktet.filter((end) => end.sasia >= 1 && end.sasia <= 20)
                  .length
              }{" "}
            </h1>
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
              type="search"
              onChange={(e) => setSearchFilter(e.target.value)}
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
              <TableCell onClick={() => requestSort("id")}>
                ID
                {propertyName.key === "id" &&
                  propertyName.direction === "ascending" && (
                    <ArrowUpwardOutlinedIcon style={{ fontSize: "17px" }} />
                  )}
                {propertyName.key === "id" &&
                  propertyName.direction === "descending" && (
                    <ArrowDownwardOutlinedIcon style={{ fontSize: "17px" }} />
                  )}
              </TableCell>
              <TableCell align="left">Foto</TableCell>
              <TableCell onClick={() => requestSort("titulli")} align="left">
                Titulli
                {propertyName.key === "titulli" &&
                  propertyName.direction === "ascending" && (
                    <ArrowUpwardOutlinedIcon style={{ fontSize: "17px" }} />
                  )}
                {propertyName.key === "titulli" &&
                  propertyName.direction === "descending" && (
                    <ArrowDownwardOutlinedIcon style={{ fontSize: "17px" }} />
                  )}
              </TableCell>
              <TableCell onClick={() => requestSort("kategoria")} align="left">
                Kategoria
                {propertyName.key === "kategoria" &&
                  propertyName.direction === "ascending" && (
                    <ArrowUpwardOutlinedIcon style={{ fontSize: "17px" }} />
                  )}
                {propertyName.key === "kategoria" &&
                  propertyName.direction === "descending" && (
                    <ArrowDownwardOutlinedIcon style={{ fontSize: "17px" }} />
                  )}
              </TableCell>
              <TableCell onClick={() => requestSort("sasia")} align="left">
                Stok
                {propertyName.key === "sasia" &&
                  propertyName.direction === "ascending" && (
                    <ArrowUpwardOutlinedIcon style={{ fontSize: "17px" }} />
                  )}
                {propertyName.key === "sasia" &&
                  propertyName.direction === "descending" && (
                    <ArrowDownwardOutlinedIcon style={{ fontSize: "17px" }} />
                  )}
              </TableCell>
              <TableCell onClick={() => requestSort("cmimi")} align="left">
                Cmimi
                {propertyName.key === "cmimi" &&
                  propertyName.direction === "ascending" && (
                    <ArrowUpwardOutlinedIcon style={{ fontSize: "17px" }} />
                  )}
                {propertyName.key === "cmimi" &&
                  propertyName.direction === "descending" && (
                    <ArrowDownwardOutlinedIcon style={{ fontSize: "17px" }} />
                  )}
              </TableCell>
              <TableCell align="center">Veprimet</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.slice(start, end).map((produkt) => (
              <TableRow key={produkt.id}>
                <TableCell>{produkt.id} </TableCell>
                <TableCell>
                  <img
                    width="50"
                    height="50"
                    src={`https://192.168.88.250/demo_react_server/images/${produkt.image}`}
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
                    <DeleteOutlineOutlinedIcon
                      onClick={() => {
                        showDeletePop(true);
                        setDeleteId(produkt.id);
                      }}
                    />
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
            count={Math.ceil(filteredProducts.length / itemPage)}
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
