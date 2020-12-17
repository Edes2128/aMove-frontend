import React, { useContext, useState } from "react";
import AlertContext from "../../context/alertContext/AlertContext";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export default function Alerts() {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;

  const handleClose = () => {
    alerts.removeAlert();
  };

  return (
    <>
      {alerts !== null && (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={alerts !== null ? true : false}
          autoHideDuration={7000}
          onClose={() => alerts.removeAlert()}
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
