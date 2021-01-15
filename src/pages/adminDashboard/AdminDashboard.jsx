import React, { useState, useEffect, useContext } from "react";
import Header from "./components/Header";
import { Switch } from "react-router-dom";
import Porosite from "./components/Porosite";
import ProtectedRoutes from "../components/ProtectedRoutes";
import Home from "./components/Home";
import Produkte from "./components/Produkte";
import Oferta from "./components/Oferta";
import Klient from "./components/Klient";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import PersonIcon from "@material-ui/icons/Person";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import ArrowDropUpOutlinedIcon from "@material-ui/icons/ArrowDropUpOutlined";
import DepoContext from "../../context/depoContext/DepoContext";
import Alerts from "../components/Alert";
import ShtoAttributes from "./components/ShtoAttributes";
import ShtoKategoriProduktesh from "./components/ShtoKategoriProduktesh";
import ShtoKategoriKlientesh from "./components/ShtoKategoriKlientesh";
import ShtoZonaKlientesh from "./components/ShtoZonaKlientesh";
import CollapseContext from '../../context/collpaseContext/CollpaseContext';

export default function AdminDashboard({ history }) {
  const [dropdownKlient, Showklientdropdown] = useState(false);
  const [dropdownProdukt, showProduktDropdown] = useState(false);
  const depoContext = useContext(DepoContext);
  const { user } = depoContext;
  const collpaseContext = useContext(CollapseContext);
  const {value} = collpaseContext;

  useEffect(() => {
    depoContext.getUser();
  }, []);


  const handleLogout = () => {
    localStorage.setItem("auth", false);
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <>
      <Alerts />
      <Header
        name={user.name}
        userImg={user.image_profile}
        handleLogout={() => handleLogout()}
      />
      <div className="sidebar">
        <div className={value === true ? "sidebar-dashboard sidebar-dashboard-collapse" : "sidebar-dashboard"}>
          <div className="sidebar-dashboard-image">
            <img src="/move-logo.png" style={{display: value === true ? 'none' : ''}}  alt="" />
          </div>
          <div>
            <Link className="link" to="/admin">
              <HomeIcon style={{fontSize:'40px'}} /> <p style={{display: value === true ? 'none' : ''}} >Kreu</p>
            </Link>
            <Link className="link" to="/admin/porosite">
              <LocalMallIcon style={{fontSize:'40px'}}/> <p style={{display: value === true ? 'none' : ''}} >Porosite</p>
            </Link>
            <Link
              className="link"
              to="/admin/produktet"
              onClick={() => showProduktDropdown(!dropdownProdukt)}
            >
              <FormatListNumberedIcon style={{fontSize:'40px'}} />
              <p  style={{display: value === true ? 'none' : ''}}>
                Produkte
                {!dropdownProdukt ? (
                  <ArrowDropDownOutlinedIcon
                    onClick={() => showProduktDropdown(!dropdownProdukt)}
                  />
                ) : (
                  <ArrowDropUpOutlinedIcon
                    onClick={() => showProduktDropdown(!dropdownProdukt)}
                  />
                )}
              </p>
            </Link>
            {dropdownProdukt && (
              <div>
                <Link className="link" to="/admin/produktet/attributes">
                  Shto attribut
                </Link>
                <Link className="link" to="/admin/produktet/kategori">
                  Shto kategori
                </Link>
              </div>
            )}
            <Link className="link" to="/admin/oferta">
              <LocalOfferIcon style={{fontSize:'40px'}}/> <p  style={{display: value === true ? 'none' : ''}}>Oferta</p>
            </Link>
            <Link
              className="link"
              to="/admin/klient"
              onClick={() => Showklientdropdown(!dropdownKlient)}
            >
              <PersonIcon style={{fontSize:'40px'}} />
              <p style={{display: value === true ? 'none' : ''}}>
                Kliente{" "}
                {!dropdownKlient ? (
                  <ArrowDropDownOutlinedIcon
                    onClick={() => Showklientdropdown(!dropdownKlient)}
                  />
                ) : (
                  <ArrowDropUpOutlinedIcon
                    onClick={() => Showklientdropdown(!dropdownKlient)}
                  />
                )}
              </p>
            </Link>
            {dropdownKlient && (
              <div>
                <Link className="link" to="/admin/klient">
                  Te gjithe
                </Link>
                <Link className="link" to="/admin/klient/kategori">
                  Shto kategori
                </Link>
                <Link className="link" to="/admin/klient/zona">
                  Shto zone
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className={ value === true ?  "sidebar-right sidebar-right-collapse" : "sidebar-right"}>
          <Switch>
            <ProtectedRoutes exact path="/admin" component={Home} />
            <ProtectedRoutes path="/admin/porosite" component={Porosite} />
            <ProtectedRoutes
              exact
              path="/admin/produktet"
              component={Produkte}
            />
            <ProtectedRoutes
              path="/admin/produktet/attributes"
              component={ShtoAttributes}
            />
            <ProtectedRoutes
              path="/admin/produktet/kategori"
              component={ShtoKategoriProduktesh}
            />
            <ProtectedRoutes path="/admin/oferta" component={Oferta} />
            <ProtectedRoutes exact path="/admin/klient" component={Klient} />
            <ProtectedRoutes
              exact
              path="/admin/klient/kategori"
              component={ShtoKategoriKlientesh}
            />
            <ProtectedRoutes
              exact
              path="/admin/klient/zona"
              component={ShtoZonaKlientesh}
            />
          </Switch>
        </div>
      </div>
    </>
  );
}
