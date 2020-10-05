import React from 'react'
import {Link} from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PersonIcon from '@material-ui/icons/Person';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined';
import { Switch } from '@material-ui/core';

export default function Sidebar({handleTheme}) {
    return (
        <div className="sidebar-dashboard">
            <div>
            <Link  className="link" to="/admin"> <HomeIcon/> <p>Kreu</p></Link>
            <Link className="link"  to="/admin/porosite"><LocalMallIcon/> <p>Porosite</p></Link>
            <Link className="link" to="/admin/produktet"><FormatListNumberedIcon /> <p>Produkte</p></Link>
            <Link className="link" to="/admin/oferta" ><LocalOfferIcon /> <p>Oferta</p></Link>
            <Link className="link" to="/admin/klient"><PersonIcon /> <p>Kliente <ArrowDropDownOutlinedIcon/></p>  </Link>
            </div>
            <Switch color="primary" onClick={() => handleTheme}  />
        </div>
    )
}
