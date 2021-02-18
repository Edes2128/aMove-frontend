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
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import AlertContext from "../../../context/alertContext/AlertContext";
import ShoppingBasketOutlinedIcon from "@material-ui/icons/ShoppingBasketOutlined";

export default function Porosite() {
  const alertContext = useContext(AlertContext);
  const klientConext = useContext(KlientContext);
  const { ordersSingleUser, products } = klientConext;
  const [orderDetails, showOrderDetails] = useState(false);
  const [orderDeletePop, setOrderDeletePop] = useState(false);
  const [resetActiveOrder, setActiveOrder] = useState(false);
  const [orderEditPop, setOrderEditPop] = useState(false);
  const [orderDeleteID, setOrderDeleteID] = useState("");
  const [orderContentDetails, setOrderDetailsContent] = useState([]);
  const [orderEditDetails, setEditOrderDetails] = useState([]);
  const [resetOrderID, setResetOrderID] = useState("");
  const [resetOrderKlientID, setResetKlientID] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [page, setPage] = useState(1);
  const [itemPage, setItempage] = useState(5);
  const start = (page - 1) * itemPage;
  const end = page * itemPage;
  const [propertyName, setProperty] = useState({
    key: "ID",
    direction: "descending",
  });
  const [disabledButton, setDisabledButton] = useState({});
  const ordersIDProdukt = orderEditDetails.map((order) => order.produktID);
  const [editOrderID, setEditOrderID] = useState("");
  const [editOrderKlientID, setEditOrderKlientID] = useState("");
  const filteredOrders = ordersSingleUser.filter(
    (order) =>
      order.ID.toString().toLowerCase().includes(searchFilter.toLowerCase()) ||
      order.orderDate
        .toString()
        .toLowerCase()
        .includes(searchFilter.toLowerCase()) ||
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
    klientConext.getAllProducts();
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const renderButtonStatus = (status) => {
    if (status === 1) {
      return "Aktive";
    } else if (status === 2) {
      return "Ne Pritje";
    } else if (status === 3) {
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
  const increaseQty = (produktID) => {
    const orders = [...orderEditDetails];
    const findProduct = orders.find((order) => order.produktID === produktID);
    findProduct.qty += 1;
    setEditOrderDetails(orders);
  };

  const decreaseQty = (produktID) => {
    const orders = [...orderEditDetails];
    const findProduct = orders.find((order) => order.produktID === produktID);
    findProduct.qty -= 1;
    setEditOrderDetails(orders);
  };
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const cmimetPorosise = orderEditDetails.map(
    (orders) => orders.qty * orders.cmimiProduktit
  );
  const totaliPorosise = cmimetPorosise.reduce(reducer, 0);

  return (
    <>
      {orderEditPop && (
        <div className="order-edit-pop">
          <div
            className="order-edit-pop-opa"
            onClick={() => {
              setOrderEditPop(false);
              setEditOrderDetails([]);
              klientConext.getAllOrders();
            }}
          ></div>
          <div className="order-edit-pop-container">
            <CloseOutlinedIcon
              onClick={() => {
                setOrderEditPop(false);
                setEditOrderDetails([]);
                klientConext.getAllOrders();
              }}
              style={{
                position: "absolute",
                top: "7px",
                right: "7px",
                fontSize: "26px",
                cursor: "pointer",
              }}
            />
            <div className="order-edit-pop-container-left">
              <h3 style={{ padding: "5px" }}>Produktet e porosise</h3>
              <div className="order-edit-pop-container-left-items">
                {orderEditDetails.map((order) => (
                  <div className="order-edit-pop-container-left-items-item">
                    <CloseOutlinedIcon
                      style={{
                        color: "red",
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        axios
                          .post(
                            `https://amove.alcodeit.com/delete_product_from_order.php?order_id=${order.ID}&produkt_id=${order.produkt_id}`
                          )
                          .then((res) => {
                            if (res.data.status === 1) {
                              setEditOrderDetails(
                                orderEditDetails.filter(
                                  (orders) =>
                                    orders.produktID !== order.produktID
                                )
                              );
                              axios
                                .get(
                                  `https://amove.alcodeit.com/get_orderDetails.php?klient=${order.klientID}&order_id=${order.ID}`
                                )
                                .then((res) => {
                                  setEditOrderDetails([]);
                                  setEditOrderDetails(res.data);
                                });
                              // klientConext.getAllOrders();
                              alertContext.setAlert(
                                `${res.data.message}`,
                                "success"
                              );
                            } else {
                              alertContext.setAlert(
                                `${res.data.message}`,
                                "error"
                              );
                            }
                          });
                      }}
                    />
                    <div className="order-edit-pop-container-left-items-item-image">
                      <img
                        src={`https://amove.alcodeit.com/images/${order.image}`}
                        alt={order.titulli}
                      />
                    </div>
                    <div className="order-edit-pop-container-left-items-item-titulli">
                      <h4>{order.titulli}</h4>
                      <p>Cmimi fillestar: {order.cmimiProduktit} Leke</p>
                      <div className="order-edit-pop-container-left-items-item-titulli-buttons">
                        <Button
                          color="primary"
                          variant="contained"
                          disabled={order.qty === 1 ? true : false}
                          onClick={() => {
                            decreaseQty(order.produktID);
                            klientConext.decreaseOrderQty(order);
                          }}
                        >
                          -
                        </Button>
                        <span> {order.qty} </span>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            increaseQty(order.produktID);
                            klientConext.increaseOrderQty(order);
                          }}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="order-edit-pop-container-left-items-item-totali">
                      <p>Totali: {order.cmimiProduktit * order.qty} Leke</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-edit-pop-container-left-totali">
                <p>Totali : {totaliPorosise} Leke </p>
              </div>
            </div>
            <div className="order-edit-pop-container-right">
              <h3>Produktet</h3>
              <div className="order-edit-pop-container-right-items">
                {products.map((product) => (
                  <div
                    className="order-edit-pop-container-right-items-item"
                    style={{
                      display: ordersIDProdukt.some(
                        (order) => (order === product.id) === true
                      )
                        ? "none"
                        : "",
                    }}
                  >
                    <div className="order-edit-pop-container-right-items-item-image">
                      <img
                        src={`https://amove.alcodeit.com/images/${product.image}`}
                        alt={product.titulli}
                      />
                    </div>
                    <div className="order-edit-pop-container-right-items-item-titulli">
                      <h3>{product.titulli}</h3>
                      <p> {product.pershkrimi} </p>
                    </div>
                    <div className="order-edit-pop-container-right-items-item-cmimi">
                      <p>Cmimi {product.cmimi} Leke</p>
                      <p>Stock: {product.sasia} </p>
                    </div>
                    <div className="order-edit-pop-container-right-items-item-button">
                      <Button
                        color="primary"
                        variant="contained"
                        disabled={disabledButton === product ? true : false}
                        onClick={(e) => {
                          setDisabledButton(product);
                          setTimeout(() => setDisabledButton({}), 1000);
                          axios
                            .post(
                              `https://amove.alcodeit.com/add_product_to_order.php`,
                              {
                                orderID: editOrderID,
                                cmimi: product.cmimi,
                                produktID: product.id,
                              }
                            )
                            .then((res) => {
                              if (res.data.status === 1) {
                                axios
                                  .get(
                                    `https://amove.alcodeit.com/get_orderDetails.php?klient=${editOrderKlientID}&order_id=${editOrderID}`
                                  )
                                  .then((res) => {
                                    setEditOrderDetails([]);
                                    setEditOrderDetails(res.data);
                                  });
                                // klientConext.getAllProducts();
                                // klientConext.getAllOrders();
                              }
                            });
                        }}
                      >
                        Shto ne porosi
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {resetActiveOrder && (
        <div className="order-resetActive-pop">
          <div
            className="order-resetActive-pop-opa"
            onClick={() => {
              setActiveOrder(false);
            }}
          ></div>
          <div className="order-resetActive-pop-container">
            <CloseOutlinedIcon
              onClick={() => {
                setActiveOrder(false);
              }}
              style={{
                position: "absolute",
                top: "7px",
                right: "7px",
                cursor: "pointer",
              }}
            />
            <h3>Doni te beni porosine aktive?</h3>
            <div className="order-resetActive-pop-container-buttons">
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  axios
                    .post(`https://amove.alcodeit.com/edit_order_status.php`, {
                      orderID: resetOrderID,
                      klientID: resetOrderKlientID,
                    })
                    .then((res) => {
                      if (res.data.status === 1) {
                        klientConext.getAllOrders();
                        setResetKlientID("");
                        setResetOrderID("");
                        setActiveOrder(false);
                        alertContext.setAlert(`${res.data.message}`, "success");
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
                  setResetKlientID("");
                  setResetOrderID("");
                  setActiveOrder(false);
                }}
              >
                Jo
              </Button>
            </div>
          </div>
        </div>
      )}

      {orderDeletePop && (
        <div className="order-delete-pop">
          <div
            className="order-delete-pop-opa"
            onClick={() => setOrderDeletePop(false)}
          ></div>

          <div className="order-delete-pop-container">
            <CloseOutlinedIcon
              onClick={() => setOrderDeletePop(false)}
              style={{
                cursor: "pointer",
                position: "absolute",
                right: "7px",
                top: "7px",
              }}
            />
            <p style={{ fontSize: "20px" }}>
              Jeni te sigurt qe doni te anulloni porosine?
            </p>
            <div className="order-delete-pop-container-buttons">
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  axios
                    .post(
                      `https://amove.alcodeit.com/cancel_order.php?order_id=${orderDeleteID}`
                    )
                    .then((res) => {
                      if (res.data.status === 1) {
                        setOrderDeletePop(false);
                        klientConext.getAllOrders();
                        alertContext.setAlert(`${res.data.message}`, "success");
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
                onClick={() => setOrderDeletePop(false)}
              >
                Jo
              </Button>
            </div>
          </div>
        </div>
      )}

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
        <div className="klient-porosite-header">
          <div className="klient-porosite-header-item">
            <div className="klient-porosite-header-item-left">
              <h3>Porosi Aktive</h3>
              <p style={{ fontWeight: "700", fontSize: "20px" }}>
                {" "}
                {
                  ordersSingleUser.filter((order) => order.status === 1).length
                }{" "}
              </p>
            </div>
            <div className="klient-porosite-header-item-right">
              <ShoppingBasketOutlinedIcon style={{ fontSize: "50px" }} />
            </div>
          </div>

          <div className="klient-porosite-header-item">
            <div className="klient-porosite-header-item-left">
              <h3>Porosi te Anulluara</h3>
              <p style={{ fontWeight: "700", fontSize: "20px" }}>
                {ordersSingleUser.filter((order) => order.status === 3).length}
              </p>
            </div>
            <div className="klient-porosite-header-item-right">
              <ShoppingBasketOutlinedIcon style={{ fontSize: "50px" }} />
            </div>
          </div>

          <div className="klient-porosite-header-item">
            <div className="klient-porosite-header-item-left">
              <h3>Porosi ne Pritje</h3>
              <p style={{ fontWeight: "700", fontSize: "20px" }}>
                {ordersSingleUser.filter((order) => order.status === 2).length}
              </p>
            </div>
            <div className="klient-porosite-header-item-right">
              <ShoppingBasketOutlinedIcon style={{ fontSize: "50px" }} />
            </div>
          </div>

          <div className="klient-porosite-header-item">
            <div className="klient-porosite-header-item-left">
              <h3>Porosi te Perfunduara</h3>
              <p style={{ fontWeight: "700", fontSize: "20px" }}>
                {ordersSingleUser.filter((order) => order.status === 4).length}
              </p>
            </div>
            <div className="klient-porosite-header-item-right">
              <ShoppingBasketOutlinedIcon style={{ fontSize: "50px" }} />
            </div>
          </div>
        </div>

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

          {filteredOrders.length === 0 ? (
            <div
              className="klient-produkte-search-notfound"
              style={{ justifyContent: "center" }}
            >
              <img src="/search_notfound.gif" alt="" />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <h3>Nuk u gjet asnje porosi nga kerkimi😥</h3>
                <p style={{ fontSize: "17px" }}>Provoni perseri!</p>
              </div>
            </div>
          ) : (
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
                        <ArrowDownwardOutlinedIcon
                          style={{ fontSize: "17px" }}
                        />
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
                        <ArrowDownwardOutlinedIcon
                          style={{ fontSize: "17px" }}
                        />
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
                        <ArrowDownwardOutlinedIcon
                          style={{ fontSize: "17px" }}
                        />
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
                        <ArrowDownwardOutlinedIcon
                          style={{ fontSize: "17px" }}
                        />
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
                        {order.status === 3 ? (
                          <EditOutlinedIcon
                            onClick={() => {
                              setActiveOrder(true);
                              setResetOrderID(order.ID);
                              setResetKlientID(order.klientID);
                            }}
                            style={{
                              display:
                                order.status === 2 || order.status === 4
                                  ? "none"
                                  : "",
                            }}
                          />
                        ) : (
                          <EditOutlinedIcon
                            onClick={() => {
                              setEditOrderID(order.ID);
                              setEditOrderKlientID(order.klientID);
                              setOrderEditPop(true);
                              axios
                                .get(
                                  `https://amove.alcodeit.com/get_orderDetails.php?klient=${order.klientID}&order_id=${order.ID}`
                                )
                                .then((res) => setEditOrderDetails(res.data));
                            }}
                            style={{
                              display:
                                order.status === 2 || order.status === 4
                                  ? "none"
                                  : "",
                            }}
                          />
                        )}

                        <DeleteOutlineOutlinedIcon
                          style={{
                            display:
                              order.status === 3 ||
                              order.status === 2 ||
                              order.status === 4
                                ? "none"
                                : "",
                          }}
                          onClick={() => {
                            setOrderDeletePop(true);
                            setOrderDeleteID(order.ID);
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          <div
            className="pagination"
            style={{ display: filteredOrders.length === 0 ? "none" : "" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <InputLabel style={{ marginRight: "10px" }} id="row">
                Porosi ne faqe
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
