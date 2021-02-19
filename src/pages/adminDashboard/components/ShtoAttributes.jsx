import React, { useState, useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import TextField from '@material-ui/core/TextField';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import AlertContext from '../../../context/alertContext/AlertContext';
import DepoContext from '../../../context/depoContext/DepoContext';
import axios from 'axios';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import RemoveRedEyeOutlinedIcon from '@material-ui/icons/RemoveRedEyeOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Pagination from '@material-ui/lab/Pagination';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';

export default function ShtoAttributes() {
  const [shtoAttrPop, showAttrPop] = useState(false);
  const [attrValue, setAttrValue] = useState('');
  const [shtoValueAttrPop, showAttrPopValue] = useState(false);
  const [attrFromSelect, getAttrFromSelect] = useState('');
  const [attrnameValue, setAttrNameValue] = useState('');
  const alertContext = useContext(AlertContext);
  const depoContext = useContext(DepoContext);
  const { attrNames, attrValues } = depoContext;
  const [seeAttrNames, showAllAttrNames] = useState(false);
  const [itemPage, setItempage] = useState(5);
  const [editPop, showEditPop] = useState(false);
  const [page, setPage] = useState(1);
  const start = (page - 1) * itemPage;
  const end = page * itemPage;
  const [editValue, setEditvalue] = useState('');
  const [editID, setEditID] = useState('');
  const [deletePop, showDeletePop] = useState(false);
  const [deleteID, setDeleteID] = useState('');
  const [deleteAttrPop, setDeleteAttrPop] = useState(false);
  const [idDeleteAttr, setIdDeleteAttr] = useState('');
  const [propertyName, setProperty] = useState({
    key: 'id',
    direction: 'descending'
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      propertyName &&
      propertyName.key === key &&
      propertyName.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setProperty({ key, direction });
  };
  if (propertyName !== null) {
    attrValues.sort((a, b) => {
      if (a[propertyName.key] < b[propertyName.key]) {
        return propertyName.direction === 'ascending' ? -1 : 1;
      }
      if (a[propertyName.key] > b[propertyName.key]) {
        return propertyName.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }

  useEffect(() => {
    depoContext.getAttrNames();
    depoContext.getAttrValues();
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <>
      {deletePop && (
        <div className="delete-attr-pop">
          <div
            className="delete-attr-pop-opa"
            onClick={() => showDeletePop(false)}
          ></div>

          <div className="delete-attr-pop-container">
            <CloseOutlinedIcon
              style={{
                alignSelf: 'flex-end',
                marginRight: '20px',
                cursor: 'pointer'
              }}
              onClick={() => showDeletePop(false)}
            />
            <p>Jeni te sigurt qe deshironi ta fshini?</p>
            <div className="delete-attr-pop-container-buttons">
              <Button
                color="primary"
                variant="outlined"
                size="large"
                onClick={() => {
                  axios
                    .post('https://amove.alcodeit.com/delete_attr_value.php', {
                      id: deleteID
                    })
                    .then((res) => {
                      if (res.data.status === 1) {
                        alertContext.setAlert(`${res.data.message}`, 'success');
                        depoContext.getAttrValues();
                        showDeletePop(false);
                      } else {
                        alertContext.setAlert(`${res.data.message}`, 'error');
                      }
                    });
                }}
              >
                PO
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                size="large"
                onClick={() => showDeletePop(false)}
              >
                JO
              </Button>
            </div>
          </div>
        </div>
      )}

      {editPop && (
        <div className="edit-attr-pop">
          <div
            className="edit-attr-pop-opa"
            onClick={() => showEditPop(false)}
          ></div>
          <div className="edit-attr-pop-container">
            <CloseOutlinedIcon
              style={{
                alignSelf: 'flex-end',
                marginRight: '20px',
                cursor: 'pointer'
              }}
              onClick={() => showEditPop(false)}
            />

            <TextField
              value={editValue}
              variant="outlined"
              onChange={(e) => setEditvalue(e.target.value)}
              style={{ width: '50%' }}
              type="text"
            />

            <div className="edit-attr-pop-container-buttons">
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  axios
                    .post('https://amove.alcodeit.com/edit_attr_value.php', {
                      name_id: editID,
                      value: editValue
                    })
                    .then((res) => {
                      if (res.data.status === 1) {
                        alertContext.setAlert(`${res.data.message}`, 'success');
                        showEditPop(false);
                        depoContext.getAttrValues();
                      } else {
                        alertContext.setAlert(`${res.data.message}`, 'error');
                      }
                    });
                }}
              >
                Ruaj
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => showEditPop(false)}
              >
                Anullo
              </Button>
            </div>
          </div>
        </div>
      )}

      {seeAttrNames && (
        <div className="see-attr-names-pop">
          <div
            className="see-attr-names-pop-opa"
            onClick={() => showAllAttrNames(false)}
          ></div>
          <div
            className={
              deleteAttrPop === true
                ? 'see-attr-names-pop-delete show-see-attr-names-pop-delete'
                : 'see-attr-names-pop-delete'
            }
          >
            <p>
              Jeni te sigurt qe doni te fshini atributin? Me fshirjen e
              atributit do fshihen dhe vlerat e tij.
            </p>
            <div className="see-attr-names-pop-delete-buttons">
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  axios
                    .post('https://amove.alcodeit.com/delete_attr.php', {
                      id: idDeleteAttr
                    })
                    .then((res) => {
                      if (res.data.status === 1) {
                        depoContext.getAttrValues();
                        depoContext.getAttrNames();
                        alertContext.setAlert(`${res.data.message}`, 'success');
                        setDeleteAttrPop(false);
                      } else {
                        alertContext.setAlert(`${res.data.message}`, 'error');
                      }
                    });
                }}
              >
                Po
              </Button>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => {
                  setDeleteAttrPop(false);
                }}
              >
                Jo
              </Button>
            </div>
          </div>
          <div className="see-attr-names-pop-container">
            <CloseOutlinedIcon
              style={{
                top: '5px',
                right: '5px',
                cursor: 'pointer',
                position: 'absolute'
              }}
              onClick={() => showAllAttrNames(false)}
            />

            {attrNames.length > 0 ? (
              <>
                {attrNames.map((attr) => (
                  <Chip
                    disabled={deleteAttrPop === true ? true : false}
                    style={{ margin: '10px' }}
                    variant="outlined"
                    color="primary"
                    label={attr.name}
                    size="medium"
                    clickable
                    onDelete={() => {
                      setDeleteAttrPop(true);
                      setIdDeleteAttr(attr.id_name);
                    }}
                  />
                ))}
              </>
            ) : (
              <p>Ska atribute</p>
            )}
          </div>
        </div>
      )}

      {shtoValueAttrPop && (
        <div className="shto-attributes-values-pop">
          <div
            className="shto-attributes-values-pop-opa"
            onClick={() => showAttrPopValue(false)}
          ></div>
          <div className="shto-attributes-values-pop-container">
            <CloseOutlinedIcon
              style={{
                alignSelf: 'flex-end',
                marginRight: '20px',
                cursor: 'pointer'
              }}
              onClick={() => showAttrPopValue(false)}
            />
            <div style={{ width: '50%' }}>
              <InputLabel id="zonaForm">Attributes</InputLabel>
              <Select
                style={{ width: '100%' }}
                labelId="zonaForm"
                value={attrFromSelect}
                onChange={(e) => getAttrFromSelect(e.target.value)}
                variant="outlined"
              >
                <MenuItem value="None"></MenuItem>

                {attrNames.map((attr) => (
                  <MenuItem value={attr.id_name}> {attr.name} </MenuItem>
                ))}
              </Select>
            </div>
            <TextField
              value={attrnameValue}
              style={{ width: '50%' }}
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
                      'https://amove.alcodeit.com/add_values_in_attributes.php',
                      { name_id: attrFromSelect, value: attrnameValue }
                    )
                    .then((res) => {
                      if (res.data.status === 1) {
                        alertContext.setAlert(`${res.data.message}`, 'success');
                        getAttrFromSelect('');
                        setAttrNameValue('');
                        depoContext.getAttrValues();
                      } else {
                        alertContext.setAlert(`${res.data.message}`, 'error');
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
                      'https://amove.alcodeit.com/add_values_in_attributes.php',
                      { name_id: attrFromSelect, value: attrnameValue }
                    )
                    .then((res) => {
                      if (res.data.status === 1) {
                        alertContext.setAlert(`${res.data.message}`, 'success');
                        getAttrFromSelect('');
                        setAttrNameValue('');
                        depoContext.getAttrValues();
                        showAttrPopValue(false);
                        axios.get(
                          'https://amove.alcodeit.com/get_name_values_attribues.php'
                        );
                      } else {
                        alertContext.setAlert(`${res.data.message}`, 'error');
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
            onClick={() => {
              setAttrValue('');
              showAttrPop(false);
            }}
          ></div>
          <div className="shto-attributes-pop-container">
            <CloseOutlinedIcon
              style={{
                alignSelf: 'flex-end',
                marginRight: '20px',
                cursor: 'pointer'
              }}
              onClick={() => {
                showAttrPop(false);
                setAttrValue('');
              }}
            />
            <TextField
              onChange={(e) => setAttrValue(e.target.value)}
              label="Emri i Atributit"
              variant="outlined"
              style={{ width: '60%' }}
              value={attrValue}
            />
            <div className="shto-attributes-pop-container-buttons">
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {
                  axios
                    .post('https://amove.alcodeit.com/add_new_attribute.php', {
                      name: attrValue
                    })
                    .then((res) => {
                      if (res.data.status === 1) {
                        setAttrValue('');
                        alertContext.setAlert(
                          `${res.data.messagge}`,
                          'success'
                        );
                        depoContext.getAttrNames();
                      } else {
                        alertContext.setAlert(`${res.data.messagge}`, 'error');
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
                    .post('https://amove.alcodeit.com/add_new_attribute.php', {
                      name: attrValue
                    })
                    .then((res) => {
                      if (res.data.status === 1) {
                        setAttrValue('');
                        alertContext.setAlert(
                          `${res.data.messagge}`,
                          'success'
                        );
                        depoContext.getAttrNames();
                        showAttrPop(false);
                      } else {
                        alertContext.setAlert(`${res.data.messagge}`, 'error');
                      }
                    });
                }}
              >
                {' '}
                Ruaj dhe Dil{' '}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="shto-attributes">
        <div className="shto-attributes-header">
          <h3>Attributet</h3>
          <div className="shto-attributes-header-buttons">
            <Button
              startIcon={<RemoveRedEyeOutlinedIcon />}
              color="primary"
              variant="outlined"
              onClick={() => showAllAttrNames(true)}
            >
              {' '}
              Shiko atributet{' '}
            </Button>
            <Button
              startIcon={<AddCircleOutlineOutlinedIcon />}
              color="primary"
              variant="outlined"
              onClick={() => {
                showAttrPop(true);
              }}
            >
              Shto atribut te ri
            </Button>
            <Button
              startIcon={<AddCircleOutlineOutlinedIcon />}
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
              <TableCell align="center" onClick={() => requestSort('id')}>
                ID
                {propertyName.key === 'id' &&
                  propertyName.direction === 'ascending' && (
                    <ArrowUpwardOutlinedIcon style={{ fontSize: '17px' }} />
                  )}
                {propertyName.key === 'id' &&
                  propertyName.direction === 'descending' && (
                    <ArrowDownwardOutlinedIcon style={{ fontSize: '17px' }} />
                  )}
              </TableCell>
              <TableCell align="center" onClick={() => requestSort('name')}>
                Emri
                {propertyName.key === 'name' &&
                  propertyName.direction === 'ascending' && (
                    <ArrowUpwardOutlinedIcon style={{ fontSize: '17px' }} />
                  )}
                {propertyName.key === 'name' &&
                  propertyName.direction === 'descending' && (
                    <ArrowDownwardOutlinedIcon style={{ fontSize: '17px' }} />
                  )}
              </TableCell>
              <TableCell align="center" onClick={() => requestSort('value')}>
                Vlera
                {propertyName.key === 'value' &&
                  propertyName.direction === 'ascending' && (
                    <ArrowUpwardOutlinedIcon style={{ fontSize: '17px' }} />
                  )}
                {propertyName.key === 'value' &&
                  propertyName.direction === 'descending' && (
                    <ArrowDownwardOutlinedIcon style={{ fontSize: '17px' }} />
                  )}
              </TableCell>
              <TableCell align="center">Veprimet</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attrValues.slice(start, end).map((attr) => (
              <TableRow>
                <TableCell align="center"> {attr.id} </TableCell>
                <TableCell align="center"> {attr.name} </TableCell>
                <TableCell align="center"> {attr.value} </TableCell>
                <TableCell align="center">
                  <EditOutlinedIcon
                    onClick={() => {
                      showEditPop(true);
                      setEditvalue(attr.value);
                      setEditID(attr.id);
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                  <DeleteOutlineOutlinedIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      showDeletePop(true);
                      setDeleteID(attr.id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="pagination">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <InputLabel style={{ marginRight: '10px' }} id="row">
              Attribute ne faqe
            </InputLabel>
            <Select
              labelId="row"
              onChange={(e) => {
                setItempage(e.target.value);
              }}
              value={itemPage}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </div>
          <Pagination
            count={Math.ceil(attrValues.length / itemPage)}
            color="primary"
            page={page}
            size="large"
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
}
