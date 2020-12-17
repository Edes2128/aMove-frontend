import React, { useContext, useState } from "react";
import AlertContext from "../../context/alertContext/AlertContext";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import Alert from "@material-ui/lab/Alert";

export default function Alerts() {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;

  const [snackbar, showSnackbar] = useState(true);

  const handleClose = () => {
    showSnackbar(false);
  };

  return (
    <>
      {alerts !== null && (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={snackbar}
          autoHideDuration={5000}
          onClose={handleClose}
          message="Porosia u shtua"
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseOutlinedIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        >
          <Alert
            variant="filled"
            onClose={handleClose}
            severity={`${alerts.type}`}
          >
            {alerts.msg}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
