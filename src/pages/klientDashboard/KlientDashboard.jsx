import React, { useContext ,useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Switch, Route } from "react-router-dom";
import ProtectedRoutes from "../components/ProtectedRoutes";
import Home from "./components/Home";
import Porosite from "./components/Porosite";
import Produktet from "./components/Produktet";
import SingleProduct from "./components/SingleProduct";
import KlientContext from './context/KlientContext';
import Shporta from "./components/Shporta";

export default function KlientDashboard({ history }) {
  const klientContext = useContext(KlientContext);
  const {name,image_profile} = klientContext.user;

  const handleLogout = () => {
    localStorage.setItem("auth", false);
    localStorage.removeItem("token");
    history.push("/");
  };
  useEffect(() => {
    klientContext.getUser();
  }, []);

  return (

    <div className="klient-dashboard">
      <Sidebar />
      <div className="klient-dashboard-header-body">
        <Header
          name={name}
          userImg={image_profile}
          handleLogout={() => handleLogout()}
        />
        <div className="klient-dashboard-body">
          <Switch>
            <ProtectedRoutes exact path="/klient" component={Home} />
            <ProtectedRoutes
              exact
              path="/klient/porosite"
              component={Porosite}
            />
            <Route
              exact
              path="/klient/produktet"
              render={(props) => (
                <Produktet
                  {...props}
                />
              )}
            />
                <ProtectedRoutes exact path="/klient/shporta" component={Shporta} />
            <ProtectedRoutes
              exact
              path="/klient/:id"
              component={SingleProduct}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}
