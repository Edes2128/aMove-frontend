import React, { useState, useEffect, useContext } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { Button, TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import Pagination from "@material-ui/lab/Pagination";
import CategoryOutlinedIcon from "@material-ui/icons/CategoryOutlined";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import ShtoKlientPopup from "./ShtoKlientPopup";
import DepoContext from "../../../context/depoContext/DepoContext";
import { CloseOutlined } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import AlertContext from "../../../context/alertContext/AlertContext";
import FormControl from "@material-ui/core/FormControl";
import AddIcon from "@material-ui/icons/Add";
import Input from "@material-ui/core/Input";
import axios from "axios";

export default function Klient() {
  const [editID, setEditID] = useState("");
  const [editEmri, setEditEmri] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editZona, setEditZona] = useState("");
  const [editKategoria, setEditKategoria] = useState("");
  const [editFile, setEditFile] = useState("");
  const [editImage, setEditImage] = useState("");
  const [deletedImage, setDeletedImage] = useState(false);
  const [userEditPop, setUserEditPop] = useState(false);
  const [userPopup, shotUserPopup] = useState(false);
  const alertContext = useContext(AlertContext);
  const [kategori, Setkategori] = useState("");
  const [zona, Setzona] = useState("");
  const [page, setPage] = useState(1);
  const [itemPage, setItempage] = useState(5);
  const start = (page - 1) * itemPage;
  const end = page * itemPage;
  const depoContext = useContext(DepoContext);
  const { klientet } = depoContext;
  const [userDetails, setUserDetails] = useState({});
  const [userDetailsPop, showUserDetailsPop] = useState(false);
  const [propertyName, setProperty] = useState({
    key: "id",
    direction: "descending",
  });
  const [searchFilter, setSearchFilter] = useState("");

  const klientetFiltered = klientet.filter(
    (order) =>
      order.id.toString().toLowerCase().includes(searchFilter.toLowerCase()) ||
      order.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      order.email.toLowerCase().includes(searchFilter.toLowerCase()) ||
      order.zona.toLowerCase().includes(searchFilter.toLowerCase()) ||
      order.kategoria.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const onEditUser = (e) => {
    e.preventDefault();

    let fd = new FormData();
    fd.append("name", editEmri);
    fd.append("email", editEmail);
    fd.append("password", editPassword);
    fd.append("zona", editZona);
    fd.append("kategoria", editKategoria);
    fd.append("image", editImage);
    fd.append("status", editStatus);

    axios
      .post(
        `https://192.168.88.250/demo_react_server/api/config/edit_user.php?user_id=${editID}`,
        fd
      )
      .then((res) => {
        if (res.data.status === 0) {
          alertContext.setAlert(`${res.data.message}`, "error");
        } else if (res.data.status === 1) {
          alertContext.setAlert(`${res.data.message}`, "success");
          depoContext.getAllClients();
          setUserEditPop(false);
        }
      });
  };

  useEffect(() => {
    depoContext.getAllClients();
  }, []);

  if (propertyName !== null) {
    klientetFiltered.sort((a, b) => {
      if (a[propertyName.key] < b[propertyName.key]) {
        return propertyName.direction === "ascending" ? -1 : 1;
      }
      if (a[propertyName.key] > b[propertyName.key]) {
        return propertyName.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }

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

  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <>
      {userEditPop && (
        <div className="user-edit-pop">
          <div
            className="user-edit-pop-opa"
            onClick={() => {
              setUserEditPop(false);
              alertContext.setAlert("Klienti nuk u ndryshua", "info");
            }}
          ></div>

          <div className="user-edit-pop-container">
            <form
              className="user-edit-pop-container-form"
              onSubmit={onEditUser}
            >
              <TextField
                label="Emri"
                style={{ width: "60%" }}
                variant="outlined"
                value={editEmri}
                type="text"
                onChange={(e) => setEditEmri(e.target.value)}
              />
              <TextField
                label="Email"
                style={{ width: "60%" }}
                variant="outlined"
                value={editEmail}
                type="email"
                onChange={(e) => setEditEmail(e.target.value)}
              />
              <TextField
                type="password"
                label="Password"
                style={{ width: "60%" }}
                variant="outlined"
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
              />
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

              <FormControl variant="outlined">
                <InputLabel htmlFor="njesia-label">Kategoria</InputLabel>
                <Select
                  value={editKategoria}
                  onChange={(e) => setEditKategoria(e.target.value)}
                  style={{ width: "150px" }}
                  label="Status"
                  inputProps={{
                    name: "status",
                    id: "njesia-label",
                  }}
                >
                  <MenuItem value="None"></MenuItem>
                  <MenuItem value={"Kategoria 1"}>Kategoria 1</MenuItem>
                  <MenuItem value={"Ktegoria 2"}>Kategoria 2</MenuItem>
                  <MenuItem value={"Kategoria 3"}>Kategoria 3</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="outlined">
                <InputLabel htmlFor="njesia-label">Zona</InputLabel>
                <Select
                  value={editZona}
                  onChange={(e) => setEditZona(e.target.value)}
                  style={{ width: "150px" }}
                  label="Status"
                  inputProps={{
                    name: "status",
                    id: "njesia-label",
                  }}
                >
                  <MenuItem value="None"></MenuItem>
                  <MenuItem value={"Zona 1"}>Zona 1</MenuItem>
                  <MenuItem value={"Zona 2"}>Zona 2</MenuItem>
                  <MenuItem value={"Zona 3"}>Zona 3</MenuItem>
                </Select>
              </FormControl>

              <div
                className={
                  editImage === "" ? "image-2" : "image-2 outlinestyle-none"
                }
              >
                {editImage === "" ? (
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
                        <img src={editFile} alt="" />
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
                          src={`https://192.168.88.250/demo_react_server/images/${editFile}`}
                          alt=""
                        />
                      </>
                    )}
                  </>
                )}
              </div>
              <div className="edit-user-pop-buttons">
                <Button color="primary" variant="outlined" type="submit">
                  {" "}
                  Edit{" "}
                </Button>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() => {
                    setUserEditPop(false);
                    alertContext.setAlert("Klienti nuk u ndryshua", "info");
                  }}
                >
                  Anullo
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {userDetailsPop && (
        <div className="user-details-pop">
          <div
            className="user-details-pop-opa"
            onClick={() => showUserDetailsPop(false)}
          ></div>
          <div className="user-details-pop-container">
            <CloseOutlined
              style={{
                alignSelf: "flex-end",
                marginRight: "20px",
                marginTop: "20px",
                fontSize: "30px",
                cursor: "pointer",
              }}
              onClick={() => showUserDetailsPop(false)}
            />
            <Avatar
              src={`https://192.168.88.250/demo_react_server/images/${userDetails.image_profile}`}
              style={{ height: "80px", width: "80px" }}
            />
            <div className="user-pop-details-content">
              <h3>Emri: </h3>
              <i>
                <p>{userDetails.name}</p>
              </i>

              <h3>Email: </h3>
              <i>
                {" "}
                <p>{userDetails.email}</p>
              </i>

              <h3>Zona: </h3>
              <i>
                <p>{userDetails.zona}</p>
              </i>

              <h3>Kategoria: </h3>
              <i>
                <p>{userDetails.kategoria}</p>
              </i>
            </div>
          </div>
        </div>
      )}
      {userPopup && <ShtoKlientPopup closePopup={() => shotUserPopup(false)} />}
      <div className="klient">
        <div className="admin-klient">
          <div className="admin-klient-cat">
            <div className="admin-klient-cat-content">
              <p className="all-client">Te gjithe klientet</p>
              <h2 className="all-client-num">{klientet.length}</h2>
              <span style={{ display: "flex" }} className="span-client-offer">
                20% <p>(30 dite)</p>
              </span>
            </div>
            <div className="admin-klient-cat-icon">
              <PeopleAltOutlinedIcon style={{ fontSize: 40 }} />
            </div>
          </div>

          <div className="admin-klient-cat">
            <div className="admin-klient-cat-content">
              <InputLabel id="kategori">Kategoria</InputLabel>
              <Select
                labelId="kategori"
                value={kategori === "" ? "none" : kategori}
                onChange={(e) => Setkategori(e.target.value)}
              >
                <MenuItem value="None">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Kategoria 1"}>Kategoria 1</MenuItem>
                <MenuItem value={"Kategoria 2"}>Kategoria 2</MenuItem>
                <MenuItem value={"Kategoria 3"}>Kategoria 3</MenuItem>
              </Select>

              <span className="span-client-offer">
                Asnje kategori e zgjedhur
              </span>
            </div>
            <div className="admin-klient-cat-icon">
              <CategoryOutlinedIcon style={{ fontSize: 40 }} />
            </div>
          </div>

          <div className="admin-klient-cat">
            <div className="admin-klient-cat-content">
              <InputLabel id="zona">Zona</InputLabel>
              <Select
                labelId="zona"
                value={zona === "" ? "none" : zona}
                onChange={(e) => Setzona(e.target.value)}
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Zona 1"}>Zona 1</MenuItem>
                <MenuItem value={"Zona 2"}>Zona 2</MenuItem>
                <MenuItem value={"Zona 3"}>Zona 3</MenuItem>
              </Select>
              <span className="span-client-offer">Asnje zone e zgjedhur</span>
            </div>
            <div className="admin-klient-cat-icon">
              <ExploreOutlinedIcon style={{ fontSize: 40 }} />
            </div>
          </div>
        </div>
        <div className="data-table-klient">
          <div className="table-first-div">
            <h2>Klientet</h2>

            <div className="table-search-add">
              <TextField
                size="small"
                placeholder="Kerko"
                type="search"
                label="Kerko"
                variant="outlined"
                onChange={(e) => setSearchFilter(e.target.value)}
              ></TextField>
              <Button
                variant="contained"
                onClick={() => shotUserPopup(true)}
                color="primary"
              >
                <GroupAddOutlinedIcon style={{ marginRight: "10px" }} />
                <p style={{ color: "white", textDecoration: "none" }}>
                  Shto klient
                </p>
              </Button>
            </div>
          </div>

          <div className="data-table">
            <Table>
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
                        <ArrowDownwardOutlinedIcon
                          style={{ fontSize: "17px" }}
                        />
                      )}
                  </TableCell>
                  <TableCell onClick={() => requestSort("name")} align="left">
                    Emri
                    {propertyName.key === "name" &&
                      propertyName.direction === "ascending" && (
                        <ArrowUpwardOutlinedIcon style={{ fontSize: "17px" }} />
                      )}
                    {propertyName.key === "name" &&
                      propertyName.direction === "descending" && (
                        <ArrowDownwardOutlinedIcon
                          style={{ fontSize: "17px" }}
                        />
                      )}
                  </TableCell>
                  <TableCell
                    onClick={() => requestSort("email")}
                    width="300px"
                    align="left"
                  >
                    Email
                    {propertyName.key === "email" &&
                      propertyName.direction === "ascending" && (
                        <ArrowUpwardOutlinedIcon style={{ fontSize: "17px" }} />
                      )}
                    {propertyName.key === "email" &&
                      propertyName.direction === "descending" && (
                        <ArrowDownwardOutlinedIcon
                          style={{ fontSize: "17px" }}
                        />
                      )}
                  </TableCell>
                  <TableCell onClick={() => requestSort("zona")} align="left">
                    Zona
                    {propertyName.key === "zona" &&
                      propertyName.direction === "ascending" && (
                        <ArrowUpwardOutlinedIcon style={{ fontSize: "17px" }} />
                      )}
                    {propertyName.key === "zona" &&
                      propertyName.direction === "descending" && (
                        <ArrowDownwardOutlinedIcon
                          style={{ fontSize: "17px" }}
                        />
                      )}
                  </TableCell>
                  <TableCell
                    onClick={() => requestSort("kategoria")}
                    align="left"
                  >
                    Kategoria
                    {propertyName.key === "kategoria" &&
                      propertyName.direction === "ascending" && (
                        <ArrowUpwardOutlinedIcon style={{ fontSize: "17px" }} />
                      )}
                    {propertyName.key === "kategoria" &&
                      propertyName.direction === "descending" && (
                        <ArrowDownwardOutlinedIcon
                          style={{ fontSize: "17px" }}
                        />
                      )}
                  </TableCell>
                  <TableCell
                    align="left"
                    onClick={() => requestSort("status_user")}
                  >
                    Status
                    {propertyName.key === "status_user" &&
                      propertyName.direction === "ascending" && (
                        <ArrowUpwardOutlinedIcon style={{ fontSize: "17px" }} />
                      )}
                    {propertyName.key === "status_user" &&
                      propertyName.direction === "descending" && (
                        <ArrowDownwardOutlinedIcon
                          style={{ fontSize: "17px" }}
                        />
                      )}
                  </TableCell>
                  <TableCell align="center">Veprimet</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {klientetFiltered.slice(start, end).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.zona}</TableCell>
                    <TableCell>{row.kategoria}</TableCell>
                    <TableCell>
                      <Button
                        size="medium"
                        style={{
                          backgroundColor: renderButtonColorsStatus(
                            row.status_user
                          ),
                          color: "white",
                          width: "100px",
                        }}
                      >
                        {" "}
                        {renderButtonStatus(row.status_user)}{" "}
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <div className="veprime" style={{ cursor: "pointer" }}>
                        <VisibilityOutlinedIcon
                          onClick={() => {
                            setUserDetails(row);
                            showUserDetailsPop(true);
                          }}
                        />
                        <EditOutlinedIcon
                          onClick={() => {
                            setUserEditPop(true);
                            setEditID(row.id);
                            setEditEmri(row.name);
                            setEditEmail(row.email);
                            setEditPassword(row.password);
                            setEditStatus(row.status_user);
                            setEditZona(row.zona);
                            setEditKategoria(row.kategoria);
                            setEditFile(row.image_profile);
                            setEditImage(row.image_profile);
                          }}
                        />
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
                  User ne faqe
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
                count={Math.ceil(klientetFiltered.length / itemPage)}
                color="primary"
                page={page}
                size="large"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
