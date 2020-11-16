import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import ProtectedRoutes from "../components/ProtectedRoutes";
import Home from "./components/Home";
import Porosite from "./components/Porosite";
import Produktet from "./components/Produktet";
import SingleProduct from "./components/SingleProduct";
export default function KlientDashboard({ history }) {
  const [user, setUser] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost/demo_react_server/api/config/user_profile.php?token="${JSON.parse(
          localStorage.getItem("token")
        )}"`
      )
      .then((res) => {
        setUser(res.data.user);
        axios.get(`http://localhost/demo_react_server/api/config/get_products_fromCart.php?klient=${res.data.user.id}`,).then((res) => setCartProducts(res.data))
        axios.get(`http://localhost/demo_react_server/api/config/get_productsWishlist.php?klient=${res.data.user.id}`).then(res => setWishlistProducts(res.data))
      });
  }, []);


  const handleLogout = () => {
    localStorage.setItem("auth", false);
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <div className="klient-dashboard">
      <Sidebar />
      <div className="klient-dashboard-header-body">
        <Header
          name={user.name}
          userImg={user.image_profile}
          handleLogout={() => handleLogout()}
          cartProducts={cartProducts}
          wishlistProducts={wishlistProducts}
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
                  wishlistProducts={wishlistProducts}
                  cartProducts={cartProducts}
                />
              )}
            />
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
