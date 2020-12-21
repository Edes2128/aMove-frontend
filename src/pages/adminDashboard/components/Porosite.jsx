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

export default function Porosite() {
  const [orderDetails, showOrderDetails] = useState(false);
  const [orderContentDetails, setOrderDetailsContent] = useState([]);
  const [page, setPage] = useState(1);
  const [itemPage, setItempage] = useState(5);
  const start = (page - 1) * itemPage;
  const end = page * itemPage;
  const depoContext = useContext(DepoContext);
  const { porosite } = depoContext;
  const [propertyName,setProperty] = useState(null);
  
if(propertyName !== null){
    porosite.sort((a,b) => {

        if( a[propertyName] < b[propertyName] ){

            return -1;
        }
        if(a[propertyName] > b[propertyName]){
            return 1;
        }
        return 0;
    })
}
  useEffect(() => {
    depoContext.getAllOrders();
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
                    src={`https://192.168.88.250/demo_react_server/images/${order.image}`}
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
            <h2> {(porosite.filter(porosi => porosi.order_status === 1)).length} </h2>
            <p></p>
          </div>
          <div className="porosite-header-item-right">
            <LocalMallOutlinedIcon style={{ fontSize: "40px" }} />
          </div>
        </div>

        <div className="porosite-header-item">
          <div className="porosite-header-item-left">
            <p>Porosi ne pritje</p>
            <h2> {(porosite.filter(porosi => porosi.order_status === 2)).length} </h2>
            <p></p>
          </div>
          <div className="porosite-header-item-right">
            <LocalMallOutlinedIcon style={{ fontSize: "40px" }} />
          </div>
        </div>

        <div className="porosite-header-item">
          <div className="porosite-header-item-left">
            <p>Porosi te anulluara</p>
            <h2> {(porosite.filter(porosi => porosi.order_status === 3)).length} </h2>
            <p></p>
          </div>
          <div className="porosite-header-item-right">
            <LocalMallOutlinedIcon style={{ fontSize: "40px" }} />
          </div>
        </div>

        <div className="porosite-header-item">
          <div className="porosite-header-item-left">
            <p>Porosi te perfunduara</p>
            <h2> {(porosite.filter(porosi => porosi.order_status === 4)).length} </h2>
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
              <TableCell onClick={() => setProperty('ID')} >ID</TableCell>
              <TableCell align="left" onClick={() => setProperty('klient_emer')} >Emri</TableCell>
              <TableCell align="left" onClick={() => setProperty('order_date')} >Data</TableCell>
              <TableCell align="left" onClick={() => setProperty('klient_zona')} >Zona</TableCell>
              <TableCell align="left" onClick={() => setProperty('total_price')} >Vlera</TableCell>
              <TableCell align="left" onClick={() => setProperty('order_status')} >Porosia</TableCell>
              <TableCell align="center">Veprimet</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {porosite.slice(start, end).sort().map((order) => (
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
                    <VisibilityOutlinedIcon
                      onClick={() => {
                        showOrderDetails(true);
                        axios
                          .get(
                            `https://192.168.88.250/demo_react_server/api/config/get_orderDetails.php?klient=${order.klient_id}&order_id=${order.ID}`
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
            count={Math.ceil(porosite.length / itemPage)}
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
