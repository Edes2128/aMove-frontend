import React, { useState, useContext, useEffect } from "react";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import axios from "axios";
import DepoContext from "../../../context/depoContext/DepoContext";
import AlertContext from "../../../context/alertContext/AlertContext";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";

export default function ShtoProduktPopup({ closePopup }) {
  const [titulli, setTitulli] = useState("");
  const [sku, setSku] = useState("");
  const [pershkrimi, setPershkrimi] = useState("");
  const [kategoriForm, setKategoriForm] = useState("");
  const [cmimi, setCmimi] = useState(0);
  const [sasia, setSasia] = useState(0);
  const [njesia, setNjesia] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [productAttributes, setProductAtrributes] = useState([]);
  const [productAttributesNames, setProductAtrributesNames] = useState([]);
  const [productAttributesValuesIDS, setProductAttributesValuesIDS] = useState(
    []
  );
  const depoContext = useContext(DepoContext);
  const alertContext = useContext(AlertContext);
  const { attrNames, attrValues , categoryProducts } = depoContext;
  useEffect(() => {
    depoContext.getAttrNames();
    depoContext.getAttrValues();
    depoContext.getCategoryProducts();
  }, []);

  const ArrayofObject = [];

  attrValues.map((attr) => {
    let data = {
      id: attr.id,
      sku: "",
      cmimi: 0,
      sasia: 0,
    };
    ArrayofObject.push(data);
  });

  const arrayOfObject2 = productAttributesValuesIDS.map((id) =>
    ArrayofObject.filter((arrayObj) => arrayObj.id == id)
  );
  const arrayOfObject3 = arrayOfObject2.map((array) => array[0]);

  const submit = (e) => {
    e.preventDefault();

    let fd = new FormData();
    fd.append("titulli", titulli);
    fd.append("sku", sku);
    fd.append("pershkrimi", pershkrimi);
    fd.append("kategoria", kategoriForm);
    fd.append("cmimi", cmimi);
    fd.append("sasia", sasia);
    fd.append("njesia", njesia);
    fd.append("image", image);
    fd.append("attributes[]", JSON.stringify(arrayOfObject3));
    axios
      .post(
        "https://192.168.88.250/demo_react_server/api/config/shto_produkt.php",
        fd
      )
      .then((res) => {
        if (res.data.status === 0) {
          alertContext.setAlert(
            "Plotesoni fushat,produkti nuk u shtua",
            "error"
          );
        } else if (res.data.status === 1) {
          alertContext.setAlert("Produkti u shtua", "success");
          depoContext.getAllProducts();
          closePopup();
        }
      });
  };

  const addNgjyrat = (e) => {
    if (e.target.checked) {
      setProductAtrributes(productAttributes.concat(e.target.value));
    } else {
      setProductAtrributes(
        productAttributes.filter((attribute) => attribute !== e.target.value)
      );
    }
  };
  const addNames = (e) => {
    if (e.target.checked) {
      setProductAtrributesNames(productAttributesNames.concat(e.target.name));
      setProductAttributesValuesIDS(
        productAttributesValuesIDS.concat(e.target.id)
      );
    } else {
      setProductAtrributesNames(
        productAttributesNames.filter(
          (attribute) => attribute !== e.target.name
        )
      );
      setProductAttributesValuesIDS(
        productAttributesValuesIDS.filter((attr) => attr !== e.target.id)
      );
    }
  };

  const addIDS = (e) => {
    if (e.target.checked) {
      setProductAttributesValuesIDS(
        productAttributesValuesIDS.concat(e.target.id)
      );
    } else {
      setProductAttributesValuesIDS(
        productAttributesValuesIDS.filter((attr) => attr !== e.target.id)
      );
    }
  };

  return (
    <>
      <div className="shtoprodukt-popup">
        <div
          className="shtoprodukt-popup-opa"
          onClick={() => {
            alertContext.setAlert("Shtimi i produktit u anullua", "warning");
            closePopup();
          }}
        ></div>
        <div className="shtoprodukt-popup-form">
          <div className="shtoprodukt-popup-form-header">
            <h2>Shto Produkt</h2>
            <CancelPresentationIcon
              style={{ fontSize: "35px", cursor: "pointer" }}
              onClick={() => {
                alertContext.setAlert(
                  "Shtimi i produktit u anullua",
                  "warning"
                );
                closePopup();
              }}
            />
          </div>
          <form className="form" onSubmit={submit}>
            <div className="form-titulli-sku">
              <div className="titulli">
                <TextField
                  variant="outlined"
                  onChange={(e) => setTitulli(e.target.value)}
                  type="text"
                  style={{ width: "70%" }}
                  placeholder="Titulli"
                  label="Titulli"
                />
              </div>
              <div className="sku">
                <TextField
                  variant="outlined"
                  onChange={(e) => setSku(e.target.value)}
                  type="text"
                  style={{ width: "60%" }}
                  placeholder="SKU"
                  label="SKU"
                />
              </div>
            </div>

            <div className="form-pershkrimi-image">
              <div className="pershkrimi">
                <InputLabel>Pershkrimi</InputLabel>
                <textarea
                  onChange={(e) => setPershkrimi(e.target.value)}
                  style={{ width: "80%", height: "80%" }}
                ></textarea>
              </div>
              <div
                className={image === "" ? "image" : "image outlinestyle-none"}
              >
                {image === "" ? (
                  <>
                    <InputLabel
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      htmlFor="image"
                    >
                      <AddIcon style={{ fontSize: "70px" }} /> upload{" "}
                    </InputLabel>

                    <Input
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                        setFile(URL.createObjectURL(e.target.files[0]));
                      }}
                      id="image"
                      type="file"
                      style={{ display: "none" }}
                    />
                  </>
                ) : (
                  <>
                    <DeleteOutlineOutlinedIcon
                      onClick={() => {
                        setImage("");
                        setFile("");
                      }}
                      className="delete-icon-image"
                    />
                    <img src={file} alt="" />
                  </>
                )}
              </div>
            </div>
            <div className="kategori-cmimi-stock">
              <FormControl variant="outlined">
                <InputLabel htmlFor="kategoria-label">Kategoria</InputLabel>
                <Select
                  onChange={(e) => setKategoriForm(e.target.value)}
                  style={{ width: "150px" }}
                  value={kategoriForm}
                  label="Kategoria"
                  inputProps={{
                    name: "kategoria",
                    id: "kategoria-label",
                  }}
                >
                    {categoryProducts.map(category => (

                        <MenuItem value={category.name}> {category.name} </MenuItem>
                    ))}

                </Select>
              </FormControl>
              <TextField
                variant="outlined"
                onChange={(e) => setCmimi(e.target.value)}
                label="Cmimi"
                placeholder="Cmimi"
                type="number"
              />
              <TextField
                variant="outlined"
                onChange={(e) => setSasia(e.target.value)}
                label="Stock"
                placeholder="Sasia"
                type="number"
              />
              <FormControl variant="outlined">
                <InputLabel htmlFor="njesia-label">Njesia</InputLabel>
                <Select
                  value={njesia}
                  onChange={(e) => setNjesia(e.target.value)}
                  style={{ width: "150px" }}
                  label="Njesia"
                  inputProps={{
                    name: "njesia",
                    id: "njesia-label",
                  }}
                >
                  <MenuItem value="cop">Cop</MenuItem>
                  <MenuItem value="kuti">Kuti</MenuItem>
                  <MenuItem value="pako">Pako</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="atribute-tjera">
              <h3 style={{ marginBottom: "10px" }}>Atribute te tjera</h3>
              <div className="atributes-title">
                {attrNames.map((attr) => (
                  <p key={attr.id_name}>
                    {" "}
                    <AddIcon style={{ fontSize: "15px" }} /> Mundesia e{" "}
                    {attr.name}
                  </p>
                ))}
              </div>

              <div className="ngjyrat-masat">
                {attrNames.map((attr) => (
                  <div className="ngjyrat" key={attr.name}>
                    {attrValues
                      .filter((attrValue) => attrValue.name_id === attr.id_name)
                      .map((newValues) => (
                        <FormControlLabel
                          key={newValues.id}
                          control={
                            <Checkbox
                              id={newValues.id}
                              name={newValues.name}
                              defaultValue={newValues.value}
                              value={newValues.value}
                              onChange={(e) => {
                                addNames(e);
                                addIDS(e);
                                addNgjyrat(e);
                              }}
                              color="primary"
                            />
                          }
                          label={newValues.value}
                        />
                      ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="extra-attr-price">
              {attrNames.map((attrName) => (
                <div
                  className="extra-attr-price-names"
                  style={{
                    display:
                      productAttributesNames.some(
                        (attr) => attr === attrName.name
                      ) === true
                        ? ""
                        : "none",
                  }}
                >
                  <p>{attrName.name}</p>
                  {attrValues
                    .filter(
                      (attrValue) => attrValue.name_id === attrName.id_name
                    )
                    .map((newAttrValue) => (
                      <Accordion
                        style={{
                          backgroundColor: "#ededed",
                          display:
                            productAttributes.some(
                              (attr) => attr === newAttrValue.value
                            ) === true
                              ? ""
                              : "none",
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          {newAttrValue.value}
                        </AccordionSummary>
                        <Divider />
                        <AccordionDetails className="accordion-details">
                          {ArrayofObject.filter(
                            (arrObject) => arrObject.id === newAttrValue.id
                          ).map((values) => (
                            <>
                              <TextField
                                label="SKU"
                                variant="outlined"
                                onChange={(e) => {
                                  values.sku = e.target.value;
                                }}
                              />
                              <TextField
                                label="Cmimi"
                                variant="outlined"
                                type="number"
                                onChange={(e) => {
                                  values.cmimi = e.target.value;
                                }}
                              />
                              <TextField
                                label="Sasia"
                                variant="outlined"
                                type="number"
                                onChange={(e) => {
                                  values.sasia = e.target.value;
                                }}
                              />
                            </>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    ))}
                </div>
              ))}
            </div>
            <div className="submit-cancel">
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => {
                  closePopup();
                  alertContext.setAlert(
                    "Shtimi i produktit u anullua",
                    "warning"
                  );
                }}
              >
                Anullo
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Publiko
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
