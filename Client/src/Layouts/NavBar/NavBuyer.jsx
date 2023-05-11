import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";

import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreIcon from "@mui/icons-material/MoreVert";
import { NavLink } from "react-router-dom";
import {
  DateCategory,
  RegionCategory,
  PriceRangeCategory,
  PriceInputCategory,
} from "../../Components/Category/SubCategory";

const NotoficationText = [
  "Thank you for using this service",
  "Your auction is started now",
  "The first bid is given for your auction",
  "Hide all notification content",
];

export default function NavBuyer() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notify, setNotify] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const notifyOpen = Boolean(notify);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const notifyClose = () => {
    setNotify(null);
  };
  const handleNotification = (event) => {
    setNotify(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const Notification = (
    <Menu
      // notify={notify}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={notifyOpen}
      onClose={notifyClose}
      sx={{ marginTop: "50px" }}
    >
      {NotoficationText.map((option, index) => (
        <MenuItem key={option}>{option}</MenuItem>
      ))}
    </Menu>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ marginTop: "5px" }}
    >
      <MenuItem onClick={handleMenuClose}>
        <Box>
          <NavLink to="/profile">
            <Typography>My profile</Typography>
          </NavLink>
        </Box>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Box>
          <NavLink to="/account">
            <Typography>My account</Typography>
          </NavLink>
        </Box>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Box>
          <NavLink
            style={{ textDecoration: "none", hover: "underline" }}
            to="/editprofile"
          >
            <Typography>Edit profile</Typography>
          </NavLink>
        </Box>
      </MenuItem>

      <Divider />

      <MenuItem onClick={handleMenuClose}>
        <NavLink to="/logout" sx={{ display: "flex" }}>
          <IconButton
            // color="inherit"
            sx={{ color: "#081263 " }}
          >
            <LogoutIcon sx={{ color: "black" }} />
            <Typography sx={{ margin: "8px" }}>Logout</Typography>
          </IconButton>
        </NavLink>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, }}>
      <AppBar
        position="relative" 
        elevation={1}
        sx={{ backgroundColor: "white " ,}}
      >
        <Toolbar>
          <Box
            sx={{
              height: "15px",

              textAlign: "center",
              alignItems: "center",
              display: {
                lg: "flex",
                md: "flex",
                sm: "flex",
                xs: "flex",
              },
            }}
          >
            {/* <img src="air.jpg" alt="images_place" /> */}
            <img
              alt="Home Page"
              src="https://oaresources.azureedge.net/images/oa-gavel-sm.png"
              style={{
                width: "40px",
                margin: "10px 15px ",
                backgroundColor: "black",
              }}
            ></img>
            <Typography
              sx={{ marginLeft: "10px", fontWeight: "800", color: "black" }}
            >
              {" "}
              NU CHARETA
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleNotification}
            >
              <Badge badgeContent={16} color="error" sx={{}}>
                <NotificationsIcon sx={{ color: "black" }} />
              </Badge>
              <Typography
                sx={{
                  marginLeft: "20px",
                  fontFamily: "Monospace",
                  fontWieght: "900",
                  display: { xs: "none", md: "flex", color: "black" },
                }}
              >
                Notifications
              </Typography>
            </IconButton>
            {/* <p sx={{}}>Notifications</p> */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              // aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle sx={{ color: "black" }} />
              <Typography
                sx={{
                  marginLeft: "20px",
                  fontFamily: "Monospace",
                  fontWieght: "900",
                  display: { xs: "none", md: "flex", color: "black" },
                }}
              >
                {" "}
                Profiles
              </Typography>
            </IconButton>
          </Box>
        </Toolbar>
        <Divider />
      </AppBar>
      {renderMenu}
      {Notification}
    </Box>
  );
}
