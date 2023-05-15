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
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreIcon from "@mui/icons-material/MoreVert";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import { NavLink } from "react-router-dom";

const NotoficationText = [
  "Thank you for using this service",
  "Your auction is started now",
  "The first bid is given for your auction",
  "Hide all notification content",
];

export default function NavBuyer() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notify, setNotify] = React.useState(null);
  const [account, setAccount] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const notifyOpen = Boolean(notify);
  const accountOpen = Boolean(account);

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
  const accountClose = (event) => {
    setAccount(null);
  };
  const handleAccount = (event) => {
    setAccount(event.currentTarget);
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
  const Account = (
    <Menu
      // notify={notify}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      keepMounted
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      getContentAnchorEl={null}
      open={accountOpen}
      onClose={accountClose}
      sx={{
        marginTop: "50px",
        marginLeft: {
          lg: "250px",
          md: "100px",
          sm: "190px",
          xs: "50px",
        },
      }}
    >
      <MenuItem onClose={accountClose}>
        <Box className="account" sx={{ display: "block" }}>
          <Box sx={{ display: "flex", margin: "10px" }}>
            <PersonIcon size="large" />
            <Typography className="account name">Yohannes dejene</Typography>
          </Box>
          <Box sx={{ margin: "20px" }}>
            <Typography className="balance">Balance :$500</Typography>
          </Box>
          <Box sx={{ margin: "20px" }}>
            <Link href="/payment">
              <Typography sx={{ color: "red" }}>Deposite</Typography>
            </Link>
          </Box>
        </Box>
      </MenuItem>
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
          <NavLink to="/buyerauctions">
            <Typography>My auctions</Typography>
          </NavLink>
        </Box>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Box>
          <NavLink to="/payment">
            <Typography>Deposite</Typography>
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="relative"
        elevation={1}
        sx={{ backgroundColor: "white " }}
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
            <Box
              sx={{
                display: {
                  lg: "block",
                  md: "block",
                  sm: "block",
                  xs: "none",
                },
              }}
            >
              <img
                alt="Home Page"
                src="https://oaresources.azureedge.net/images/oa-gavel-sm.png"
                style={{
                  width: "40px",
                  margin: "10px 15px ",
                  backgroundColor: "black",
                }}
              ></img>
            </Box>
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
              onClick={handleAccount}
            >
              <AccountBalanceWalletIcon sx={{ color: "black" }} />

              <Typography
                sx={{
                  marginLeft: "20px",
                  fontFamily: "Monospace",
                  fontWieght: "900",
                  display: { xs: "none", md: "flex", color: "black" },
                }}
              >
                Balance
              </Typography>
            </IconButton>
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
                Notification
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
      {Account}
    </Box>
  );
}
