import React, { useContext, useState } from "react";
import KlientContext from "./../../../context/klientContext/KlientContext";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import Alert from "@material-ui/lab/Alert";

export default function Shporta() {
  const klientContext = useContext(KlientContext);
  const { cartProducts } = klientContext;
  const cmimet = cartProducts.map((item) => item.cmimi);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const [snackbar, showSnackbar] = useState(false);

  const handleClose = () => {
    showSnackbar(false);
  };

  return (
    <>
      {cartProducts.length > 0 ? (
        <h1 style={{ marginLeft: "60px" }}>Shporta</h1>
      ) : (
        ""
      )}
      <div className="shporta">
        {cartProducts.length > 0 ? (
          <>
            <div className="shporta-items">
              <div className="shporta-items-content">
                {cartProducts.map((item) => (
                  <div className="shporta-item" key={item.id}>
                    <div className="shporta-item-image">
                      <img
                        src={`https://192.168.88.250/demo_react_server/images/${item.image}`}
                        alt=""
                      />
                    </div>
                    <div className="shporta-item-center">
                      <div className="shporta-item-center-title">
                        <h3> {item.titulli} </h3>
                        <p> {item.sasia > 0 ? "In Stock" : "Ska Stock"} </p>
                      </div>
                      <div className="shporta-item-center-quantity">
                        <h3>Sasia</h3>
                        <div className="shporta-item-quantity">
                          <Button
                            color="primary"
                            variant="contained"
                            style={{ width: "10%" }}
                            onClick={() => klientContext.decreaseQty(item)}
                            disabled={item.qty === 1 ? true : false}
                          >
                            -
                          </Button>
                          <p> {item.qty} </p>
                          <Button
                            color="primary"
                            variant="contained"
                            style={{ width: "10%" }}
                            onClick={() => klientContext.increaseQty(item)}
                            disabled={item.qty === item.sasia ? true : false}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="shporta-item-right">
                      <p> {item.cmimi} Leke </p>
                      <Button
                        startIcon={<CloseIcon />}
                        variant="contained"
                        onClick={() => {
                          klientContext.removeFromCart(item);
                          klientContext.editQtySinlge(item);
                        }}
                        style={{ marginTop: "20px" }}
                      >
                        {" "}
                        Hiqe nga Shporta
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="shporta-checkout">
              <div className="shporta-checkout-content">
                <h2>Totali:</h2>
                <p> {cmimet.reduce(reducer)} Leke</p>
                <Button
                  variant="outlined"
                  size="large"
                  color="primary"
                  onClick={() => {
                    klientContext.makeOrder(
                      cartProducts,
                      cmimet.reduce(reducer)
                    );
                    showSnackbar(true);
                  }}
                >
                  {" "}
                  Porosit{" "}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-shop">
            <h2>Shporta eshte bosh</h2>
            <Link
              to="/klient/produktet"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Button color="primary" variant="outlined">
                Shiko produktet
              </Button>
            </Link>
          </div>
        )}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={snackbar}
          autoHideDuration={5000}
          onClose={handleClose}
          message="Porosia u shtua"
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseOutlinedIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        >
          <Alert
            variant="filled"
            color="success"
            onClose={handleClose}
            severity="success"
          >
            Porosia u shtua
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
