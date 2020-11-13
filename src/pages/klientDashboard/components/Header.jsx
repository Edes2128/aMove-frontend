import React, { useState,useEffect } from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import ArrowDropUpOutlinedIcon from "@material-ui/icons/ArrowDropUpOutlined";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';


export default function Header({ cartProducts,wishlistProducts, name, userImg, handleLogout }) {
        const [logout, Setlogout] = useState(false);
        
  return (
    <div className="klient-dashboard-header">
      <div className="klient-dashboard-header-widgets-klient">
      <Badge badgeContent={wishlistProducts.length} color="primary">
          <StarBorderOutlinedIcon />
        </Badge>
      <Badge badgeContent={cartProducts.length} color="primary">
          <ShoppingCartOutlinedIcon />
        </Badge> 
        <Badge badgeContent={9} color="primary">
          <NotificationsIcon />
        </Badge>
        <Avatar
          className="logo-user-loggedin"
          src={`http://localhost/demo_react_server/images/${userImg}`}
          alt="LogoUser"
        />
        <p onClick={() => Setlogout(!logout)}>{name}</p>
        {!logout && (
          <ArrowDropDownOutlinedIcon onClick={() => Setlogout(!logout)} />
        )}
        {logout && (
          <ArrowDropUpOutlinedIcon onClick={() => Setlogout(!logout)} />
        )}
      </div>
      <div className={!logout ? "hover-logout" : "hover-logout display-block"}>
        <p onClick={handleLogout}>
          {" "}
          <PowerSettingsNewIcon onClick={handleLogout} />
          Logout
        </p>
      </div>
    </div>
  );
}
