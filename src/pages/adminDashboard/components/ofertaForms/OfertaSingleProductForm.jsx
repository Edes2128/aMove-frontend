import React from "react";
import TextField from "@material-ui/core/TextField";

export default function OfertaSingleProductForm() {
 
    return (
    <div>
      <TextField
        label="Data e fillimit"
        onChange={(e) => console.log(e.target.value)}
        variant="outlined"
        type="date"
        InputLabelProps={{
            shrink: true,
          }}
      />
    </div>
  );

}
