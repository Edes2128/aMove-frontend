import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import TextField from "@material-ui/core/TextField";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import AlertContext from "../../../context/alertContext/AlertContext";
import DepoContext from "../../../context/depoContext/DepoContext";
import axios from "axios";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Pagination from "@material-ui/lab/Pagination";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";

export default function ShtoKategoriProduktesh() {
  const [shtoKategoriPop, showKategoriPop] = useState(false);
  const [editKategoriPop, showEditKategoriPop] = useState(false);
  const [deleteKategoriPop, showDeleteKategoriPop] = useState(false);
  const [editKategoriName, setEditKategoriName] = useState("");
  const [editID, setEditID] = useState("");
  const [deleteID, setDeleteID] = useState("");
  const [kategoriName, setKategoriName] = useState("");
  const depoContext = useContext(DepoContext);
  const alertContext = useContext(AlertContext);
  const { categoryProducts } = depoContext;
  const [page, setPage] = useState(1);
  const [itemPage, setItempage] = useState(5);
  const start = (page - 1) * itemPage;
  const end = page * itemPage;
  const [propertyName, setProperty] = useState({
    key: "id",
    direction: "descending",
  });

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
  if (propertyName !== null) {
    categoryProducts.sort((a, b) => {
      if (a[propertyName.key] < b[propertyName.key]) {
        return propertyName.direction === "ascending" ? -1 : 1;
      }
      if (a[propertyName.key] > b[propertyName.key]) {
        return propertyName.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }
  useEffect(() => {
    depoContext.getCategoryProducts();
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <>
      {deleteKategoriPop && (
        <div className="produkt-kategori-delete-pop">
          <div
            className="produkt-kategori-delete-pop-opa"
            onClick={() => {
              showDeleteKategoriPop(false);
              setDeleteID("");
            }}
          ></div>

          <div className="produkt-kategori-delete-pop-container">
            <p>Jeni te sigurt qe doni ta fshini?</p>
            <div className="produkt-kategori-delete-pop-container-buttons">
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  axios
                    .post(
                      "https://amove.alcodeit.com/delete_categoryProduct.php",
                      { id: deleteID }
                    )
                    .then((res) => {
                      if (res.data.status === 1) {
                        alertContext.setAlert(`${res.data.message}`, "success");
                        showDeleteKategoriPop(false);
                        setDeleteID("");
                        depoContext.getCategoryProducts();
                      } else {
                        alertContext.setAlert(`${res.data.message}`, "error");
                      }
                    });
                }}
              >
                Po
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => {
                  showDeleteKategoriPop(false);
                  setDeleteID("");
                }}
              >
                Jo
              </Button>
            </div>
          </div>
        </div>
      )}

      {editKategoriPop && (
        <div className="produkt-kategori-edit-pop">
          <div
            className="produkt-kategori-edit-pop-opa"
            onClick={() => {
              showEditKategoriPop(false);
              setEditID("");
              setEditKategoriName("");
            }}
          ></div>
          <div className="produkt-kategori-edit-pop-container">
            <CloseOutlinedIcon
              style={{
                alignSelf: "flex-end",
                marginRight: "20px",
                cursor: "pointer",
              }}
              onClick={() => {
                showEditKategoriPop(false);
                setEditID("");
                setEditKategoriName("");
              }}
            />
            <TextField
              style={{ width: "60%" }}
              variant="outlined"
              label="Emri i kategorise"
              value={editKategoriName}
              onChange={(e) => setEditKategoriName(e.target.value)}
            />

            <div className="produkt-kategori-edit-pop-container-buttons">
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  axios
                    .post(
                      "https://amove.alcodeit.com/edit_productCategory.php",
                      { id: editID, name: editKategoriName }
                    )
                    .then((res) => {
                      if (res.data.status === 1) {
                        alertContext.setAlert(`${res.data.message}`, "success");
                        showKategoriPop(false);
                        setEditID("");
                        setEditKategoriName("");
                      } else {
                        alertContext.setAlert(`${res.data.message}`, "error");
                      }
                    });
                }}
              >
                Ruaj
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => {
                  showEditKategoriPop(false);
                  setEditID("");
                  setEditKategoriName("");
                }}
              >
                Anullo
              </Button>
            </div>
          </div>
        </div>
      )}

      {shtoKategoriPop && (
        <div className="shto-kategori-pop">
          <div
            className="shto-kategori-pop-opa"
            onClick={() => {
              showKategoriPop(false);
              setKategoriName("");
            }}
          ></div>
          <div className="shto-kategori-pop-container">
            <CloseOutlinedIcon
              style={{
                alignSelf: "flex-end",
                marginRight: "20px",
                cursor: "pointer",
              }}
              onClick={() => {
                showKategoriPop(false);
                setKategoriName("");
              }}
            />

            <TextField
              value={kategoriName}
              style={{ width: "60%" }}
              variant="outlined"
              label="Emri i kategorise"
              onChange={(e) => setKategoriName(e.target.value)}
            />
            <div className="shto-kategori-pop-container-buttons">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  axios
                    .post(
                      "https://amove.alcodeit.com/add_product_category.php",
                      { name: kategoriName }
                    )
                    .then((res) => {
                      if (res.data.status === 1) {
                        alertContext.setAlert(`${res.data.message}`, "success");
                        setKategoriName("");
                        showKategoriPop(false);
                        depoContext.getCategoryProducts();
                      } else {
                        alertContext.setAlert(`${res.data.message}`, "error");
                      }
                    });
                }}
              >
                Shto
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  showKategoriPop(false);
                  setKategoriName("");
                }}
              >
                Anullo
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="shto-kategori-produktesh">
        <div className="shto-kategori-produktesh-header">
          <h3>Kategorite e produkteve</h3>
          <Button
            startIcon={<AddBoxOutlinedIcon />}
            color="primary"
            variant="contained"
            onClick={() => {
              showKategoriPop(true);
            }}
          >
            Shto kategori
          </Button>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ cursor: "pointer" }}
                align="center"
                onClick={() => requestSort("id")}
              >
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
              <TableCell
                style={{ cursor: "pointer" }}
                align="center"
                onClick={() => requestSort("name")}
              >
                Emri
                {propertyName.key === "name" &&
                  propertyName.direction === "ascending" && (
                    <ArrowUpwardOutlinedIcon style={{ fontSize: "17px" }} />
                  )}
                {propertyName.key === "name" &&
                  propertyName.direction === "descending" && (
                    <ArrowDownwardOutlinedIcon style={{ fontSize: "17px" }} />
                  )}
              </TableCell>
              <TableCell style={{ cursor: "pointer" }} align="center">
                Veprimet
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryProducts.slice(start, end).map((category) => (
              <TableRow key={category.id}>
                <TableCell align="center"> {category.id} </TableCell>
                <TableCell align="center"> {category.name} </TableCell>
                <TableCell align="center">
                  <EditOutlinedIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      showEditKategoriPop(true);
                      setEditKategoriName(category.name);
                      setEditID(category.id);
                    }}
                  />
                  <DeleteOutlineOutlinedIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setDeleteID(category.id);
                      showDeleteKategoriPop(true);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="pagination">
          <div style={{ display: "flex", alignItems: "center" }}>
            <InputLabel style={{ marginRight: "10px" }} id="row">
              Kategori ne faqe
            </InputLabel>
            <Select
              labelId="row"
              onChange={(e) => {
                setItempage(e.target.value);
              }}
              value={itemPage}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </div>
          <Pagination
            count={Math.ceil(categoryProducts.length / itemPage)}
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
