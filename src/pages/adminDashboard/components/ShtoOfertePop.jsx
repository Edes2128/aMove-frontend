import React from "react";
import { CloseOutlined } from "@material-ui/icons";
import TextField from '@material-ui/core/TextField';


export default function ShtoOfertePop({ closePop }) {

    return (
        <div className="shto-oferte-pop" >
            <div className="shto-oferte-pop-opa"
                onClick={closePop} ></div>
            <div className="shto-oferte-pop-container" >
                <CloseOutlined style={
                    {
                        alignSelf: "flex-end",
                        marginRight: "10px",
                        marginTop: "5px",
                        fontSize: "30px",
                        cursor: "pointer",
                    }
                }
                    onClick={closePop}
                />

                <div className="shto-oferte-pop-container-titulli" >
                    <TextField style={
                        { width: '90%' }}
                        variant="outlined"
                        label="Titulli" />
                </div>
            </div>
        </div>
    );
}