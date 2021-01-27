import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import { Link } from "react-router-dom";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import KlientContext from "../../../context/klientContext/KlientContext";
import StarIcon from "@material-ui/icons/Star";

export default function SingleProduct({ match }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://amove.alcodeit.com/get_allProducts.php")
      .then((res) => setProducts(res.data));
  }, []);

  const produkt = products.filter((produkt) => produkt.id == match.params.id);
  const klientContext = useContext(KlientContext);
  const { cartProducts, wishlistProducts } = klientContext;

  return (
    <>
      <div className="shko-te-produktet">
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to="/klient/produktet"
        >
          <Button
            startIcon={<ArrowBackOutlinedIcon />}
            color="primary"
            variant="outlined"
            style={{ backgroundColor: "white" }}
          >
            Shko te produktet
          </Button>
        </Link>
      </div>
      {produkt.map((single) => (
        <div key={single.id} className="single-product">
          <div className="single-product-left">
            <img
              src={`https://amove.alcodeit.com/images/${single.image}`}
              alt={single.titulli}
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
                {cartProducts.some((item) => item.product_id === single.id) ===
                true ? (
                  <Button
                    startIcon={<ShoppingCartOutlinedIcon />}
                    color="primary"
                    variant="contained"
                  >
                    <Link
                      to="/klient/shporta"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      View in Cart
                    </Link>
                  </Button>
                ) : (
                  <Button
                    size="large"
                    startIcon={<ShoppingCartOutlinedIcon />}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      klientContext.addToCart(single);
                    }}
                  >
                    Add to Cart
                  </Button>
                )}

                {wishlistProducts.some(
                  (item) => item.product_id === single.id
                ) === true ? (
                  <Button
                    size="large"
                    startIcon={<StarIcon />}
                    variant="outlined"
                    color="secondary"
                    onClick={() => klientContext.removeFromWishlist(single)}
                  >
                    Add to Wishlist
                  </Button>
                ) : (
                  <Button
                    size="large"
                    startIcon={<StarBorderOutlinedIcon />}
                    variant="outlined"
                    color="secondary"
                    onClick={() => klientContext.addToWishlist(single)}
                  >
                    Add to Wishlist
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
