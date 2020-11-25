import React, { useState, useEffect } from "react";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import Pagination from "@material-ui/lab/Pagination";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

export default function Porosite() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [itemPage, setItempage] = useState(5);
  const start = (page - 1) * itemPage;
  const end = page * itemPage;

  useEffect(() => {
    axios
      .get("http://localhost/demo_react_server/api/config/getAll_orders.php")
      .then((res) => setOrders(res.data));
  }, []);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const renderButtonStatus = (status) => {
    if (status == 1) {
      return "Aktive";
    } else if (status == 2) {
      return "Ne Pritje";
    } else if (status == 3) {
      return "Anulluar";
    } else {
      return "Perfunduar";
    }
  };

  const renderButtonColorsStatus = (status) => {
    if (status == 1) {
      return "green";
    } else if (status == 2) {
      return "yellow";
    } else if (status == 3) {
      return "red";
    } else {
      return "purple";
    }
  };

  return (
    <>
      <div className="porosite-header">
        <div className="porosite-header-item">
          <div className="porosite-header-item-left">
            <p>Porosi sot</p>
            <h2>138</h2>
            <p>1/04/2020</p>
          </div>
          <div className="porosite-header-item-right">
            <LocalMallOutlinedIcon style={{ fontSize: "40px" }} />
          </div>
        </div>

        <div className="porosite-header-item">
          <div className="porosite-header-item-left">
            <p>Porosi sot</p>
            <h2>138</h2>
            <p>1/04/2020</p>
          </div>
          <div className="porosite-header-item-right">
            <LocalMallOutlinedIcon style={{ fontSize: "40px" }} />
          </div>
        </div>

        <div className="porosite-header-item">
          <div className="porosite-header-item-left">
            <p>Porosi sot</p>
            <h2>138</h2>
            <p>1/04/2020</p>
          </div>
          <div className="porosite-header-item-right">
            <LocalMallOutlinedIcon style={{ fontSize: "40px" }} />
          </div>
        </div>

        <div className="porosite-header-item">
          <div className="porosite-header-item-left">
            <p>Porosi sot</p>
            <h2>138</h2>
            <p>1/04/2020</p>
          </div>
          <div className="porosite-header-item-right">
            <LocalMallOutlinedIcon style={{ fontSize: "40px" }} />
          </div>
        </div>

        <div className="porosite-header-item">
          <div className="porosite-header-item-left">
            <p>Porosi sot</p>
            <h2>138</h2>
            <p>1/04/2020</p>
          </div>
          <div className="porosite-header-item-right">
            <LocalMallOutlinedIcon style={{ fontSize: "40px" }} />
          </div>
        </div>
      </div>

      <div className="porosite-data-table">
        <div className="porosite-data-table-header">
          <h2>Porosite</h2>
          <div className="porosite-data-table-buttons">
            <TextField
              variant="outlined"
              size="small"
              label="Kerko"
              placeholder="Kerko..."
            />
            <Button startIcon={<AddIcon />} color="primary" variant="contained">
              Shto Porosi
            </Button>
          </div>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Emri</TableCell>
              <TableCell align="left">Data</TableCell>
              <TableCell align="left">Zona</TableCell>
              <TableCell align="left">Vlera</TableCell>
              <TableCell align="left">Porosia</TableCell>
              <TableCell align="center">Veprimet</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.slice(start, end).map((order) => (
              <TableRow key={order.ID}>
                <TableCell> {order.ID} </TableCell>
                <TableCell> {order.klient_emer} </TableCell>
                <TableCell> {order.order_date} </TableCell>
                <TableCell> {order.klient_zona} </TableCell>
                <TableCell> {order.total_price} Leke </TableCell>
                <TableCell>
                  <Button
                    size="medium"
                    style={{
                      backgroundColor: renderButtonColorsStatus(
                        order.order_status
                      ),
                      color: "white",
                    }}
                  >
                    {" "}
                    {renderButtonStatus(order.order_status)}{" "}
                  </Button>
                </TableCell>

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
            count={Math.ceil(orders.length / itemPage)}
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
