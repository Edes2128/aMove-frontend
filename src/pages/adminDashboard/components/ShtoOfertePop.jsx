import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import OfertaSingleProductForm from './ofertaForms/OfertaSingleProductForm';
import CategoryProductOfertaForm from './ofertaForms/CategoryProductOfertaForm';
import ClientSpecifikOfertaForm from './ofertaForms/ClientSpecifikOfertaForm';
import CategoryClientOfertaForm from './ofertaForms/CategoryClientOfertaForm';
import OfertSetForm from './ofertaForms/OfertSetForm';
import { CloseOutlined } from "@material-ui/icons";
export default function ShtoOfertePop({ closePop }) {

const [ofertaType,setOfertaType] = useState("singleProduct");

  return (
    <div className="shto-oferte-pop">
      <div className="shto-oferte-pop-opa" onClick={closePop}></div>
      <div className="shto-oferte-pop-container">
      <CloseOutlined
              style={{
                alignSelf: "flex-end",
                marginRight: "10px",
                marginTop: "5px",
                fontSize: "30px",
                cursor: "pointer",
              }}
              onClick={closePop}
            />
        <div className="shto-oferte-pop-cotnainer-header-tabs">
          <Button style={{color: ofertaType === "singleProduct" ? '#2a7ebf' : ''}} onClick={() => setOfertaType("singleProduct")}>Single Product</Button>
          <Button  style={{color: ofertaType === "categoryProduct" ? '#2a7ebf' : ''}} onClick={() => setOfertaType("categoryProduct")}>Kategori Produkti</Button>
          <Button style={{color: ofertaType === "specifikClient" ? '#2a7ebf' : ''}} onClick={() => setOfertaType("specifikClient")}>Klient Specifik</Button>
          <Button  style={{color: ofertaType === "categoryClient" ? '#2a7ebf' : ''}} onClick={() => setOfertaType("categoryClient")}>Kategori Klienti</Button>
          <Button  style={{color: ofertaType === "ofertSet" ? '#2a7ebf' : ''}} onClick={() => setOfertaType("ofertSet")}>Ofert Set</Button>
        </div>
        <div className="shto-oferte-pop-cotnainer-forms">
        {ofertaType === "singleProduct" && <OfertaSingleProductForm />}
        {ofertaType === "categoryProduct" && <CategoryProductOfertaForm/>}
        {ofertaType === "specifikClient" && <ClientSpecifikOfertaForm/>}
        {ofertaType === "categoryClient" && <CategoryClientOfertaForm/>}
        {ofertaType === "ofertSet" && <OfertSetForm/>}
        </div>
      </div>
    </div>
  );
}
