import React, { useState, useEffect, useContext } from "react";
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
import DepoContext from "../../../context/depoContext/DepoContext";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import AlertContext from "../../../context/alertContext/AlertContext";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

export default function Porosite() {
  useEffect(() => {
    depoContext.getAllOrders();
    depoContext.getAllProducts();
  }, []);

  const depoContext = useContext(DepoContext);
  const alertContext = useContext(AlertContext);
  const { porosite, produktet } = depoContext;
  const [ordersDetails, setOrdersDetails] = useState([]);
  const orderDetailsProduktID = ordersDetails.map((order) => order.produkt_id);
  const [editOrderPop, setEditOrderPop] = useState(false);
  const [orderDetailss, showOrderDetails] = useState(false);
  const [deletePop, showDeletePop] = useState(false);
  const [resetOrderPop, setResetOrderPop] = useState(false);
  const [idDelete, setDeleteId] = useState("");
  const [orderContentDetails, setOrderDetailsContent] = useState([]);
  const [klientIDOrder, setKlientIDOrder] = useState("");
  const [orderID, setOrderID] = useState("");
  const [page, setPage] = useState(1);
  const [itemPage, setItempage] = useState(5);
  const start = (page - 1) * itemPage;
  const end = page * itemPage;
  const [propertyName, setProperty] = useState({
    key: "order_date",
    direction: "descending",
  });
  const [disabledButton, setDisabledButton] = useState({});

  const order2 = {
    klientID: klientIDOrder,
    ID: orderID,
  };

  const [searchFilter, setSearchFilter] = useState("");
  const filteredOrder = porosite.filter(
    (order) =>
      order.ID.toString().toLowerCase().includes(searchFilter.toLowerCase()) ||
      order.klient_emer.toLowerCase().includes(searchFilter.toLowerCase()) ||
      order.order_date.toLowerCase().includes(searchFilter.toLowerCase()) ||
      order.klient_zona.toLowerCase().includes(searchFilter.toLowerCase()) ||
      order.total_price
        .toString()
        .toLowerCase()
        .includes(searchFilter.toLowerCase())
  );

  if (propertyName !== null) {
    filteredOrder.sort((a, b) => {
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
      return "#3ccc38";
    } else if (status === 2) {
      return "#FECD2F";
    } else if (status === 3) {
      return "#fd3259";
    } else {
      return "#6569df";
    }
  };
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const cmimetPorosise = ordersDetails.map(
    (orders) => orders.qty * orders.cmimiProduktit
  );
  const totaliPorosise = cmimetPorosise.reduce(reducer, 0);

  const increaseQty = (produktID) => {
    const orders = [...ordersDetails];
    const findProduct = orders.find((order) => order.produktID === produktID);
    findProduct.qty += 1;
    setOrdersDetails(orders);
  };

  const decreaseQty = (produktID) => {
    const orders = [...ordersDetails];
    const findProduct = orders.find((order) => order.produktID === produktID);
    findProduct.qty -= 1;
    setOrdersDetails(orders);
  };

  return (
    <>
      {resetOrderPop && (
        <div className="reset-order-pop">
          <div
            className="reset-order-pop-opa"
            onClick={() => {
              setResetOrderPop(false);
              setOrderID("");
              setKlientIDOrder("");
            }}
          ></div>
          <div className="reset-order-pop-container">
            <CloseOutlinedIcon
              style={{
                position: "absolute",
                top: "7px",
                right: "7px",
                cursor: "pointer",
              }}
              onClick={() => {
                setResetOrderPop(false);
                setOrderID("");
                setKlientIDOrder("");
              }}
            />
            <h3>Deshironi te beni porosine aktive?</h3>
            <div className="reset-order-pop-container-buttons">
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  axios
                    .post("https://amove.alcodeit.com/edit_order_status.php", {
                      orderID: orderID,
                      klientID: klientIDOrder,
                    })
                    .then((res) => {
                      if (res.data.status === 1) {
                        setResetOrderPop(false);
                        setOrderID("");
                        setKlientIDOrder("");
                        depoContext.getAllOrders();
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
                  setResetOrderPop(false);
                  setOrderID("");
                  setKlientIDOrder("");
                }}
              >
                Jo
              </Button>
            </div>
          </div>
        </div>
      )}

      {editOrderPop && (
        <div className="edit-order-pop">
          <div
            className="edit-order-pop-opa"
            onClick={() => {
              setEditOrderPop(false);
              setOrdersDetails([]);
              depoContext.emptyOrderDetails();
              depoContext.getAllOrders();
            }}
          ></div>
          <div className="edit-order-pop-container">
            <CloseOutlinedIcon
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                fontSize: "25px",
                cursor: "pointer",
              }}
              onClick={() => {
                setEditOrderPop(false);
                setOrdersDetails([]);
                depoContext.emptyOrderDetails();
                depoContext.getAllOrders();
              }}
            />
            <div className="edit-order-pop-container-left">
              <h3>Produktet e porosise</h3>
              <div className="edit-order-pop-container-left-items">
                {ordersDetails.map((order) => (
                  <div
                    className="edit-order-pop-container-item"
                    key={order.sku}
                  >
                    <div className="edit-order-pop-container-item-image">
                      <img
                        src={`https://amove.alcodeit.com/images/${order.image}`}
                        alt=""
                      />
                    </div>
                    <div className="edit-order-pop-cotainer-item-titulli-buttons">
                      <div className="edit-order-pop-item-titulli">
                        <h4> {order.titulli} </h4>
                        <h5> Cmimi fillestar : {order.cmimiProduktit} Leke </h5>
                      </div>
                      <div className="edit-order-pop-item-buttons">
                        <Button
                          color="primary"
                          size="small"
                          variant="contained"
                          disabled={order.qty === 1 ? true : false}
                          onClick={() => {
                            decreaseQty(order.produktID);
                            depoContext.decreaseOrderQty(order);
                          }}
                        >
                          {" "}
                          -{" "}
                        </Button>

                        <p> {order.qty} </p>

                        <Button
                          color="primary"
                          size="small"
                          variant="contained"
                          disabled={order.qty === order.sasia ? true : false}
                          onClick={() => {
                            increaseQty(order.produktID);
                            depoContext.increaseOrderQty(order);
                          }}
                        >
                          {" "}
                          +{" "}
                        </Button>
                      </div>
                    </div>
                    <div className="edit-order-pop-container-item-cmimi">
                      <CloseOutlinedIcon
                        style={{
                          color: "red",
                          alignSelf: "flex-end",
                          justifySelf: "flex-end",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          axios
                            .post(
                              `https://amove.alcodeit.com/delete_product_from_order.php?order_id=${order.ID}&produkt_id=${order.produkt_id}`
                            )
                            .then((res) => {
                              if (res.data.status === 1) {
                                setOrdersDetails(
                                  ordersDetails.filter(
                                    (orders) =>
                                      orders.produktID !== order.produktID
                                  )
                                );
                                axios
                                  .get(
                                    `https://amove.alcodeit.com/get_orderDetails.php?klient=${order2.klientID}&order_id=${order2.ID}`
                                  )
                                  .then((res) => {
                                    setOrdersDetails([]);
                                    setOrdersDetails(res.data);
                                  });
                                // depoContext.getAllOrders();
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
                      <h5> Totali : {order.qty * order.cmimiProduktit} </h5>
                    </div>
                  </div>
                ))}
              </div>
              <div className="edit-order-pop-container-left-totali">
                <h2> Totali i porosise: {totaliPorosise} </h2>
              </div>
            </div>
            <div className="edit-order-pop-container-right">
              <h3>Produktet</h3>
              <div className="edit-order-pop-container-right-items">
                {produktet.map((produkt) => (
                  <>
                    <div
                      className="edit-order-pop-container-right-items-item"
                      key={produkt.titulli}
                      style={{
                        display:
                          orderDetailsProduktID.some(
                            (order) => order === produkt.id
                          ) === true
                            ? "none"
                            : "",
                      }}
                    >
                      <div className="edit-order-pop-container-right-items-item-image">
                        <img
                          src={`https://amove.alcodeit.com/images/${produkt.image}`}
                          alt=""
                        />
                      </div>

                      <div className="edit-order-pop-container-right-items-item-titulli-buttons">
                        <div className="edit-order-pop-container-right-items-item-titulli">
                          <h3>{produkt.titulli}</h3>
                          <p> {produkt.pershkrimi} </p>
                        </div>
                        <div className="edit-order-pop-container-right-items-item-buttons">
                          <Button
                            startIcon={<AddShoppingCartIcon />}
                            size="medium"
                            color="primary"
                            variant="contained"
                            disabled={disabledButton === produkt ? true : false}
                            onClick={(e) => {
                              setDisabledButton(produkt);
                              setTimeout(() => setDisabledButton({}), 2000);
                              axios
                                .post(
                                  `https://amove.alcodeit.com/add_product_to_order.php`,
                                  {
                                    orderID,
                                    cmimi: produkt.cmimi,
                                    produktID: produkt.id,
                                  }
                                )
                                .then((res) => {
                                  if (res.data.status === 1) {
                                    axios
                                      .get(
                                        `https://amove.alcodeit.com/get_orderDetails.php?klient=${order2.klientID}&order_id=${order2.ID}`
                                      )
                                      .then((res) => {
                                        setOrdersDetails([]);
                                        setOrdersDetails(res.data);
                                      });
                                    // depoContext.getAllProducts();
                                    // depoContext.getAllOrders();
                                  }
                                });
                            }}
                          >
                            {" "}
                            Shto tek porosite{" "}
                          </Button>
                        </div>
                      </div>
                      <div className="edit-order-right-items-item-cmimi">
                        <h4>Cmimi: {produkt.cmimi} Leke</h4>
                        <h4>Stock: {produkt.sasia} </h4>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {deletePop && (
        <div className="delete-pop">
          <div
            className="delete-pop-opa"
            onClick={() => {
              showDeletePop(false);
              alertContext.setAlert("Porosia nuk u anullua!", "info");
            }}
          ></div>
          <div className="delete-pop-container">
            <h3>Jeni te sigurt qe doni te anulloni porosine?</h3>
            <div className="delete-pop-buttons">
              <Button
                className="btn-delete-opa"
                variant="contained"
                onClick={() => {
                  depoContext.cancelOrder(idDelete);
                  alertContext.setAlert("Porosia u anullua!", "warning");
                  showDeletePop(false);
                }}
              >
                Po
              </Button>
              <Button
                onClick={() => {
                  showDeletePop(false);
                  alertContext.setAlert("Porosia nuk u anullua!", "info");
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
      {orderDetailss && (
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
      <div className="porosite-header">
        <div className="porosite-header-item">
          <div className="porosite-header-item-left">
            <p>Porosi gjithsej</p>
            <h2> {porosite.length} </h2>
            <p></p>
          </div>
          <div className="porosite-header-item-right">
            <LocalMallOutlinedIcon style={{ fontSize: "40px" }} />
          </div>
        </div>

        <div className="porosite-header-item">
          <div className="porosite-header-item-left">
            <p>Porosi aktive</p>
            <h2>
              {" "}
              {
                porosite.filter((porosi) => porosi.order_status === 1).length
              }{" "}
            </h2>
            <p></p>
          </div>
          <div className="porosite-header-item-right">
            <LocalMallOutlinedIcon style={{ fontSize: "40px" }} />
          </div>
        </div>

        <div className="porosite-header-item">
          <div className="porosite-header-item-left">
            <p>Porosi ne pritje</p>
            <h2>
              {" "}
              {
                porosite.filter((porosi) => porosi.order_status === 2).length
              }{" "}
            </h2>
            <p></p>
          </div>
          <div className="porosite-header-item-right">
            <LocalMallOutlinedIcon style={{ fontSize: "40px" }} />
          </div>
        </div>

        <div className="porosite-header-item">
          <div className="porosite-header-item-left">
            <p>Porosi te anulluara</p>
            <h2>
              {" "}
              {
                porosite.filter((porosi) => porosi.order_status === 3).length
              }{" "}
            </h2>
            <p></p>
          </div>
          <div className="porosite-header-item-right">
            <LocalMallOutlinedIcon style={{ fontSize: "40px" }} />
          </div>
        </div>

        <div className="porosite-header-item">
          <div className="porosite-header-item-left">
            <p>Porosi te perfunduara</p>
            <h2>
              {" "}
              {
                porosite.filter((porosi) => porosi.order_status === 4).length
              }{" "}
            </h2>
            <p></p>
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
              type="search"
              size="small"
              label="Kerko"
              placeholder="Kerko..."
              onChange={(e) => setSearchFilter(e.target.value)}
            />
            <Button
              startIcon={<AddIcon />}
              color="primary"
              variant="contained"
              style={{
                backgroundColor: "#2A7EBF",
                borderRadius: "8px",
                padding: "10px 20px",
              }}
            >
              Shto Porosi
            </Button>
          </div>
        </div>

        {filteredOrder.length === 0 ? (
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
                <TableCell onClick={() => requestSort("ID")}>
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
                  align="left"
                  onClick={() => requestSort("klient_emer")}
                >
                  Emri
                  {propertyName.key === "klient_emer" &&
                    propertyName.direction === "ascending" && (
                      <ArrowUpwardOutlinedIcon style={{ fontSize: "17px" }} />
                    )}
                  {propertyName.key === "klient_emer" &&
                    propertyName.direction === "descending" && (
                      <ArrowDownwardOutlinedIcon style={{ fontSize: "17px" }} />
                    )}
                </TableCell>
                <TableCell
                  align="left"
                  onClick={() => requestSort("order_date")}
                >
                  Data
                  {propertyName.key === "order_date" &&
                    propertyName.direction === "ascending" && (
                      <ArrowUpwardOutlinedIcon style={{ fontSize: "17px" }} />
                    )}
                  {propertyName.key === "order_date" &&
                    propertyName.direction === "descending" && (
                      <ArrowDownwardOutlinedIcon style={{ fontSize: "17px" }} />
                    )}
                </TableCell>
                <TableCell
                  align="left"
                  onClick={() => requestSort("klient_zona")}
                >
                  Zona
                  {propertyName.key === "klient_zona" &&
                    propertyName.direction === "ascending" && (
                      <ArrowUpwardOutlinedIcon style={{ fontSize: "17px" }} />
                    )}
                  {propertyName.key === "klient_zona" &&
                    propertyName.direction === "descending" && (
                      <ArrowDownwardOutlinedIcon style={{ fontSize: "17px" }} />
                    )}
                </TableCell>
                <TableCell
                  align="left"
                  onClick={() => requestSort("total_price")}
                >
                  Vlera
                  {propertyName.key === "total_price" &&
                    propertyName.direction === "ascending" && (
                      <ArrowUpwardOutlinedIcon style={{ fontSize: "17px" }} />
                    )}
                  {propertyName.key === "total_price" &&
                    propertyName.direction === "descending" && (
                      <ArrowDownwardOutlinedIcon style={{ fontSize: "17px" }} />
                    )}
                </TableCell>
                <TableCell
                  align="left"
                  onClick={() => requestSort("order_status")}
                >
                  Porosia
                  {propertyName.key === "order_status" &&
                    propertyName.direction === "ascending" && (
                      <ArrowUpwardOutlinedIcon style={{ fontSize: "17px" }} />
                    )}
                  {propertyName.key === "order_status" &&
                    propertyName.direction === "descending" && (
                      <ArrowDownwardOutlinedIcon style={{ fontSize: "17px" }} />
                    )}
                </TableCell>
                <TableCell align="center">Veprimet</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredOrder.slice(start, end).map((order) => (
                <TableRow key={order.ID}>
                  <TableCell style={{ color: "#287DBF" }}>
                    #{order.ID}{" "}
                  </TableCell>
                  <TableCell> {order.klient_emer} </TableCell>
                  <TableCell> {order.order_date} </TableCell>
                  <TableCell> {order.klient_zona} </TableCell>
                  <TableCell> {order.total_price} Leke </TableCell>
                  <TableCell>
                    <p className="status-text">
                      {" "}
                      <span
                        className="status-pulse"
                        style={{
                          backgroundColor: renderButtonColorsStatus(
                            order.order_status
                          ),
                        }}
                      ></span>{" "}
                      {renderButtonStatus(order.order_status)}{" "}
                    </p>
                  </TableCell>

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
                      {order.order_status === 3 ? (
                        <EditOutlinedIcon
                          onClick={() => {
                            setResetOrderPop(true);
                            setOrderID(order.ID);
                            setKlientIDOrder(order.klientID);
                          }}
                        />
                      ) : (
                        <EditOutlinedIcon
                          onClick={() => {
                            setEditOrderPop(true);
                            depoContext.getOrderDetails(order);
                            axios
                              .get(
                                `https://amove.alcodeit.com/get_orderDetails.php?klient=${order.klientID}&order_id=${order.ID}`
                              )
                              .then((res) => {
                                setOrdersDetails(res.data);
                              });
                            setOrderID(order.ID);
                            setKlientIDOrder(order.klientID);
                          }}
                        />
                      )}

                      <DeleteOutlineOutlinedIcon
                        onClick={() => {
                          showDeletePop(true);
                          setDeleteId(order.ID);
                        }}
                        style={{
                          display: order.order_status === 3 ? "none" : "",
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
          style={{ display: filteredOrder.length === 0 ? "none" : "flex" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <InputLabel style={{ marginRight: "10px" }} id="row">
              Porosi ne faqe
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
            count={Math.ceil(filteredOrder.length / itemPage)}
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
