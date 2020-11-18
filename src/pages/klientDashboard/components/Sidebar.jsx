import React from "react";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import FormatListBulletedOutlinedIcon from "@material-ui/icons/FormatListBulletedOutlined";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';

export default function Sidebar() {
  return (
    <div className="klient-dashboard-sidebar">
      <div className="sidebar-logo">
        <img width="120" height="120" src="/move-logo.png" alt="" />
      </div>
      <div className="sidebar-links">
        <Link className="klient-dashboard-sidebar-link" to="/klient">
          {" "}
          <HomeOutlinedIcon style={{marginRight:'20px',fontSize:'20px'}} /> Home
        </Link>
        <Link className="klient-dashboard-sidebar-link" to="/klient/porosite">
          {" "}
          <LocalMallOutlinedIcon style={{marginRight:'20px',fontSize:'20px'}}/> Porosite
        </Link>
        <Link className="klient-dashboard-sidebar-link" to="/klient/produktet">
          {" "}
          <FormatListBulletedOutlinedIcon style={{marginRight:'20px',fontSize:'20px'}}/> Produktet
        </Link>
        <Link className="klient-dashboard-sidebar-link" to="/klient/shporta">
          {" "}
          <ShoppingCartOutlinedIcon style={{marginRight:'20px',fontSize:'20px'}}/> Shporta
        </Link>
        <Link className="klient-dashboard-sidebar-link" to="/klient/wishlist">
          {" "}
          <StarBorderOutlinedIcon style={{marginRight:'20px',fontSize:'20px'}}/> Wishlist
        </Link>
      </div>
    </div>
  );
}
