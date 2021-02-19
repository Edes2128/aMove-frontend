import React, { useState, useContext } from 'react';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import CollapseContext from '../../../context/collpaseContext/CollpaseContext';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import { Link } from 'react-router-dom';
export default function Header({ name, userImg, handleLogout }) {
  const [logout, Setlogout] = useState(false);
  const collapseContext = useContext(CollapseContext);
  const { value } = collapseContext;

  return (
    <div
      className={
        value === true ? 'admin-header admin-header-collapse' : 'admin-header'
      }
    >
      <div className="btns-collapse">
        {value === false ? (
          <IconButton onClick={() => collapseContext.setTrue()}>
            <ArrowBackIosOutlinedIcon
              onClick={() => collapseContext.setTrue()}
            />
          </IconButton>
        ) : (
          <IconButton onClick={() => collapseContext.setFalse()}>
            <ArrowForwardIosOutlinedIcon
              onClick={() => collapseContext.setFalse()}
            />
          </IconButton>
        )}
      </div>

      <div className="user-move-admin">
        <Badge badgeContent={9} color="primary" variant="standard">
          <NotificationsNoneOutlinedIcon />
        </Badge>

        <p className="user-name-admin" onClick={() => Setlogout(!logout)}>
          {name}
        </p>
        <Avatar
          className="logo-user-loggedin"
          src={`https://amove.alcodeit.com/images/${userImg}`}
          alt="LogoUser"
        />
        {!logout && (
          <ArrowDropDownOutlinedIcon onClick={() => Setlogout(!logout)} />
        )}
        {logout && (
          <ArrowDropUpOutlinedIcon onClick={() => Setlogout(!logout)} />
        )}

        <div
          className={!logout ? 'hover-logout' : 'hover-logout display-block'}
        >
          <p onClick={handleLogout}>
            {' '}
            <PowerSettingsNewIcon onClick={handleLogout} />
            Logout
          </p>
          <Link
            style={{
              textDecoration: 'none',
              color: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              fontSize: '20px',
              fontWeight: 'bolder',
              width: '40%'
            }}
            to="/admin/account"
          >
            <PermIdentityOutlinedIcon />
            Account
          </Link>
        </div>
      </div>
    </div>
  );
}
