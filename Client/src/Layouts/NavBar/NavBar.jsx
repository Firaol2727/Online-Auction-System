import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from "@mui/icons-material/Create";
import LoginIcon from "@mui/icons-material/Login";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

function NavBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        sx={{ marginLeft: "10px", fontWeight: "800", p: 3, color: "black" }}
      >
        {" "}
        NU CHARETA
      </Typography>

      <Divider />
      <List sx={{ display: "block", color: "white" }}>
        <ListItem>
          <ListItemButton sx={{ textAlign: "center" }}>
            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: isActive ? "red " : "black",
                textDecoration: "none",
                display: "flex",
              })}
            >
              <HomeIcon size="large" sx={{ marginRight: "5px" }} />
              Home
            </NavLink>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton sx={{ textAlign: "center" }}>
            <NavLink
              to="/register"
              style={({ isActive }) => ({
                color: isActive ? "red " : "black",
                textDecoration: "none",
                display: "flex",
              })}
            >
              <CreateIcon size="large" sx={{ marginRight: "5px" }} />
              Register
            </NavLink>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton sx={{ textAlign: "center" }}>
            <NavLink
              to="/login"
              style={({ isActive }) => ({
                color: isActive ? "red " : "black",
                textDecoration: "none",
                display: "flex",
              })}
            >
              <LoginIcon size="large" sx={{ marginRight: "5px" }} />
              Login
            </NavLink>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="relative"
        elevation={1}
        sx={{ backgroundColor: "white" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon sx={{ color: "black" }} />
          </IconButton>
          <Box
            sx={{
              marginLeft: "20px",
              alignItems: "center",
              flexGrow: 1,
              display: { xs: "none", sm: "flex" },
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

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <List sx={{ display: "flex", color: "white" }}>
              <ListItem>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <NavLink
                    to="/"
                    style={({ isActive }) => ({
                      color: isActive ? "#FC0A07 " : "black",
                      textDecoration: "none",
                      display: "flex",
                    })}
                  >
                    <HomeIcon size="large" sx={{ marginRight: "5px" }} />
                    <Typography>Home</Typography>
                  </NavLink>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <NavLink
                    to="/register"
                    style={({ isActive }) => ({
                      color: isActive ? "#FC0A07 " : "black",
                      textDecoration: "none",
                      display: "flex",
                    })}
                  >
                    <CreateIcon size="large" sx={{ marginRight: "5px" }} />
                    Register
                  </NavLink>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton sx={{ textAlign: "center" }}>
                  <NavLink
                    to="/login"
                    style={({ isActive }) => ({
                      color: isActive ? "#FC0A07 " : "black",
                      textDecoration: "none",
                      display: "flex",
                    })}
                  >
                    <LoginIcon size="large" sx={{ marginRight: "5px" }} />
                    Login
                  </NavLink>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default NavBar;
