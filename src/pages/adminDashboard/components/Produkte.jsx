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
import AddIcon from "@material-ui/icons/Add";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";

export default function Produkte() {
  const [produktDetails, setProduktDetails] = useState({});
  const [detailsPop, setDetailsPop] = useState(false);
  const [editID, setEditID] = useState(1);
  const [editTitulli, setEditTitulli] = useState("");
  const [editSku, setEditSku] = useState("");
  const [editPershkrimi, setEditPershkrimi] = useState("");
  const [editKategoria, setEditKategoria] = useState("");
  const [editCmimi, setEditCmimi] = useState("");
  const [editSasia, setEditSasia] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editNjesia, setEditNjesia] = useState("");
  const [fileEdit, setEditFile] = useState("");
  const [imageEdit, setEditImage] = useState("");
  const [deletedImage, setDeletedImage] = useState(false);
  const [kategoria, setKategoria] = useState("");
  const [produktDetailsPop, showPorduktDetailsPop] = useState(false);
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

  const renderButtonStatus = (status) => {
    if (status === 1) {
      return "Aktive";
    } else if (status === 0) {
      return "Joaktive";
    }
  };

  const renderButtonColorsStatus = (status) => {
    if (status === 1) {
      return "#3ccc38";
    } else if (status === 0) {
      return "#fd3259";
    }
  };

  const onEditProducts = (e) => {
    e.preventDefault();

    let fd = new FormData();
    fd.append("titulli", editTitulli);
    fd.append("sku", editSku);
    fd.append("pershkrimi", editPershkrimi);
    fd.append("kategoria", editKategoria);
    fd.append("cmimi", editCmimi);
    fd.append("sasia", editSasia);
    fd.append("njesia", editNjesia);
    fd.append("image", imageEdit);
    fd.append("status", editStatus);

    axios
      .post(
        `https://192.168.88.250/demo_react_server/api/config/edit_product.php?produkt_id=${editID}`,
        fd
      )
      .then((res) => {
        if (res.data.status === 0) {
          alertContext.setAlert(`${res.data.message}`, "error");
        } else if (res.data.status === 1) {
          alertContext.setAlert(`${res.data.message}`, "success");
          showPorduktDetailsPop(false);
          setDeletedImage(false);
          depoContext.getAllProducts();
        }
      });
  };

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
      return "#fd3259";
    } else if (item >= 1 && item <= 20) {
      return "#FECD2F";
    } else {
      return "#3ccc38";
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
      {detailsPop && (
        <div className="produkt-details-pop">
          <div
            className="produkt-details-pop-opa"
            onClick={() => {
              setDetailsPop(false);
            }}
          ></div>

          <div className="produkt-details-pop-container">
            <Avatar
              style={{ width: "80px", height: "80px" }}
              src={`https://192.168.88.250/demo_react_server/images/${produktDetails.image}`}
              alt={produktDetails.titulli}
            />
            <h2>Titulli :</h2>
            {produktDetails.titulli}
            <h2>Pershkrimi</h2>
            {produktDetails.pershkrimi}
            <h2>Sku:</h2>
            {produktDetails.sku}
            <h2>Kategoria:</h2>
            {produktDetails.kategoria}
            <h2>Cmimi:</h2>
            {produktDetails.cmimi}
            <h2>Stock :</h2>
            {produktDetails.sasia}
            <h2>Status</h2>
            {produktDetails.status === 1 ? "Aktive" : "Joaktive"}
          </div>
        </div>
      )}

      {produktDetailsPop && (
        <div className="produkt-edit-pop">
          <div
            className="produkt-edit-pop-opa"
            onClick={() => {
              showPorduktDetailsPop(false);
              setDeletedImage(false);
              alertContext.setAlert("Produkti nuk u ndryshua", "warning");
            }}
          ></div>

          <div className="produkt-edit-pop-container">
            <form className="form-edit-produkt" onSubmit={onEditProducts}>
              <div className="produkt-edit-pop-container-titulli">
                <FormControl variant="outlined">
                  <InputLabel htmlFor="njesia-label">Status</InputLabel>
                  <Select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    style={{ width: "150px" }}
                    label="Status"
                    inputProps={{
                      name: "status",
                      id: "njesia-label",
                    }}
                  >
                    <MenuItem value={1}>Aktive</MenuItem>
                    <MenuItem value={0}>Joaktive</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  value={editTitulli}
                  label="Titulli"
                  variant="outlined"
                  onChange={(e) => setEditTitulli(e.target.value)}
                />
                <TextField
                  value={editSku}
                  label="Sku"
                  variant="outlined"
                  onChange={(e) => setEditSku(e.target.value)}
                />
              </div>

              <div className="produkt-edit-pop-container-pershkrimi">
                <textarea
                  value={editPershkrimi}
                  onChange={(e) => setEditPershkrimi(e.target.value)}
                />
                <div
                  className={
                    imageEdit === "" ? "image" : "image outlinestyle-none"
                  }
                >
                  {imageEdit === "" ? (
                    <>
                      <InputLabel
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        htmlFor="image"
                      >
                        <AddIcon style={{ fontSize: "70px" }} /> upload{" "}
                      </InputLabel>
                      <Input
                        onChange={(e) => {
                          setEditImage(e.target.files[0]);
                          setEditFile(URL.createObjectURL(e.target.files[0]));
                        }}
                        id="image"
                        type="file"
                        style={{ display: "none" }}
                      />
                    </>
                  ) : (
                    <>
                      {deletedImage === true ? (
                        <>
                          <DeleteOutlineOutlinedIcon
                            onClick={() => {
                              setEditImage("");
                              setEditFile("");
                              setDeletedImage(true);
                            }}
                            className="delete-icon-image"
                          />
                          <img src={fileEdit} alt="" />
                        </>
                      ) : (
                        <>
                          <DeleteOutlineOutlinedIcon
                            onClick={() => {
                              setEditImage("");
                              setEditFile("");
                              setDeletedImage(true);
                            }}
                            className="delete-icon-image"
                          />
                          <img
                            src={`https://192.168.88.250/demo_react_server/images/${fileEdit}`}
                            alt=""
                          />
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="produkt-edit-pop-container-kategoria">
                <FormControl variant="outlined">
                  <InputLabel htmlFor="kategoria-label">Kategoria</InputLabel>
                  <Select
                    onChange={(e) => setEditKategoria(e.target.value)}
                    style={{ width: "150px" }}
                    value={editKategoria}
                    label="Kategoria"
                    inputProps={{
                      name: "kategoria",
                      id: "kategoria-label",
                    }}
                  >
                    <MenuItem value="kategoria1">Kategoria1</MenuItem>
                    <MenuItem value="kategoria2">Kategoria2</MenuItem>
                    <MenuItem value="kategoria3">Kategoria3</MenuItem>
                    <MenuItem value="kategoria4">Kategoria4</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  value={editCmimi}
                  label="Cmimi"
                  type="number"
                  variant="outlined"
                  onChange={(e) => setEditCmimi(e.target.value)}
                />
                <TextField
                  value={editSasia}
                  label="Sasia"
                  type="number"
                  variant="outlined"
                  onChange={(e) => setEditSasia(e.target.value)}
                />

                <FormControl variant="outlined">
                  <InputLabel htmlFor="njesia-label">Njesia</InputLabel>
                  <Select
                    value={editNjesia}
                    onChange={(e) => setEditNjesia(e.target.value)}
                    style={{ width: "150px" }}
                    label="Njesia"
                    inputProps={{
                      name: "njesia",
                      id: "njesia-label",
                    }}
                  >
                    <MenuItem value="cop">Cop</MenuItem>
                    <MenuItem value="kuti">Kuti</MenuItem>
                    <MenuItem value="pako">Pako</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="produkt-edit-pop-container-buttons">
                <Button color="primary" variant="outlined" type="submit">
                  Edit
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() => {
                    showPorduktDetailsPop(false);
                    setDeletedImage(false);
                    alertContext.setAlert("Produkti nuk u ndryshua", "warning");
                  }}
                >
                  Anullo
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

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
              <TableCell align="left" onClick={() => requestSort("status")}>
                Status
                {propertyName.key === "status" &&
                  propertyName.direction === "ascending" && (
                    <ArrowUpwardOutlinedIcon style={{ fontSize: "17px" }} />
                  )}
                {propertyName.key === "status" &&
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
                  {produkt.sasia === 0 ? "Ska stok" : produkt.sasia}
                </TableCell>
                <TableCell>{produkt.cmimi}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    style={{
                      backgroundColor: renderButtonColorsStatus(produkt.status),
                      color: "white",
                      width: "100px",
                    }}
                  >
                    {" "}
                    {renderButtonStatus(produkt.status)}{" "}
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <div className="veprime" style={{ cursor: "pointer" }}>
                    <VisibilityOutlinedIcon
                      onClick={() => {
                        setProduktDetails(produkt);
                        setDetailsPop(true);
                      }}
                    />
                    <EditOutlinedIcon
                      onClick={() => {
                        showPorduktDetailsPop(true);
                        setEditTitulli(produkt.titulli);
                        setEditSku(produkt.sku);
                        setEditPershkrimi(produkt.pershkrimi);
                        setEditKategoria(produkt.kategoria);
                        setEditCmimi(produkt.cmimi);
                        setEditSasia(produkt.sasia);
                        setEditNjesia(produkt.njesia);
                        setEditStatus(produkt.status);
                        setEditFile(produkt.image);
                        setEditImage(produkt.image);
                        setEditID(produkt.id);
                      }}
                    />
                    <DeleteOutlineOutlinedIcon
                      onClick={() => {
                        showDeletePop(true);
                        setDeleteId(produkt.id);
                      }}
                      style={{ display: produkt.status === 0 ? "none" : "" }}
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
