import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import FormatListBulletedOutlinedIcon from "@material-ui/icons/FormatListBulletedOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import CollapseContext from "../../../context/collpaseContext/CollpaseContext";

export default function Sidebar() {
  const collpaseContext = useContext(CollapseContext);
  const { value } = collpaseContext;

  return (
    <div
      className={
        value === true
          ? "klient-dashboard-sidebar klient-dashboard-sidebar-collapse"
          : "klient-dashboard-sidebar"
      }
    >
      <div className="sidebar-logo">
        <img
          style={{ display: value === true ? "none" : "" }}
          src="/move-logo.png"
          alt=""
        />
      </div>
      <div className="sidebar-links">
        <Link className="klient-dashboard-sidebar-link" to="/klient/porosite">
          {" "}
          <LocalMallOutlinedIcon
            style={{ marginRight: "20px", fontSize: "27px" }}
          />
          <p style={{ display: value === true ? "none" : "" }}> Porosite </p>
        </Link>
        <Link className="klient-dashboard-sidebar-link" to="/klient/produktet">
          {" "}
          <FormatListBulletedOutlinedIcon
            style={{ marginRight: "20px", fontSize: "27px" }}
          />
          <p style={{ display: value === true ? "none" : "" }}> Produktet</p>
        </Link>
        <Link className="klient-dashboard-sidebar-link" to="/klient/shporta">
          {" "}
          <ShoppingCartOutlinedIcon
            style={{ marginRight: "20px", fontSize: "27px" }}
          />
          <p style={{ display: value === true ? "none" : "" }}> Shporta</p>
        </Link>
        <Link className="klient-dashboard-sidebar-link" to="/klient/wishlist">
          {" "}
          <StarBorderOutlinedIcon
            style={{ marginRight: "20px", fontSize: "27px" }}
          />
          <p style={{ display: value === true ? "none" : "" }}> Wishlist</p>
        </Link>
      </div>
    </div>
  );
}
