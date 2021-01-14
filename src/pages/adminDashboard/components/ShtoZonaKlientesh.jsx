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

export default function ShtoZonaKlientesh() {
  const depoContext = useContext(DepoContext);
  const { zonaClients } = depoContext;
  const alertContext = useContext(AlertContext);
  const [shtoZonaPop, showShtoZonaPop] = useState(false);
  const [emriZones, setEmriZones] = useState("");
  const [deleteZonaPop, showDeleteZonaPop] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [editZonaPop, showEditZonaPop] = useState(false);
  const [editZonaName, setEditZonaName] = useState("");
  const [editZonaID, setEditZonaID] = useState("");
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
    zonaClients.sort((a, b) => {
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
    depoContext.getZonaClients();
  }, []);

  return (
    <>
      {editZonaPop && (
        <div className="edit-klient-zona-pop">
          <div
            className="edit-klient-zona-pop-opa"
            onClick={() => {
              showEditZonaPop(false);
              setEditZonaID("");
              setEditZonaName("");
            }}
          ></div>
          <div className="edit-klient-zona-pop-container">
            <CloseOutlinedIcon
              style={{
                alignSelf: "flex-end",
                marginRight: "20px",
                cursor: "pointer",
              }}
              onClick={() => {
                showEditZonaPop(false);
                setEditZonaID("");
                setEditZonaName("");
              }}
            />
            <TextField
              variant="outlined"
              label="Emri i zones"
              value={editZonaName}
              onChange={(e) => {
                setEditZonaName(e.target.value);
              }}
              style={{ width: "60%" }}
            />
            <div className="edit-klient-zona-pop-container-buttons">
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  axios
                    .post(
                      "https://192.168.88.250/demo_react_server/api/config/edit_zona_clients.php",
                      { id: editZonaID, name: editZonaName }
                    )
                    .then((res) => {
                      if (res.data.status === 1) {
                        depoContext.getZonaClients();
                        alertContext.setAlert(`${res.data.message}`, "success");
                        setEditZonaName("");
                        setEditZonaID("");
                        showEditZonaPop(false);
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
                  setEditZonaName("");
                  setEditZonaID("");
                  showEditZonaPop(false);
                }}
              >
                Anullo
              </Button>
            </div>
          </div>
        </div>
      )}

      {deleteZonaPop && (
        <div className="delete-klient-zona-pop">
          <div
            className="delete-klient-zona-pop-opa"
            onClick={() => {
              showDeleteZonaPop(false);
              setDeleteID("");
            }}
          ></div>
          <div className="delete-klient-zona-pop-container">
            <CloseOutlinedIcon
              style={{
                alignSelf: "flex-end",
                marginRight: "20px",
                cursor: "pointer",
              }}
              onClick={() => {
                showDeleteZonaPop(false);
                setDeleteID("");
              }}
            />
            <h4>Jeni te sigurt qe doni te fshini zonen?</h4>
            <div className="delete-klient-zona-pop-container-buttons">
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => {
                  axios
                    .post(
                      "https://192.168.88.250/demo_react_server/api/config/delete_zona_clients.php",
                      { id: deleteID }
                    )
                    .then((res) => {
                      if (res.data.status === 1) {
                        alertContext.setAlert(`${res.data.message}`, "success");
                        depoContext.getZonaClients();
                        setDeleteID("");
                        showDeleteZonaPop(false);
                      } else {
                        alertContext.setAlert(`${res.data.message}`, "error");
                      }
                    });
                }}
              >
                PO
              </Button>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  setDeleteID("");
                  showDeleteZonaPop(false);
                }}
              >
                JO
              </Button>
            </div>
          </div>
        </div>
      )}

      {shtoZonaPop && (
        <div className="shto-klient-zona-pop">
          <div
            className="shto-klient-zona-pop-opa"
            onClick={() => {
              showShtoZonaPop(false);
              setEmriZones("");
            }}
          ></div>
          <div className="shto-klient-zona-pop-container">
            <CloseOutlinedIcon
              style={{
                alignSelf: "flex-end",
                marginRight: "20px",
                cursor: "pointer",
              }}
              onClick={() => {
                showShtoZonaPop(false);
                setEmriZones("");
              }}
            />
            <TextField
              label="Emri i zones"
              style={{ width: "60%" }}
              value={emriZones}
              onChange={(e) => setEmriZones(e.target.value)}
              variant="outlined"
            />
            <div className="shto-klient-zona-pop-container-buttons">
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  axios
                    .post(
                      "https://192.168.88.250/demo_react_server/api/config/add_zona_client.php",
                      { name: emriZones }
                    )
                    .then((res) => {
                      if (res.data.status === 1) {
                        depoContext.getZonaClients();
                        alertContext.setAlert(`${res.data.message}`, "success");
                        setEmriZones("");
                        showShtoZonaPop(false);
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
                  setEmriZones("");
                  showShtoZonaPop(false);
                }}
              >
                Anullo
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="shto-klient-zona">
        <div className="shto-klient-zona-header">
          <h4>Zonat e klienteve</h4>
          <Button
            color="primary"
            variant="outlined"
            startIcon={<AddBoxOutlinedIcon />}
            onClick={() => {
              showShtoZonaPop(true);
            }}
          >
            Shto zone
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
              <TableCell align="center">Veprimet</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {zonaClients.slice(start, end).map((zona) => (
              <TableRow>
                <TableCell align="center">{zona.id}</TableCell>
                <TableCell align="center">{zona.name}</TableCell>
                <TableCell align="center">
                  <EditOutlinedIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      showEditZonaPop(true);
                      setEditZonaID(zona.id);
                      setEditZonaName(zona.name);
                    }}
                  />
                  <DeleteOutlineOutlinedIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      showDeleteZonaPop(true);
                      setDeleteID(zona.id);
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
              Zona ne faqe
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
            count={Math.ceil(zonaClients.length / itemPage)}
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
