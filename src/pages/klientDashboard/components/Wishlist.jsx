import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import KlientContext from "../../../context/klientContext/KlientContext";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const klientContext = useContext(KlientContext);

  const { wishlistProducts, cartProducts } = klientContext;

  return (
    <div className="wishlist">
      {wishlistProducts.length > 0 ? (
        <div className="wishlist-content">
          {wishlistProducts.map((item) => (
            <div className="wishlist-item">
              <div className="wishlist-item-image">
                <img
                  src={`https://192.168.88.250/demo_react_server/images/${item.image}`}
                  alt=""
                />
              </div>
              <div className="wishlist-item-content">
                <div className="wishlist-item-content-price">
                  <p> {item.cmimi} Leke</p>
                </div>
                <div className="wishlist-item-content-title">
                  <h4> {item.titulli} </h4>
                  <p> {item.pershkrimi} </p>
                </div>
              </div>
              <div className="wishlist-item-content-button">
                <Button
                  onClick={() => klientContext.removeFromWishlist(item)}
                  startIcon={<CloseIcon />}
                  variant="contained"
                  style={{ width: "50%", height: "100%", borderRadius: "0" }}
                >
                  Remove
                </Button>

                {cartProducts.some(
                  (product) => product.product_id === item.id
                ) === true ? (
                  <Button
                    startIcon={<ShoppingCartOutlinedIcon />}
                    variant="contained"
                    color="primary"
                    style={{ width: "50%", height: "100%", borderRadius: "0" }}
                  >
                    <Link
                      to="/klient/shporta"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      View in Cart
                    </Link>
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      klientContext.addToCart(item);
                      klientContext.removeFromWishlist(item);
                    }}
                    startIcon={<ShoppingCartOutlinedIcon />}
                    variant="contained"
                    color="primary"
                    style={{ width: "50%", height: "100%", borderRadius: "0" }}
                  >
                    Add to Cart
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-wishlit">
          <h2>Wishlist eshte bosh</h2>
          <Link
            to="/klient/produktet"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {" "}
            <Button color="secondary" variant="outlined">
              Shiko produktet
            </Button>{" "}
          </Link>
        </div>
      )}
    </div>
  );
}
