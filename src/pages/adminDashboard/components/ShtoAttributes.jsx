import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import TextField from "@material-ui/core/TextField";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import AlertContext from "../../../context/alertContext/AlertContext";
import axios from "axios";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

export default function ShtoAttributes() {
  const [shtoAttrPop, showAttrPop] = useState(false);
  const [attrValue, setAttrValue] = useState("");
  const [shtoValueAttrPop, showAttrPopValue] = useState(false);
  const [attrFromSelect, getAttrFromSelect] = useState("");
  const [attrnameValue, setAttrNameValue] = useState("");
  const alertContext = useContext(AlertContext);
  const [allAttrNames, setAllAttrNames] = useState([]);
  const [allValueNameAttrAll, setValueNameAttrAll] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://192.168.88.250/demo_react_server/api/config/get_all_attr_names.php"
      )
      .then((res) => {
        setAllAttrNames(res.data);
      });
    axios
      .get(
        "https://192.168.88.250/demo_react_server/api/config/get_name_values_attribues.php"
      )
      .then((res) => {
        setValueNameAttrAll(res.data);
      });
  }, []);

  return (
    <>
      {shtoValueAttrPop && (
        <div className="shto-attributes-values-pop">
          <div
            className="shto-attributes-values-pop-opa"
            onClick={() => showAttrPopValue(false)}
          ></div>
          <div className="shto-attributes-values-pop-container">
            <CloseOutlinedIcon
              style={{
                alignSelf: "flex-end",
                marginRight: "20px",
                cursor: "pointer",
              }}
              onClick={() => showAttrPopValue(false)}
            />
            <div style={{ width: "50%" }}>
              <InputLabel id="zonaForm">Attributes</InputLabel>
              <Select
                style={{ width: "100%" }}
                labelId="zonaForm"
                value={attrFromSelect}
                onChange={(e) => getAttrFromSelect(e.target.value)}
                variant="outlined"
              >
                <MenuItem value="None"></MenuItem>

                {allAttrNames.map((attr) => (
                  <MenuItem value={attr.id_name}> {attr.name} </MenuItem>
                ))}
              </Select>
            </div>
            <TextField
              value={attrnameValue}
              style={{ width: "50%" }}
              onChange={(e) => setAttrNameValue(e.target.value)}
              variant="outlined"
              label="Vlera e atributit"
            />
            <div className="shto-attributes-values-pop-conatainer-buttons">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  axios
                    .post(
                      "https://192.168.88.250/demo_react_server/api/config/add_values_in_attributes.php",
                      { name_id: attrFromSelect, value: attrnameValue }
                    )
                    .then((res) => {
                      if (res.data.status === 1) {
                        alertContext.setAlert(`${res.data.message}`, "success");
                        getAttrFromSelect("");
                        setAttrNameValue("");
                        axios.get(
                          "https://192.168.88.250/demo_react_server/api/config/get_name_values_attribues.php"
                        );
                      } else {
                        alertContext.setAlert(`${res.data.message}`, "error");
                      }
                    });
                }}
              >
                Ruaj
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  axios
                    .post(
                      "https://192.168.88.250/demo_react_server/api/config/add_values_in_attributes.php",
                      { name_id: attrFromSelect, value: attrnameValue }
                    )
                    .then((res) => {
                      if (res.data.status === 1) {
                        alertContext.setAlert(`${res.data.message}`, "success");
                        getAttrFromSelect("");
                        setAttrNameValue("");
                        showAttrPopValue(false);
                        axios.get(
                          "https://192.168.88.250/demo_react_server/api/config/get_name_values_attribues.php"
                        );
                      } else {
                        alertContext.setAlert(`${res.data.message}`, "error");
                      }
                    });
                }}
              >
                Ruaj dhe Dil
              </Button>
            </div>
          </div>
        </div>
      )}

      {shtoAttrPop && (
        <div className="shto-attributes-pop">
          <div
            className="shto-attributes-pop-opa"
            onClick={() => showAttrPop(false)}
          ></div>
          <div className="shto-attributes-pop-container">
            <CloseOutlinedIcon
              style={{
                alignSelf: "flex-end",
                marginRight: "20px",
                cursor: "pointer",
              }}
              onClick={() => showAttrPop(false)}
            />
            <TextField
              onChange={(e) => setAttrValue(e.target.value)}
              label="Emri i Atributit"
              variant="outlined"
              style={{ width: "60%" }}
              value={attrValue}
            />
            <div className="shto-attributes-pop-container-buttons">
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  axios
                    .post(
                      "https://192.168.88.250/demo_react_server/api/config/add_new_attribute.php",
                      { name: attrValue }
                    )
                    .then((res) => {
                      if (res.data.status === 1) {
                        setAttrValue("");
                        alertContext.setAlert(
                          `${res.data.messagge}`,
                          "success"
                        );
                        axios.get(
                          "https://192.168.88.250/demo_react_server/api/config/get_all_attr_names.php"
                        );
                      } else {
                        alertContext.setAlert(`${res.data.messagge}`, "error");
                      }
                    });
                }}
              >
                Ruaj
              </Button>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  axios
                    .post(
                      "https://192.168.88.250/demo_react_server/api/config/add_new_attribute.php",
                      { name: attrValue }
                    )
                    .then((res) => {
                      if (res.data.status === 1) {
                        setAttrValue("");
                        alertContext.setAlert(
                          `${res.data.messagge}`,
                          "success"
                        );
                        axios.get(
                          "https://192.168.88.250/demo_react_server/api/config/get_all_attr_names.php"
                        );
                        showAttrPop(false);
                      } else {
                        alertContext.setAlert(`${res.data.messagge}`, "error");
                      }
                    });
                }}
              >
                {" "}
                Ruaj dhe Dil{" "}
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="shto-attributes">
        <div className="shto-attributes-header">
          <h3>Attributet</h3>
          <div className="shto-attributes-header-buttons">
              <Button color="primary" variant="outlined" > Shiko atrtibutet </Button>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                showAttrPop(true);
              }}
            >
              Shto atribut te ri
            </Button>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => showAttrPopValue(true)}
            >
              Shto vlera ne atribut
            </Button>
          </div>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Emri</TableCell>
              <TableCell align="center">Vlera</TableCell>
              <TableCell align="center">Veprimet</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allValueNameAttrAll.map((attr) => (
              <TableRow>
                <TableCell align="center"> {attr.id} </TableCell>
                <TableCell align="center"> {attr.name} </TableCell>
                <TableCell align="center"> {attr.value} </TableCell>
                <TableCell align="center">
                  <EditOutlinedIcon />
                  <DeleteOutlineOutlinedIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
