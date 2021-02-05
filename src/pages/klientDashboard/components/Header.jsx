import React, { useState, useContext, useEffect } from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import ArrowDropUpOutlinedIcon from "@material-ui/icons/ArrowDropUpOutlined";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import KlientContext from "../../../context/klientContext/KlientContext";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import CollapseContext from "../../../context/collpaseContext/CollpaseContext";

export default function Header({ name, userImg, handleLogout }) {
  const [logout, Setlogout] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const klientContext = useContext(KlientContext);
  const cartProducts = klientContext.cartProducts;
  const wishlistProducts = klientContext.wishlistProducts;
  const collpaseContext = useContext(CollapseContext);
  const { value } = collpaseContext;

  useEffect(() => {
    klientContext.getCartProducts();
    klientContext.getWishlistProducts();
  }, []);

  return (
    <div className="klient-dashboard-header">
      {!value && (
        <IconButton>
          <ArrowBackIosOutlinedIcon />
        </IconButton>
      )}
      {value && (
        <IconButton>
          <ArrowForwardIosOutlinedIcon />
        </IconButton>
      )}

      <div className="klient-dashboard-header-widgets-klient">
        <Badge badgeContent={wishlistProducts.length} color="primary">
          <StarBorderOutlinedIcon
            onClick={() => {
              setShowWishlist(!showWishlist);
            }}
            style={{ cursor: "pointer" }}
          />
        </Badge>

        <Badge badgeContent={cartProducts.length} color="primary">
          <ShoppingCartOutlinedIcon
            onClick={() => {
              setShowProducts(!showProducts);
            }}
            style={{ cursor: "pointer" }}
          />
        </Badge>

        <Badge badgeContent={9} color="primary">
          <NotificationsIcon />
        </Badge>
        <Avatar
          className="logo-user-loggedin"
          src={`https://amove.alcodeit.com/images/${userImg}`}
          alt="LogoUser"
        />
        <ClickAwayListener onClickAway={() => Setlogout(false)}>
          <p onClick={() => Setlogout(!logout)} style={{ cursor: "pointer" }}>
            {name}
          </p>
        </ClickAwayListener>
        {!logout && (
          <ClickAwayListener onClickAway={() => Setlogout(false)}>
            <ArrowDropDownOutlinedIcon
              style={{ cursor: "pointer" }}
              onClick={() => Setlogout(!logout)}
            />
          </ClickAwayListener>
        )}
        {logout && (
          <ClickAwayListener onClickAway={() => Setlogout(false)}>
            <ArrowDropUpOutlinedIcon
              style={{ cursor: "pointer" }}
              onClick={() => Setlogout(!logout)}
            />
          </ClickAwayListener>
        )}
      </div>
      <div className={!logout ? "hover-logout" : "hover-logout display-block"}>
        <p onClick={handleLogout}>
          {" "}
          <PowerSettingsNewIcon onClick={handleLogout} />
          Logout
        </p>
      </div>

      {showProducts === true && (
        <ClickAwayListener onClickAway={() => setShowProducts(false)}>
          <div className="header-cart-products">
            {cartProducts.length > 0 ? (
              <>
                <div className="header-cart-products-length">
                  <h2> {cartProducts.length} items </h2>
                  <p>In your cart</p>
                </div>
                <div className="header-cart-products-content">
                  {cartProducts.map((item) => (
                    <div
                      className="header-cart-products-content-item"
                      key={item.id}
                    >
                      <div className="header-cart-products-content-item-image">
                        <img
                          src={`https://amove.alcodeit.com/images/${item.image}`}
                          alt=""
                        />
                      </div>
                      <div className="header-cart-products-content-item-title-remove">
                        <h4 style={{ fontSize: "15px" }}> {item.titulli} </h4>
                        <p style={{ fontSize: "12px" }}>{item.pershkrimi} </p>
                        <CloseOutlinedIcon
                          style={{
                            fontSize: "16px",
                            color: "red",
                            alignSelf: "flex-end",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            klientContext.removeFromCart(item);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="header-cart-products-shporta">
                  <Link
                    to="/klient/shporta"
                    style={{
                      width: "100%",
                      color: "inherit",
                      textDecoration: "none",
                      overflow: "hidden",
                    }}
                  >
                    {" "}
                    <Button
                      color="primary"
                      style={{ width: "100%" }}
                      startIcon={<ShoppingCartOutlinedIcon />}
                    >
                      Shporta
                    </Button>{" "}
                  </Link>
                </div>
              </>
            ) : (
              <div className="header-cart-empty">
                <h4>Shporta eshte bosh</h4>
              </div>
            )}
          </div>
        </ClickAwayListener>
      )}

      {showWishlist === true && (
        <ClickAwayListener onClickAway={() => setShowWishlist(false)}>
          <div className="header-cart-products">
            {wishlistProducts.length > 0 ? (
              <>
                <div className="header-cart-products-length">
                  <h2> {wishlistProducts.length} items</h2>
                  <p>In your wishlist</p>
                </div>
                <div className="header-cart-products-content">
                  {wishlistProducts.map((item) => (
                    <div
                      className="header-cart-products-content-item"
                      key={item.id}
                    >
                      <div className="header-cart-products-content-item-image">
                        <img
                          src={`https://amove.alcodeit.com/images/${item.image}`}
                          alt=""
                        />
                      </div>
                      <div className="header-cart-products-content-item-title-remove">
                        <h4 style={{ fontSize: "15px" }}> {item.titulli} </h4>
                        <p style={{ fontSize: "12px" }}>{item.pershkrimi} </p>
                        <CloseOutlinedIcon
                          style={{
                            fontSize: "16px",
                            color: "red",
                            alignSelf: "flex-end",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            klientContext.removeFromWishlist(item);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="header-cart-products-shporta">
                  <Link
                    to="/klient/wishlist"
                    style={{
                      width: "100%",
                      color: "inherit",
                      textDecoration: "none",
                      overflow: "hidden",
                    }}
                  >
                    {" "}
                    <Button
                      color="primary"
                      style={{ width: "100%" }}
                      startIcon={<StarBorderOutlinedIcon />}
                    >
                      Wishlist
                    </Button>{" "}
                  </Link>
                </div>
              </>
            ) : (
              <div className="header-cart-empty">
                <h4>Wishlist eshte bosh</h4>
              </div>
            )}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}
