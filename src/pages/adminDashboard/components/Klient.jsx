import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { Button, TextField } from "@material-ui/core";
import {Link} from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import Pagination from '@material-ui/lab/Pagination';
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import { Label, LabelImportant } from "@material-ui/icons";

export default function Klient() {
const [kategori, Setkategori] = useState("");
const [zona, Setzona] = useState("");
const [page,setPage] = useState(1);
const [itemPage,setItempage] = useState(5);
const start = (page - 1) * itemPage;
const end = page * itemPage;

    const rows = [

        {
            id:1,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        },
        {
            id:2,
            emri:'Ermir Dalipi',
            data: '7/4/2020',
            klienti:'Ermir',
            vlera: 1032400,
            zona:'Vorri Bomit'
        },{
            id:3,
            emri:'Miranda Budallaqe',
            data: '22/12/2019',
            klienti:'Miranda',
            vlera: 1002340,
            zona:'Dersnik'
        },{
            id:4,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 10,
            zona:'Shkolla e baletit'
        },{
            id:5,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 2500,
            zona:'Shkolla e baletit'
        }
        ,{
            id:6,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        },{
            id:7,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        }
        ,{
            id:8,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        },
        {
            id:9,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        },
        {
            id:10,
            emri:'Ermir Dalipi',
            data: '7/4/2020',
            klienti:'Ermir',
            vlera: 1032400,
            zona:'Vorri Bomit'
        },{
            id:11,
            emri:'Miranda Budallaqe',
            data: '22/12/2019',
            klienti:'Miranda',
            vlera: 1002340,
            zona:'Dersnik'
        },{
            id:12,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 13,
            zona:'Shkolla e baletit'
        },{
            id:14,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 2500,
            zona:'Shkolla e baletit'
        }
        ,{
            id:15,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        },{
            id:16,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        }
        ,{
            id:17,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        },
        {
            id:18,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        },
        {
            id:19,
            emri:'Ermir Dalipi',
            data: '7/4/2020',
            klienti:'Ermir',
            vlera: 1032400,
            zona:'Vorri Bomit'
        },{
            id:20,
            emri:'Miranda Budallaqe',
            data: '22/12/2019',
            klienti:'Miranda',
            vlera: 1002340,
            zona:'Dersnik'
        },{
            id:21,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 10,
            zona:'Shkolla e baletit'
        },{
            id:22,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 2500,
            zona:'Shkolla e baletit'
        }
        ,{
            id:23,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        },{
            id:24,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        }
        ,{
            id:25,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        },
        {
            id:26,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        },
        {
            id:27,
            emri:'Ermir Dalipi',
            data: '7/4/2020',
            klienti:'Ermir',
            vlera: 1032400,
            zona:'Vorri Bomit'
        },{
            id:28,
            emri:'Miranda Budallaqe',
            data: '22/12/2019',
            klienti:'Miranda',
            vlera: 1002340,
            zona:'Dersnik'
        },{
            id:29,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 13,
            zona:'Shkolla e baletit'
        },{
            id:30,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 2500,
            zona:'Shkolla e baletit'
        }
        ,{
            id:31,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        },{
            id:32,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        }
        ,{
            id:33,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        },
        
        {
            id:34,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        },
        {
            id:35,
            emri:'Ermir Dalipi',
            data: '7/4/2020',
            klienti:'Ermir',
            vlera: 1032400,
            zona:'Vorri Bomit'
        },{
            id:36,
            emri:'Miranda Budallaqe',
            data: '22/12/2019',
            klienti:'Miranda',
            vlera: 1002340,
            zona:'Dersnik'
        },{
            id:37,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 10,
            zona:'Shkolla e baletit'
        },{
            id:38,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 2500,
            zona:'Shkolla e baletit'
        }
        ,{
            id:39,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        },{
            id:40,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        }
        ,{
            id:41,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        },
        {
            id:42,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        },
        {
            id:43,
            emri:'Ermir Dalipi',
            data: '7/4/2020',
            klienti:'Ermir',
            vlera: 1032400,
            zona:'Vorri Bomit'
        },{
            id:44,
            emri:'Miranda Budallaqe',
            data: '22/12/2019',
            klienti:'Miranda',
            vlera: 1002340,
            zona:'Dersnik'
        },{
            id:45,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 13,
            zona:'Shkolla e baletit'
        },{
            id:46,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 2500,
            zona:'Shkolla e baletit'
        }
        ,{
            id:47,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        },{
            id:48,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        }
        ,{
            id:49,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        },
        {
            id:50,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        },
        {
            id:51,
            emri:'Ermir Dalipi',
            data: '7/4/2020',
            klienti:'Ermir',
            vlera: 1032400,
            zona:'Vorri Bomit'
        },{
            id:52,
            emri:'Miranda Budallaqe',
            data: '22/12/2019',
            klienti:'Miranda',
            vlera: 1002340,
            zona:'Dersnik'
        },{
            id:53,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 10,
            zona:'Shkolla e baletit'
        },{
            id:54,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 2500,
            zona:'Shkolla e baletit'
        }
        ,{
            id:55,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        },{
            id:56,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        }
        ,{
            id:57,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        },
        {
            id:58,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        },
        {
            id:59,
            emri:'Ermir Dalipi',
            data: '7/4/2020',
            klienti:'Ermir',
            vlera: 1032400,
            zona:'Vorri Bomit'
        },{
            id:60,
            emri:'Miranda Budallaqe',
            data: '22/12/2019',
            klienti:'Miranda',
            vlera: 1002340,
            zona:'Dersnik'
        },{
            id:61,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 13,
            zona:'Shkolla e baletit'
        },{
            id:62,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 2500,
            zona:'Shkolla e baletit'
        }
        ,{
            id:63,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        },{
            id:64,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        }
        ,{
            id:65,
            emri:'Edes Sulce',
            data: '10/12/2020',
            klienti:'Edes',
            vlera: 1000,
            zona:'Shkolla e baletit'
        },

    ];

    const handleChange = (event, value) => {
        setPage(value);
      };
  return (
    <div className="klient">
      <div className="admin-klient">
        <div className="admin-klient-cat">
          <div className="admin-klient-cat-content">
            <p className="all-client">Te gjithe klientet</p>
            <p className="all-client-num">138</p>
            <span style={{display:'flex'}} className="span-client-offer">
              20% <p>(30 dite)</p>
            </span>
          </div>
          <div className="admin-klient-cat-icon">
            <PeopleAltOutlinedIcon style={{ fontSize: 40 }} />
          </div>
        </div>

        <div className="admin-klient-cat">
          <div className="admin-klient-cat-content">
            <InputLabel id="kategori">Kategoria</InputLabel>
            <Select
              labelId="kategori"
              value={kategori === "" ? "none" : kategori}
              onChange={(e) => Setkategori(e.target.value)}
            >
              <MenuItem value="None">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Kategoria 1</MenuItem>
              <MenuItem value={2}>Kategoria 2</MenuItem>
              <MenuItem value={3}>Kategoria 3</MenuItem>
            </Select>

            <span className="span-client-offer">Asnje kategori e zgjedhur</span>
          </div>
          <div className="admin-klient-cat-icon">
            <CategoryOutlinedIcon style={{ fontSize: 40 }} />
          </div>
        </div>

        <div className="admin-klient-cat">
          <div className="admin-klient-cat-content">
            <InputLabel id="zona">Zona</InputLabel>
            <Select
              labelId="zona"
              value={zona === "" ? "none" : zona}
              onChange={(e) => Setzona(e.target.value)}
            >
              <MenuItem value="none">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Zona 1</MenuItem>
              <MenuItem value={2}>Zona 2</MenuItem>
              <MenuItem value={3}>Zona 3</MenuItem>
            </Select>
            <span className="span-client-offer">Asnje zone e zgjedhur</span>
          </div>
          <div className="admin-klient-cat-icon">
            <ExploreOutlinedIcon style={{ fontSize: 40 }} />
          </div>
        </div>
      </div>
      <div className="data-table-klient">
        <div className="table-first-div">
          <h2>Klientet</h2>

            <div className="table-search-add">
              <TextField
              size="small"
              placeholder="Kerko"
              type="search"
              label="Kerko"
              variant="outlined"
             >
             </TextField>
                <Button variant="contained"  color="primary"><GroupAddOutlinedIcon style={{marginRight:'10px'}}/><Link style={{color:'white',textDecoration:'none'}} to="/admin/klient/shto">Shto klient</Link></Button>
            </div>
        </div>

        <div className="data-table">
            <Table size="medium">

                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="left">Emri</TableCell>
                        <TableCell align="left">Data</TableCell>
                        <TableCell align="left">Klienti</TableCell>
                        <TableCell align="left">Vlera</TableCell>
                        <TableCell align="left">Zona</TableCell>
                        <TableCell align="center">Veprimet</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
            {rows.slice(start,end).map((row) => (
                    <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.emri}</TableCell>
                            <TableCell>{row.data}</TableCell>
                            <TableCell>{row.klienti}</TableCell>
                            <TableCell>{row.vlera}</TableCell>
                            <TableCell>{row.zona}</TableCell>
                            <TableCell align="center">
                                <div className="veprime" style={{cursor:'pointer'}}>
                                    <VisibilityOutlinedIcon/>
                                    <EditOutlinedIcon/>
                                    <DeleteOutlineOutlinedIcon/>
                                </div>
                            </TableCell>
                    </TableRow>
            ))}
                </TableBody>
            </Table>
            <div className="pagination">
                <div style={{display:'flex',alignItems:'center'}}>
            <InputLabel style={{marginRight:'10px'}} id="row">User ne faqe</InputLabel>
            <Select
              labelId="row"
              onChange={(e) => setItempage(e.target.value)}
              value={itemPage}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
            </div>
            <Pagination count={Math.ceil(rows.length / itemPage)} color="primary" page={page} size="large"  onChange={handleChange} />
            </div>
        </div>
      </div>
    </div>
  );
}
