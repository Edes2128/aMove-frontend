import React, { useState, useEffect , useContext } from "react";
import axios from "axios";
import Header from "./components/Header";
import { Switch } from "react-router-dom";
import Porosite from "./components/Porosite";
import ProtectedRoutes from "../components/ProtectedRoutes";
import Home from "./components/Home";
import Produkte from "./components/Produkte";
import Oferta from "./components/Oferta";
import Klient from "./components/Klient";
import { light, dark } from "../../config/theme";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import PersonIcon from "@material-ui/icons/Person";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import ArrowDropUpOutlinedIcon from "@material-ui/icons/ArrowDropUpOutlined";
import ShtoKlient from "./components/ShtoKlient";
import DepoContext from './context/DepoContext';

export default function AdminDashboard({ history }) {
  const [user, setUser] = useState({});
  const [theme, setTheme] = useState(true);
  const [dropdownKlient,Showklientdropdown] = useState(false);
  const appliedTheme = createMuiTheme(theme ? light : dark);

  const depoContext = useContext(DepoContext)

  useEffect(() => {
    axios
      .get(`https://192.168.88.250/demo_react_server/api/config/user_profile.php?token="${JSON.parse(
        localStorage.getItem("token")
      )}"`)
      .then((res) => setUser(res.data.user));
  }, []);

  const handleLogout = () => {
    localStorage.setItem("auth", false);
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <Header
        name={user.name}
        userImg={user.image_profile}
        handleLogout={() => handleLogout()}
      />
      <div className="sidebar">
        <div className="sidebar-dashboard">
          <div className="sidebar-dashboard-image">
            <img src="/move-logo.png" alt=""/>
          </div>
          <div>
            <Link className="link" to="/admin">
              <HomeIcon /> <p>Kreu</p>
            </Link>
            <Link className="link" to="/admin/porosite">
              <LocalMallIcon /> <p>Porosite</p>
            </Link>
            <Link className="link" to="/admin/produktet">
              <FormatListNumberedIcon /> <p>Produkte</p>
            </Link>
            <Link className="link" to="/admin/oferta">
              <LocalOfferIcon /> <p>Oferta</p>
            </Link>
            <Link className="link" to="/admin/klient">
              <PersonIcon />
              <p>
                Kliente {!dropdownKlient ? <ArrowDropDownOutlinedIcon onClick={() => Showklientdropdown(!dropdownKlient)} /> : <ArrowDropUpOutlinedIcon onClick={() => Showklientdropdown(!dropdownKlient)} />}
              </p>
            </Link>
            {dropdownKlient && 
            
            <div>
                <Link className="link" to="/admin/klient">Te gjithe</Link>
                <Link className="link" to="/admin/klient/shto" >Shto klient</Link>
            </div>
            
            }
          </div>
        </div>
        <div className="sidebar-right">
          <Switch>
            <ProtectedRoutes exact path="/admin" component={Home} />
            <ProtectedRoutes path="/admin/porosite" component={Porosite} />
            <ProtectedRoutes path="/admin/produktet" component={Produkte} />
            <ProtectedRoutes path="/admin/oferta" component={Oferta} />
            <ProtectedRoutes exact path="/admin/klient" component={Klient} />
            <ProtectedRoutes path="/admin/klient/shto" component={ShtoKlient} />
          </Switch>
        </div>
      </div>
    </ThemeProvider>
  );
}
