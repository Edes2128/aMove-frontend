import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import {Link} from 'react-router-dom';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

export default function SingleProduct({ match }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost/demo_react_server/api/config/get_allProducts.php")
      .then((res) => setProducts(res.data));
  }, []);

  const produkt = products.filter((produkt) => produkt.id === match.params.id);

  return (
    <>
    <div className="shko-te-produktet">
    <Link style={{textDecoration:'none',color:'inherit'}} to="/klient/produktet"><Button startIcon={<ArrowBackOutlinedIcon />} color="primary" variant="outlined" style={{backgroundColor:'white'}} >Shko te produktet</Button></Link>
    </div>
      {produkt.map((single) => (
        <div key={single.id} className="single-product">
          <div className="single-product-left">
            <img
              src={`http://localhost/demo_react_server/images/${single.image}`}
              alt=""
            />
          </div>
          <div className="single-product-right">
            <div className="single-product-right-title-price">
              <p className="single-product-right-title">{single.titulli}</p>
              <p className="single-product-right-price">{single.cmimi} Leke</p>
            </div>
            <div className="single-product-right-description-sku">
              <p className="single-product-right-description">
                {single.pershkrimi}
              </p>
              <p className="single-product-right-sku">SKU: {single.sku} </p>
            </div>
            <div className="single-product-right-stock-addcart">
              <p className="single-product-right-stock">
                Available - {single.sasia > 0 ? "Ka stock" : "Nuk ka stock"}{" "}
              </p>
              <div className="buttons-wish-cart">
                <Button
                  size="large"
                  startIcon={<ShoppingCartOutlinedIcon />}
                  variant="contained"
                  color="primary"
                >
                  Add to Cart
                </Button>
                <Button
                  size="large"
                  startIcon={<StarBorderOutlinedIcon />}
                  variant="outlined"
                  color="secondary"
                >
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
