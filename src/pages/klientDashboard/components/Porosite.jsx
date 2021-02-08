import React, { useState, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import AddShoppingCartOutlinedIcon from "@material-ui/icons/AddShoppingCartOutlined";
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
import KlientContext from "../../../context/klientContext/KlientContext";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";

export default function Porosite() {
  const klientConext = useContext(KlientContext);
  const { ordersSingleUser } = klientConext;
  const [orderDetails, showOrderDetails] = useState(false);
  const [orderContentDetails, setOrderDetailsContent] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [page, setPage] = useState(1);
  const [itemPage, setItempage] = useState(5);
  const start = (page - 1) * itemPage;
  const end = page * itemPage;
  const [propertyName, setProperty] = useState({
    key: "ID",
    direction: "descending",
  });

  const filteredOrders = ordersSingleUser.filter(
    (order) =>
      order.ID.toString().toLowerCase().includes(searchFilter.toLowerCase()) ||
      order.orderDate.toString().toLowerCase().includes(searchFilter.toLowerCase()) ||
      order.totali.toString().toLowerCase().includes(searchFilter.toLowerCase())
  );

  
  if (propertyName !== null) {
    filteredOrders.sort((a, b) => {
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

  useEffect(() => {
    klientConext.getAllOrders();
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
    if (status === 1) {
      return "#73C850";
    } else if (status === 3) {
      return "#FF0000";
    }
  };

  return (
    <>
      {orderDetails && (
        <div className="order-details-pop">
          <div
            className="order-details-pop-opa"
            onClick={() => {
              showOrderDetails(false);
              setOrderDetailsContent([]);
            }}
          ></div>
          <div className="order-details-pop-content">
            {orderContentDetails.map((order) => (
              <div className="order-details-pop-content-item" key={order.ID}>
                <div className="order-details-pop-content-item-image">
                  <img
                    src={`https://amove.alcodeit.com/images/${order.image}`}
                    alt=""
                  />
                </div>
                <div className="order-details-pop-content-item-title">
                  <h2> {order.titulli} </h2>
                  <p> {order.pershkrimi} </p>
                </div>
                <div className="order-details-pop-content-item-price">
                  <h3> {order.cmimiProduktit} Leke</h3>
                  <p>Sasia: {order.qty} </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="klient-porosite">
        <h2>Porosite e mia</h2>

        <div className="klient-porosite-data-table">
          <div className="klient-porosite-data-table-header">
            <TextField
              style={{ marginRight: "30px" }}
              variant="outlined"
              placeholder="Kerko..."
              label="Kerko"
              size="small"
              type="search"
              onChange={(e) => setSearchFilter(e.target.value)}
            />
            <Link
              to="/klient/shporta"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Button
                startIcon={<AddShoppingCartOutlinedIcon />}
                variant="contained"
                color="primary"
              >
                {" "}
                Shto Porosi{" "}
              </Button>
            </Link>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ cursor: "pointer" }}
                  onClick={() => requestSort("ID")}
                >
                  ID
                  {propertyName.key === "ID" &&
                    propertyName.direction === "ascending" && (
                      <ArrowUpwardOutlinedIcon style={{ fontSize: "17px" }} />
                    )}
                  {propertyName.key === "ID" &&
                    propertyName.direction === "descending" && (
                      <ArrowDownwardOutlinedIcon style={{ fontSize: "17px" }} />
                    )}
                </TableCell>
                <TableCell
                  style={{ cursor: "pointer" }}
                  onClick={() => requestSort("orderDate")}
                  align="left"
                >
                  Data
                  {propertyName.key === "orderDate" &&
                    propertyName.direction === "ascending" && (
                      <ArrowUpwardOutlinedIcon style={{ fontSize: "17px" }} />
                    )}
                  {propertyName.key === "orderDate" &&
                    propertyName.direction === "descending" && (
                      <ArrowDownwardOutlinedIcon style={{ fontSize: "17px" }} />
                    )}
                </TableCell>
                <TableCell
                  style={{ cursor: "pointer" }}
                  onClick={() => requestSort("status")}
                  align="left"
                >
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
                <TableCell
                  style={{ cursor: "pointer" }}
                  onClick={() => requestSort("totali")}
                  align="left"
                >
                  Totali
                  {propertyName.key === "totali" &&
                    propertyName.direction === "ascending" && (
                      <ArrowUpwardOutlinedIcon style={{ fontSize: "17px" }} />
                    )}
                  {propertyName.key === "totali" &&
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
              {filteredOrders.slice(start, end).map((order) => (
                <TableRow>
                  <TableCell> {order.ID} </TableCell>
                  <TableCell> {order.orderDate} </TableCell>
                  <TableCell>
                    <p className="status-text">
                      {" "}
                      <span
                        className="status-pulse"
                        style={{
                          backgroundColor: renderButtonColorsStatus(
                            order.status
                          ),
                        }}
                      ></span>{" "}
                      {renderButtonStatus(order.status)}{" "}
                    </p>
                  </TableCell>
                  <TableCell> {order.totali} Leke </TableCell>
                  <TableCell align="center">
                    <div className="veprime" style={{ cursor: "pointer" }}>
                      <VisibilityOutlinedIcon
                        onClick={() => {
                          showOrderDetails(true);
                          axios
                            .get(
                              `https://amove.alcodeit.com/get_orderDetails.php?klient=${order.klientID}&order_id=${order.ID}`
                            )
                            .then((res) => setOrderDetailsContent(res.data));
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
              count={Math.ceil(ordersSingleUser.length / itemPage)}
              color="primary"
              page={page}
              size="large"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
