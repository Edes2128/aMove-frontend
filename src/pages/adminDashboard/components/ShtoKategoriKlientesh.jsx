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

export default function ShtoKategoriKlientesh() {
  const depoContext = useContext(DepoContext);
  const { categoryClients } = depoContext;
  const alertContext = useContext(AlertContext);
  const [shtoKategoriPop, showShtoKategoriPop] = useState(false);
  const [deleteKategoriPop, showDeleteKategoriPop] = useState(false);
  const [editKategoriPopm, showEditKategoriPop] = useState(false);
  const [editKategoriName, setEditKategoriName] = useState("");
  const [editIDKategori, setEditIDKategori] = useState("");
  const [emriKategorise, setEmriKategorise] = useState("");
  const [deleteID, setDeleteID] = useState("");
  const [itemPage, setItempage] = useState(5);
  const [page, setPage] = useState(1);
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
    categoryClients.sort((a, b) => {
      if (a[propertyName.key] < b[propertyName.key]) {
        return propertyName.direction === "ascending" ? -1 : 1;
      }
      if (a[propertyName.key] > b[propertyName.key]) {
        return propertyName.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    depoContext.getCategoryClients();
  }, []);

  return (
    <>
      {editKategoriPopm && (
        <div className="edit-kategori-klientesh-pop">
          <div
            className="edit-kategori-klientesh-pop-opa"
            onClick={() => {
              showEditKategoriPop(false);
              setEditKategoriName("");
              setEditIDKategori("");
            }}
          ></div>
          <div className="edit-kategori-klientesh-pop-container">
            <CloseOutlinedIcon
              style={{
                alignSelf: "flex-end",
                marginRight: "20px",
                cursor: "pointer",
              }}
              onClick={() => {
                showEditKategoriPop(false);
                setEditKategoriName("");
                setEditIDKategori("");
              }}
            />
            <TextField
              value={editKategoriName}
              onChange={(e) => {
                setEditKategoriName(e.target.value);
              }}
              variant="outlined"
              label="Emri i kategorise"
              style={{ width: "60%" }}
            />
            <div className="edit-kategori-klientesh-pop-container-buttons">
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  axios
                    .post(
                      "https://amove.alcodeit.com/edit_category_client.php",
                      { id: editIDKategori, name: editKategoriName }
                    )
                    .then((res) => {
                      if (res.data.status === 1) {
                        showEditKategoriPop(false);
                        setEditKategoriName("");
                        setEditIDKategori("");
                        depoContext.getCategoryClients();
                        alertContext.setAlert(`${res.data.message}`, "success");
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
                  setEditKategoriName("");
                  setEditIDKategori("");
                }}
              >
                Anullo
              </Button>
            </div>
          </div>
        </div>
      )}

      {deleteKategoriPop && (
        <div className="delete-kategori-klientesh-pop">
          <div
            className="delete-kategori-klientesh-pop-opa"
            onClick={() => {
              showDeleteKategoriPop(false);
              setDeleteID("");
            }}
          ></div>

          <div className="delete-kategori-klientesh-pop-container">
            <CloseOutlinedIcon
              style={{
                alignSelf: "flex-end",
                marginRight: "20px",
                cursor: "pointer",
              }}
              onClick={() => {
                showDeleteKategoriPop(false);
                setDeleteID("");
              }}
            />
            <h4>Jeni te sigurt qe doni te fshni kateogrine?</h4>
            <div className="delete-kategori-klientesh-pop-container-buttons">
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => {
                  axios
                    .post(
                      "https://amove.alcodeit.com/delete_category_client.php",
                      { id: deleteID }
                    )
                    .then((res) => {
                      if (res.data.status === 1) {
                        showDeleteKategoriPop(false);
                        setDeleteID("");
                        alertContext.setAlert(`${res.data.message}`, "success");
                        depoContext.getCategoryClients();
                      } else {
                        alertContext.setAlert(`${res.data.message}`, "error");
                      }
                    });
                }}
              >
                Po
              </Button>
              <Button
                color="primary"
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

      {shtoKategoriPop && (
        <div className="shto-kategori-klientesh-pop">
          <div
            className="shto-kategori-klientesh-pop-opa"
            onClick={() => {
              showShtoKategoriPop(false);
              setEmriKategorise("");
            }}
          ></div>
          <div className="shto-kategori-klientesh-pop-container">
            <CloseOutlinedIcon
              style={{
                alignSelf: "flex-end",
                marginRight: "20px",
                cursor: "pointer",
              }}
              onClick={() => {
                showShtoKategoriPop(false);
                setEmriKategorise("");
              }}
            />
            <TextField
              style={{ width: "60%" }}
              label="Emri i kategorise"
              variant="outlined"
              value={emriKategorise}
              onChange={(e) => {
                setEmriKategorise(e.target.value);
              }}
            />
            <div className="shto-kategori-klientesh-pop-container-buttons">
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  axios
                    .post(
                      "https://amove.alcodeit.com/add_category_client.php",
                      { name: emriKategorise }
                    )
                    .then((res) => {
                      if (res.data.status === 1) {
                        alertContext.setAlert(`${res.data.message}`, "success");
                        showShtoKategoriPop(false);
                        depoContext.getCategoryClients();
                        setEmriKategorise("");
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
                variant="contained"
                onClick={() => {
                  showShtoKategoriPop(false);
                  setEmriKategorise("");
                }}
              >
                Anullo
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="shto-kategori-klientesh">
        <div className="shto-kategori-klientesh-header">
          <h3>Kategorite e klienteve</h3>
          <Button
            color="primary"
            variant="outlined"
            startIcon={<AddBoxOutlinedIcon />}
            onClick={() => {
              showShtoKategoriPop(true);
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
            {categoryClients.slice(start, end).map((category) => (
              <TableRow>
                <TableCell align="center">{category.id}</TableCell>
                <TableCell align="center">{category.name}</TableCell>
                <TableCell align="center">
                  <EditOutlinedIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setEditIDKategori(category.id);
                      setEditKategoriName(category.name);
                      showEditKategoriPop(true);
                    }}
                  />
                  <DeleteOutlineOutlinedIcon
                    onClick={() => {
                      showDeleteKategoriPop(true);
                      setDeleteID(category.id);
                    }}
                    style={{ cursor: "pointer" }}
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
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </div>
          <Pagination
            count={Math.ceil(categoryClients.length / itemPage)}
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
