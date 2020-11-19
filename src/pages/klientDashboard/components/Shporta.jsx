import React, { useState, useContext } from "react";
import KlientContext from "../context/KlientContext";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

export default function Shporta() {
  const klientContext = useContext(KlientContext);
  const { cartProducts } = klientContext;

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
                        src={`http://localhost/demo_react_server/images/${item.image}`}
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
                          >
                            -
                          </Button>
                          <p>0</p>
                          <Button
                            color="primary"
                            variant="contained"
                            style={{ width: "10%" }}
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
                        onClick={() => klientContext.removeFromCart(item)}
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
              <div className="shporta-checkout-content"></div>
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
      </div>
    </>
  );
}
