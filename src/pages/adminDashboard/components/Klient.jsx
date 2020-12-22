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

export default function Klient() {
  const [userPopup, shotUserPopup] = useState(false);
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
  useEffect(() => {
    depoContext.getAllClients();
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <>
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
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Emri</TableCell>
                  <TableCell width="300px" align="left">
                    Email
                  </TableCell>
                  <TableCell align="left">Zona</TableCell>
                  <TableCell align="left">Kategoria</TableCell>
                  <TableCell align="center">Veprimet</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {klientet.slice(start, end).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.zona}</TableCell>
                    <TableCell>{row.kategoria}</TableCell>

                    <TableCell align="center">
                      <div className="veprime" style={{ cursor: "pointer" }}>
                        <VisibilityOutlinedIcon
                          onClick={() => {
                            setUserDetails(row);
                            showUserDetailsPop(true);
                          }}
                        />
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
                count={Math.ceil(klientet.length / itemPage)}
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
