import React, { useState } from "react";
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
import axios from "axios";

export default function Produktet() {
  const [sliderPrice, setSliderPrice] = useState([0, 1000]);
  const [products, setProducts] = useState([]);
  const handleChange = (event, newValue) => {
    setSliderPrice(newValue);
  };
  function valuetext(sliderPrice) {
    return `${sliderPrice}$`;
  }

  axios
    .get("http://localhost/demo_react_server/api/config/get_allProducts.php")
    .then((res) => setProducts(res.data));
  return (
    <div>
      <div className="filter-produkte">
        <div className="filter">
          <div className="filter-content">
            <div className="filter-content-multi-range">
              <h3>Multi Range</h3>
              <FormControl component="fieldset">
                <RadioGroup>
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="All"
                  />
                  <FormControlLabel
                    value="10"
                    control={<Radio />}
                    label="<=$10"
                  />
                  <FormControlLabel
                    value="100"
                    control={<Radio />}
                    label="$10-$100"
                  />
                  <FormControlLabel
                    value="500"
                    control={<Radio />}
                    label="$500"
                  />
                  <FormControlLabel
                    value="600"
                    control={<Radio />}
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
                max="1000"
              />
            </div>
            <div className="filter-content-category">
              <h3>Category</h3>
              <FormControl component="fieldset">
                <RadioGroup>
                  <FormControlLabel
                    value="kategoria1"
                    control={<Radio />}
                    label="Kategoria 1"
                  />
                  <FormControlLabel
                    value="kategoria2"
                    control={<Radio />}
                    label="Kategoria 2"
                  />
                  <FormControlLabel
                    value="kategoria3"
                    control={<Radio />}
                    label="Kategoria 3"
                  />
                  <FormControlLabel
                    value="kategoria4"
                    control={<Radio />}
                    label="Kategoria 4"
                  />
                  <FormControlLabel
                    value="kategoria5"
                    control={<Radio />}
                    label="Kategoria 5"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <Button
              variant="contained"
              style={{ marginTop: "10px" }}
              color="primary"
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
              <Select>
                <MenuItem value="Lowest Price">Lowest Price</MenuItem>
                <MenuItem value="Highest Price">Highest Price</MenuItem>
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
            {products.map((product) => (
              <div className="produktet-list-item">
                <div className="produkte-header-item-image">
                  <img
                    width="100"
                    src={`http://localhost/demo_react_server/images/${product.image}`}
                    alt=""
                  />
                </div>
                <div className="produktet-list-item-price">
                  <p> {product.cmimi} Leke </p>
                </div>
                <div className="produkte-header-item-title-description">
                  <h4> {product.titulli} </h4>
                  <p> {product.pershkrimi} </p>
                </div>
                <div className="produkte-header-item-wish-cart">
                  <Button
                    startIcon={<FavoriteBorderOutlinedIcon />}
                    color="primary"
                    style={{ width: "50%" }}
                  >
                    Wish List
                  </Button>
                  <Button
                    startIcon={<LocalMallOutlinedIcon />}
                    color="secondary"
                    style={{ width: "50%" }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
