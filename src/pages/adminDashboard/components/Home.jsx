import React, { useContext, useEffect } from "react";
import DepoContext from "../../../context/depoContext/DepoContext";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";


export default function Home() {
  const depoContext = useContext(DepoContext);
  const { klientet, porosite } = depoContext;

  useEffect(() => {
    depoContext.getAllClients();
    depoContext.getAllOrders();
  }, []);


  return (
    <>
      <div className="home">
        <div className="home-header">
          <div className="home-header-item">
            <div className="home-header-item-left">
              <p>Porosi Gjithsej</p>
              <h2>{porosite.length}</h2>
            </div>
            <div className="home-header-item-right">
              <LocalMallOutlinedIcon style={{ fontSize: "45px" }} />
            </div>
          </div>
          <div className="home-header-item">
            <div className="home-header-item-left">
              <p>Porosi ne pritje</p>
              <h2>
                {porosite.filter((order) => order.order_status === 2).length}
              </h2>
            </div>
            <div className="home-header-item-right">
              <LocalMallOutlinedIcon style={{ fontSize: "45px" }} />
            </div>
          </div>
          <div className="home-header-item">
            <div className="home-header-item-left">
              <p>Klientet</p>
              <h2>{klientet.length}</h2>
            </div>
            <div className="home-header-item-right">
              <PeopleAltOutlinedIcon style={{ fontSize: "45px" }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
