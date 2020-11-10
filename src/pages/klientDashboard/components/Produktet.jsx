import React from "react";
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

export default function Produktet() {
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
            <div className="produktet-list-item">
              <div className="produkte-header-item-image">
                <img width="100" src="/produkt1.jpg" alt="" />
              </div>
              <div className="produktet-list-item-price">
                <p>10$</p>
              </div>
              <div className="produkte-header-item-title-description">
                <h4>TRACFONE - Bring your own phone</h4>
                <p>Use your compatible cell phone on the Tracfone</p>
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

            <div className="produktet-list-item">
              <div className="produkte-header-item-image">
                <img width="100" src="/produkt1.jpg" alt="" />
              </div>
              <div className="produktet-list-item-price">
                <p>10$</p>
              </div>
              <div className="produkte-header-item-title-description">
                <h4>TRACFONE - Bring your own phone</h4>
                <p>Use your compatible cell phone on the Tracfone</p>
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

            <div className="produktet-list-item">
              <div className="produkte-header-item-image">
                <img width="100" src="/produkt1.jpg" alt="" />
              </div>
              <div className="produktet-list-item-price">
                <p>10$</p>
              </div>
              <div className="produkte-header-item-title-description">
                <h4>TRACFONE - Bring your own phone</h4>
                <p>Use your compatible cell phone on the Tracfone</p>
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

            <div className="produktet-list-item">
              <div className="produkte-header-item-image">
                <img width="100" src="/produkt1.jpg" alt="" />
              </div>
              <div className="produktet-list-item-price">
                <p>10$</p>
              </div>
              <div className="produkte-header-item-title-description">
                <h4>TRACFONE - Bring your own phone</h4>
                <p>Use your compatible cell phone on the Tracfone</p>
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

            <div className="produktet-list-item">
              <div className="produkte-header-item-image">
                <img width="100" src="/produkt1.jpg" alt="" />
              </div>
              <div className="produktet-list-item-price">
                <p>10$</p>
              </div>
              <div className="produkte-header-item-title-description">
                <h4>TRACFONE - Bring your own phone</h4>
                <p>Use your compatible cell phone on the Tracfone</p>
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

            <div className="produktet-list-item">
              <div className="produkte-header-item-image">
                <img width="100" src="/produkt1.jpg" alt="" />
              </div>
              <div className="produktet-list-item-price">
                <p>10$</p>
              </div>
              <div className="produkte-header-item-title-description">
                <h4>TRACFONE - Bring your own phone</h4>
                <p>Use your compatible cell phone on the Tracfone</p>
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

            <div className="produktet-list-item">
              <div className="produkte-header-item-image">
                <img width="100" src="/produkt1.jpg" alt="" />
              </div>
              <div className="produktet-list-item-price">
                <p>10$</p>
              </div>
              <div className="produkte-header-item-title-description">
                <h4>TRACFONE - Bring your own phone</h4>
                <p>Use your compatible cell phone on the Tracfone</p>
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

            <div className="produktet-list-item">
              <div className="produkte-header-item-image">
                <img width="100" src="/produkt1.jpg" alt="" />
              </div>
              <div className="produktet-list-item-price">
                <p>10$</p>
              </div>
              <div className="produkte-header-item-title-description">
                <h4>TRACFONE - Bring your own phone</h4>
                <p>Use your compatible cell phone on the Tracfone</p>
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

            <div className="produktet-list-item">
              <div className="produkte-header-item-image">
                <img width="100" src="/produkt1.jpg" alt="" />
              </div>
              <div className="produktet-list-item-price">
                <p>10$</p>
              </div>
              <div className="produkte-header-item-title-description">
                <h4>TRACFONE - Bring your own phone</h4>
                <p>Use your compatible cell phone on the Tracfone</p>
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
          </div>
        </div>
      </div>
    </div>
  );
}
