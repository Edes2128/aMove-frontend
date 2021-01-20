import React, { useContext, useState, useEffect } from "react";
import DepoContext from "../../../context/depoContext/DepoContext";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import axios from "axios";
import AlertContext from "../../../context/alertContext/AlertContext";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import AddIcon from "@material-ui/icons/Add";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

export default function AccountDetails() {
  const depoContext = useContext(DepoContext);
  const alertContext = useContext(AlertContext);
  const { user } = depoContext;
  const [userSettings, setUserSettings] = useState("general");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [deletedImage, setDeletedImage] = useState(false);
  const [editImage, setEditImage] = useState("");
  const [editFile, setEditFile] = useState("");

  useEffect(() => {

        setEditImage(user.image_profile);
        setEditFile(user.image_profile);
        setEditName(user.name);
        setEditEmail(user.email);

    
  },);

  const onChangeGeneral = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("id", user.id);
    fd.append("name", editName);
    fd.append("email", editEmail);
    fd.append("image", editImage);

    axios
      .post(
        "https://192.168.88.250/demo_react_server/api/config/change_general_settings.php",
        fd
      )
      .then((res) => {
        if (res.data.status === 1) {
          alertContext.setAlert(`${res.data.message}`, "success");
          depoContext.getUser();
        } else {
          alertContext.setAlert(`${res.data.message}`, "error");
        }
      });
  };

  const onChangePassword = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://192.168.88.250/demo_react_server/api/config/change_password.php",
        { id: user.id, newPassword: newPassword, oldPassword: currentPassword }
      )
      .then((res) => {
        if (res.data.status === 1) {
          alertContext.setAlert(`${res.data.message}`, "success");
          setNewPassword("");
          setCurrentPassword("");
        } else {
          alertContext.setAlert(`${res.data.message}`, "error");
        }
      });
  };

  return (
    <>
      <div className="account-details">
        <div className="account-details-buttons">
          <Button
            style={{
              color: userSettings === "general" ? "#1b75bc" : "inherit",
            }}
            onClick={() => setUserSettings("general")}
          >
            {" "}
            General Info{" "}
          </Button>
          <Button
            style={{
              color: userSettings === "password" ? "#1b75bc" : "inherit",
            }}
            onClick={() => setUserSettings("password")}
          >
            {" "}
            Change Password{" "}
          </Button>
        </div>
        <div className="account-details-container">
          {userSettings === "general" && (
            <form
              className="account-details-general"
              onSubmit={onChangeGeneral}
            >
              <div className="account-details-general-left">
                <div className="account-details-general-image">
                  {editImage === "" ? (
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
                          setEditImage(e.target.files[0]);
                          setEditFile(URL.createObjectURL(e.target.files[0]));
                        }}
                        id="image"
                        type="file"
                        style={{ display: "none" }}
                      />
                    </>
                  ) : (
                    <>
                      {deletedImage === true ? (
                        <>
                          <div className="account-details-delete-img">
                            <DeleteOutlineOutlinedIcon
                              onClick={() => {
                                setEditImage("");
                                setEditFile("");
                                setDeletedImage(true);
                              }}
                              style={{
                                fontSize: "30px",
                                color: "red",
                                cursor: "pointer",
                              }}
                            />
                          </div>
                          <img src={editFile} alt="" />
                        </>
                      ) : (
                        <>
                          <div className="account-details-delete-img">
                            <DeleteOutlineOutlinedIcon
                              onClick={() => {
                                setEditImage("");
                                setEditFile("");
                                setDeletedImage(true);
                              }}
                              style={{
                                fontSize: "30px",
                                color: "red",
                                cursor: "pointer",
                              }}
                            />
                          </div>
                          <img
                            src={`https://192.168.88.250/demo_react_server/images/${editImage}`}
                            alt=""
                          />
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="account-details-general-right">
                <TextField
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  label="Emri"
                  variant="outlined"
                  style={{ width: "80%" }}
                />
                <TextField
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  label="Email"
                  variant="outlined"
                  style={{ width: "80%" }}
                />
                <Button
                  startIcon={<EditOutlinedIcon />}
                  color="primary"
                  variant="outlined"
                  style={{ padding: "6px 50px", fontSize: "16px" }}
                  type="submit"
                >
                  Edit
                </Button>
              </div>
            </form>
          )}
          {userSettings === "password" && (
            <form
              className="account-details-changepasword"
              onSubmit={onChangePassword}
            >
              <TextField
                style={{ width: "60%" }}
                label="Current Password"
                variant="outlined"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                type="password"
              />
              <TextField
                style={{ width: "60%" }}
                label="New Password"
                variant="outlined"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
              />
              <Button
                startIcon={<SaveOutlinedIcon />}
                type="submit"
                color="primary"
                variant="outlined"
              >
                Ruaj
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
