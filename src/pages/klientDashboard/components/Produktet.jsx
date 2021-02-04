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
  const [sliderPrice, setSliderPrice] = useState([0, 1000]);
  const [range, setRange] = useState("all");
  const [kategori, setKategori] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [page, setPage] = useState(1);
  const [itemPage, setItempage] = useState(6);
  const start = (page - 1) * itemPage;
  const end = page * itemPage;
  const klientContext = useContext(KlientContext);
  const products = klientContext.products;
  const { cartProducts, wishlistProducts } = klientContext;

  useEffect(() => {
    window.addEventListener('online', function(e) { console.log('online');
  });
  },[])




  useEffect(() => {
    klientContext.getAllProducts();
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

  function sortByProperty(property) {
    return function (a, b) {
      if (priceSort === "high") {
        if (a[property] > b[property]) {
          return 1;
        }
      } else if (priceSort === "low") {
        if (a[property] < b[property]) {
          return -1;
        }
      }
      return 0;
    };
  }

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
                  <FormControlLabel
                    value="kategoria1"
                    control={<Radio color="primary" />}
                    label="Kategoria 1"
                  />
                  <FormControlLabel
                    value="kategoria2"
                    control={<Radio color="primary" />}
                    label="Kategoria 2"
                  />
                  <FormControlLabel
                    value="kategoria3"
                    control={<Radio color="primary" />}
                    label="Kategoria 3"
                  />
                  <FormControlLabel
                    value="kategoria4"
                    control={<Radio color="primary" />}
                    label="Kategoria 4"
                  />
                  <FormControlLabel
                    value="kategoria5"
                    control={<Radio color="primary" />}
                    label="Kategoria 5"
                  />
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
            <div className="katror">
              <BorderAllOutlinedIcon style={{ fontSize: "25px" }} />
            </div>
            <div className="drejtkendesh">
              <ListOutlinedIcon style={{ fontSize: "30px" }} />
            </div>
          </div>
          <div className="produkte-search">
            <TextField
              label="Kerko"
              style={{ width: "100%", backgroundColor: "white" }}
              placeholder="Kerko..."
              variant="outlined"
              color="primary"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="produktet-list">
            {products.slice(start, end).map((product) => (
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
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        View in Cart
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      startIcon={<LocalMallOutlinedIcon />}
                      disabled={product.sasia == 0 ? true : false}
                      color="primary"
                      style={{ width: "50%" }}
                      onClick={() => {
                        klientContext.addToCart(product);
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
                      onClick={() => klientContext.removeFromWishlist(product)}
                    >
                      Wish List
                    </Button>
                  ) : (
                    <Button
                      startIcon={<FavoriteBorderOutlinedIcon />}
                      color="secondary"
                      style={{ width: "50%" }}
                      onClick={() => klientContext.addToWishlist(product)}
                    >
                      Wish List
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="produkte-pagination">
            <div style={{ display: "flex", alignItems: "center" }}>
              <InputLabel style={{ marginRight: "10px" }} id="row">
                Produkte ne faqe
              </InputLabel>
              <Select
                labelId="row"
                onChange={(e) => setItempage(e.target.value)}
                value={itemPage}
              >
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={18}>18</MenuItem>
                <MenuItem value={24}>24</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </div>
            <Pagination
              count={Math.ceil(products.length / itemPage)}
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
