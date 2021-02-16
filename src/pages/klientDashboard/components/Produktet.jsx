import React, { useState, useEffect, useContext } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import BorderAllOutlinedIcon from "@material-ui/icons/BorderAllOutlined";
import ListOutlinedIcon from "@material-ui/icons/ListOutlined";
import TextField from "@material-ui/core/TextField";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Slider from "@material-ui/core/Slider";
import { Link } from "react-router-dom";
import KlientContext from "../../../context/klientContext/KlientContext";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Pagination from "@material-ui/lab/Pagination";

export default function Produktet() {
  const klientContext = useContext(KlientContext);
  const { cartProducts, wishlistProducts, produktCategories } = klientContext;
  const [sliderPrice, setSliderPrice] = useState([0, 1000]);
  const [range, setRange] = useState("all");
  const [produktMenuLayout, setProduktMenuLayout] = useState("horizontal");
  const [kategori, setKategori] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [page, setPage] = useState(1);
  const [itemPage, setItempage] = useState(6);
  const start = (page - 1) * itemPage;
  const end = page * itemPage;
  const products = klientContext.products;
  const [disabledButton, setDisabledButton] = useState({});
  const productFilter = products.filter(
    (product) =>
      product.titulli
        .toString()
        .toLowerCase()
        .includes(searchFilter.toLowerCase()) ||
      product.cmimi
        .toString()
        .toLowerCase()
        .includes(searchFilter.toLowerCase())
  );

  useEffect(() => {
    klientContext.getAllProducts();
    klientContext.getCategoryProducts();
  }, []);

  const handleChange2 = (event, value) => {
    setPage(value);
  };

  const handleChange = (event, newValue) => {
    setSliderPrice(newValue);
    setRange("");
  };
  function valuetext(sliderPrice) {
    return `${sliderPrice}$`;
  }
  const removeFilter = () => {
    setSliderPrice([0, 1000]);
    setRange("all");
    setKategori("");
  };

  return (
    <div>
      <div className="filter-produkte">
        <div className="filter">
          <div className="filter-content">
            <div className="filter-content-multi-range">
              <h3>Multi Range</h3>
              <FormControl component="fieldset">
                <RadioGroup
                  onChange={(e) => setRange(e.target.value)}
                  value={range}
                >
                  <FormControlLabel
                    value="all"
                    control={<Radio color="primary" />}
                    label="All"
                  />
                  <FormControlLabel
                    value="10"
                    control={<Radio color="primary" />}
                    label="<=$10"
                  />
                  <FormControlLabel
                    value="100"
                    control={<Radio color="primary" />}
                    label="$10-$100"
                  />
                  <FormControlLabel
                    value="500"
                    control={<Radio color="primary" />}
                    label="$500"
                  />
                  <FormControlLabel
                    value="600"
                    control={<Radio color="primary" />}
                    label=">=$500"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="filter-content-price-slider">
              <h3>Price Slider</h3>
              <Slider
                value={sliderPrice}
                onChange={handleChange}
                valueLabelDisplay="auto"
                style={{ width: "90%", alignSelf: "center" }}
                getAriaValueText={valuetext}
                max={1000}
              />
            </div>
            <div className="filter-content-category">
              <h3>Category</h3>
              <FormControl component="fieldset">
                <RadioGroup
                  onChange={(e) => setKategori(e.target.value)}
                  value={kategori}
                >
                  {produktCategories.map((cat) => (
                    <FormControlLabel
                      value={cat.name}
                      control={<Radio color="primary" />}
                      label={cat.name}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            <Button
              variant="contained"
              style={{ marginTop: "10px" }}
              color="primary"
              onClick={removeFilter}
            >
              Remove Filters
            </Button>
          </div>
        </div>

        <div className="produkte">
          <div className="produkte-featured">
            <FormControl
              size="small"
              variant="outlined"
              style={{ width: "50%", backgroundColor: "white" }}
            >
              <InputLabel>Featured</InputLabel>
              <Select
                onChange={(e) => setPriceSort(e.target.value)}
                value={priceSort}
              >
                <MenuItem value="low">Lowest Price</MenuItem>
                <MenuItem value="high">Highest Price</MenuItem>
              </Select>
            </FormControl>
            <div
              className="katror"
              onClick={() => setProduktMenuLayout("horizontal")}
            >
              <BorderAllOutlinedIcon
                style={{
                  fontSize: "21px",
                  color:
                    produktMenuLayout === "horizontal" ? "#1b75bc" : "black",
                }}
              />
            </div>
            <div
              className="drejtkendesh"
              onClick={() => setProduktMenuLayout("vertical")}
            >
              <ListOutlinedIcon
                style={{
                  fontSize: "25px",
                  color: produktMenuLayout === "vertical" ? "#1b75bc" : "black",
                }}
              />
            </div>
          </div>
          <div className="produkte-search">
            <TextField
              label="Kerko"
              style={{ width: "98%", backgroundColor: "white" }}
              placeholder="Kerko..."
              variant="outlined"
              color="primary"
              onChange={(e) => {
                setSearchFilter(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {produktMenuLayout === "vertical" && (
            <div className="produktet-list-vertical">
              {productFilter.length === 0 ? (
                <div className="klient-produkte-search-notfound">
                  <img src="/search_notfound.gif" alt="" />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <h3>Nuk u gjet asnje produkt nga kerkimi😥</h3>

                    <p style={{ fontSize: "17px" }}>Provoni perseri!</p>
                  </div>
                </div>
              ) : (
                <>
                  {productFilter.slice(start, end).map((product) => (
                    <div className="produktet-list-vertical-item">
                      <div className="produktet-list-vertical-item-image">
                        <img
                          src={`https://amove.alcodeit.com/images/${product.image}`}
                          alt=""
                        />
                      </div>
                      <div className="produktet-list-vertical-item-titulli">
                        <h3 style={{ marginBottom: "20px" }}>
                          {" "}
                          {product.titulli}{" "}
                        </h3>
                        <p>{product.pershkrimi}</p>
                      </div>
                      <div className="produktet-list-vertical-item-buttons">
                        <p style={{ color: "#1b75bc", fontWeight: "600" }}>
                          {" "}
                          {product.cmimi} Leke
                        </p>
                        {cartProducts.some(
                          (item) => item.product_id === product.id
                        ) === true ? (
                          <Button
                            startIcon={<LocalMallOutlinedIcon />}
                            color="primary"
                            variant="contained"
                            style={{ width: "80%" }}
                          >
                            <Link
                              to="/klient/shporta"
                              style={{
                                color: "inherit",
                                textDecoration: "none",
                              }}
                            >
                              View in Cart
                            </Link>
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            startIcon={<LocalMallOutlinedIcon />}
                            disabled={
                              product.sasia == 0 || product === disabledButton
                                ? true
                                : false
                            }
                            color="primary"
                            style={{ width: "80%" }}
                            onClick={() => {
                              klientContext.addToCart(product);
                              setDisabledButton(product);
                              setTimeout(() => setDisabledButton({}), 1500);
                            }}
                          >
                            Add to Cart
                          </Button>
                        )}
                        {wishlistProducts.some(
                          (item) => item.product_id === product.id
                        ) ? (
                          <Button
                            variant="outlined"
                            startIcon={<FavoriteIcon />}
                            color="secondary"
                            style={{ width: "80%" }}
                            onClick={() =>
                              klientContext.removeFromWishlist(product)
                            }
                          >
                            Wish List
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            startIcon={<FavoriteBorderOutlinedIcon />}
                            color="secondary"
                            style={{ width: "80%" }}
                            onClick={() => klientContext.addToWishlist(product)}
                          >
                            Wish List
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {produktMenuLayout === "horizontal" && (
            <div className="produktet-list">
              <>
                {productFilter.length === 0 ? (
                  <div className="klient-produkte-search-notfound">
                    <img src="/search_notfound.gif" alt="" />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <h3>Nuk u gjet asnje produkt nga kerkimi😥</h3>
                      <p style={{ fontSize: "17px" }}>Provoni perseri!</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {productFilter.slice(start, end).map((product) => (
                      <div className="produktet-list-item" key={product.id}>
                        <div className="produkte-header-item-image">
                          <Link to={`/klient/${product.id}`}>
                            <img
                              src={`https://amove.alcodeit.com/images/${product.image}`}
                              alt=""
                            />
                          </Link>
                        </div>

                        <div className="produktet-list-item-price">
                          <p> {product.cmimi} Leke </p>
                        </div>
                        <div className="produkte-header-item-title-description">
                          <h4> {product.titulli} </h4>
                          <p> {product.pershkrimi} </p>
                        </div>

                        <div className="produkte-header-item-wish-cart">
                          {cartProducts.some(
                            (item) => item.product_id === product.id
                          ) === true ? (
                            <Button
                              startIcon={<LocalMallOutlinedIcon />}
                              color="primary"
                              style={{ width: "50%" }}
                            >
                              <Link
                                to="/klient/shporta"
                                style={{
                                  color: "inherit",
                                  textDecoration: "none",
                                }}
                              >
                                View in Cart
                              </Link>
                            </Button>
                          ) : (
                            <Button
                              startIcon={<LocalMallOutlinedIcon />}
                              disabled={
                                product.sasia == 0 || product === disabledButton
                                  ? true
                                  : false
                              }
                              color="primary"
                              style={{ width: "50%" }}
                              onClick={() => {
                                klientContext.addToCart(product);
                                setDisabledButton(product);
                                setTimeout(() => setDisabledButton({}), 1500);
                              }}
                            >
                              Add to Cart
                            </Button>
                          )}

                          {wishlistProducts.some(
                            (item) => item.product_id === product.id
                          ) ? (
                            <Button
                              startIcon={<FavoriteIcon />}
                              color="secondary"
                              style={{ width: "50%" }}
                              onClick={() =>
                                klientContext.removeFromWishlist(product)
                              }
                            >
                              Wish List
                            </Button>
                          ) : (
                            <Button
                              startIcon={<FavoriteBorderOutlinedIcon />}
                              color="secondary"
                              style={{ width: "50%" }}
                              onClick={() =>
                                klientContext.addToWishlist(product)
                              }
                            >
                              Wish List
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
            </div>
          )}
          <div
            className="produkte-pagination"
            style={{ display: productFilter.length === 0 ? "none" : "flex" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <InputLabel style={{ marginRight: "10px" }} id="row">
                Produkte ne faqe
              </InputLabel>
              <Select
                labelId="row"
                onChange={(e) => setItempage(e.target.value)}
                value={itemPage}
              >
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={18}>18</MenuItem>
                <MenuItem value={24}>24</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </div>
            <Pagination
              count={Math.ceil(productFilter.length / itemPage)}
              color="primary"
              page={page}
              size="large"
              onChange={handleChange2}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
