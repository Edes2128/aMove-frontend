import React, { useState } from "react";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import Button from "@material-ui/core/Button";
import ShtoOfertePop from "./ShtoOfertePop";

export default function Oferta() {
  const [shtoOfertPop, showShtoOfertePop] = useState(false);

  return (
    <>
      {shtoOfertPop && (
        <ShtoOfertePop closePop={() => showShtoOfertePop(false)} />
      )}
      <div className="ofertat">
        <header className="ofertat-header">
          <div className="ofertat-header-item">
            <div className="ofertat-header-item-left">
              <p>Oferta Aktive</p>
              <h2 style={{ fontSize: "40px" }}>6</h2>
            </div>
            <div className="ofertat-header-item-right">
              <LocalOfferOutlinedIcon style={{ fontSize: "40px" }} />
            </div>
          </div>
          <div className="ofertat-header-item">
            <div className="ofertat-header-item-left">
              <p>Oferta drejt perfundimit</p>
              <h2 style={{ fontSize: "40px" }}>50</h2>
            </div>
            <div className="ofertat-header-item-right">
              <LocalOfferOutlinedIcon style={{ fontSize: "40px" }} />
            </div>
          </div>
          <div className="ofertat-header-item">
            <div className="ofertat-header-item-left">
              <p>Oferta te perfunduara</p>
              <h2 style={{ fontSize: "40px" }}>23</h2>
            </div>
            <div className="ofertat-header-item-right">
              <LocalOfferOutlinedIcon style={{ fontSize: "40px" }} />
            </div>
          </div>
        </header>
        <div className="ofertat-data-table">
          <header className="ofertat-data-table-header">
            <h4>Ofertat</h4>
            <Button
              startIcon={<LocalOfferOutlinedIcon />}
              style={{
                backgroundColor: "#2a7ebf",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
              }}
              onClick={() => showShtoOfertePop(true)}
            >
              Shto Oferte
            </Button>
          </header>
        </div>
      </div>
    </>
  );
}
