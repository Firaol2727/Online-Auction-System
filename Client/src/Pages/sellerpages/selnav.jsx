import { useState, useEffect } from "react";
import ReportIcon from "@mui/icons-material/Report";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CircularProgress, Link, Stack } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ListItemIcon from "@mui/material/ListItemIcon";
import { NavLink, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import Popper from "@mui/material/Popper";
import io from "socket.io-client";
import axios from "axios";
import NotificationPop from "./Notificationpop";
const socket = io("http://localhost:5000", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "my-custom-value",
  },
}); // replace with your server URL
const drawerWidth = 240;
const navItems = ["MyProduct", "AddProduct", "Myprofile"];

function SellerNavbar(props) {
  const { window } = props;
  const baseapi = axios.create({
    baseURL: "http://localhost:5000/sel",
  });
  const nav = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [Notifications, setNotifications] = useState([]);
  const [hasnotification, sethasnotifications] = useState(0);
  const [no_of_notification, setNo_of_notification] = useState(0);
  const [hasnext, sethasnext] = useState(false);
  //  0 for loading 1 for hasnotification and 2 for no notification
  function fetchNotifications(params) {
    sethasnotifications(0);
    baseapi
      .get("/notification", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          let data = response.data;
          console.log("response data", data);
          if (data.length > 0) {
            setNotifications([...response.data]);
            sethasnotifications(2);
          } else {
            sethasnotifications(1);
          }
        } else if (response.status === 403) {
          nav("/login");
        } else {
          sethasnotifications(1);
        }
        console.log("hasnotification", hasnotification);
      })
      .catch((err) => {
        console.log(err);
        sethasnotifications(1);
      });
  }
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const openNotification = Boolean(anchorElNotification);
  const id = openNotification ? "simple-popper" : undefined;
  const handleClickNotification = (event) => {
    setAnchorElNotification(anchorElNotification ? null : event.currentTarget);
    if (!openNotification) {
      fetchNotifications();
    } 
  };
  socket.on("connect", () => {
    console.log("successfully connected to the server socket to connect");
  });
  socket.on("bidupdate", (data) => {
    console.log("New server",data);
    setNo_of_notification(no_of_notification + 1);
  });

  useEffect(() => {
    baseapi
      .get("/newnotification", { withCredentials: true })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setNo_of_notification(res.data.nopage);
        }
      })
      .catch((err) => {
        console.log("The error is ", err);
      });
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      {/* backgroundImage: "linear-gradient(#04519b,  "#B54E47"   #044687 60%, #033769)" */}
      <AppBar
        component="nav"
        sx={{ backgroundColor: "white", height: "70px", paddingTop: "7px" }}
      >
        <Toolbar>
          <img
            src="/logo2.png"
            href=""
            width="40px"
            height={"60px"}
            style={{ width: "40px", margin: "6px 10px " }}
          ></img>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontFamily: "sans-serif",
              color: "brown",
              fontWeight: "bolder",
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }} // xs: 'none',
          >
            Nuchereta
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontFamily: "sans-serif",
              color: "brown",
              fontWeight: "bolder",
              flexGrow: 1,
              display: { xs: "block", sm: "none" },
            }} // xs: 'none',
          >
            Nu
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <NavLink
              to="/sel/home"
              style={({ isActive, isPending }) => {
                return {
                  // fontWeight: isPending ? "bold" : "",
                  color: isActive ? "red" : "#fff",
                };
              }}
            >
              <Button color="inherit">
                <Stack
                  direction={"Column"}
                  spacing={2}
                  sx={{ color: "black", alignItems: "center" }}
                >
                  <ReceiptIcon />
                  <p>My Auctions</p>
                </Stack>
              </Button>
            </NavLink>

            <NavLink
              to="/sel/newauction"
              style={({ isActive, isPending }) => {
                return {
                  // fontWeight: isPending ? "bold" : "",
                  color: isActive ? "#e0ffff" : "#fff",
                };
              }}
            >
              <Button color="inherit">
                <Stack
                  direction={"Column"}
                  spacing={2}
                  sx={{ color: "black", alignItems: "center" }}
                >
                  <AddCircleIcon sx={{ color: "black" }} />
                  <p>New</p>
                </Stack>
              </Button>
            </NavLink>

            <Button color="inherit" onClick={handleClickNotification}>
              <Stack
                direction={"Column"}
                spacing={2}
                sx={{ color: "black", alignItems: "center" }}
              >
                {/* <NotificationsNoneIcon/> */}
                <Badge badgeContent={no_of_notification} color="error">
                  <NotificationsNoneIcon sx={{ color: "black" }} />
                </Badge>
                <p> Notification</p>
              </Stack>
            </Button>

            <Button
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              color="inherit"
              onClick={handleClick}
            >
              <Stack
                direction={"Column"}
                spacing={2}
                sx={{ color: "black", alignItems: "center" }}
              >
                {/* <IconButton 
                id="demo-positioned-button"
                color="inherit"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                
                size="small"
                sx={{ mr: 2, display: { sm: 'none' }}}
            > */}
                <PersonIcon />
                {/* </IconButton> */}
                {/* <PersonIcon/> */}
                <p> Profile</p>
              </Stack>
            </Button>
          </Box>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "block", sm: "none" } }}
          ></Typography>
          <Stack
            direction={"row"}
            spacing={2}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <NavLink
              to="/sel/home"
              style={({ isActive, isPending }) => {
                return {
                  // fontWeight: isPending ? "bold" : "",
                  color: isActive ? "#e0ffff" : "#fff",
                };
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                // edge="end"
                size="small"
                aria-haspopup="true"
              >
                <ReceiptIcon sx={{ color: "black" }} />
              </IconButton>
            </NavLink>
            <NavLink
              to="/sel/newauction"
              style={({ isActive, isPending }) => {
                return {
                  // fontWeight: isPending ? "bold" : "",
                  color: isActive ? "red" : "#fff",
                };
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                // edge="end"
                size="small"
                aria-haspopup="true"
              >
                <AddCircleIcon sx={{ color: "black" }} />
              </IconButton>
            </NavLink>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              // edge="end"
              size="small"
              aria-haspopup="true"
              onClick={handleClickNotification}
            >
              <Badge badgeContent={no_of_notification} color="error">
                <NotificationsNoneIcon sx={{ color: "black" }} />
              </Badge>
            </IconButton>

            <IconButton
              id="demo-positioned-button"
              color="black"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              size="small"
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <PersonIcon sx={{ color: "black" }} />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          anchor="right"
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
        ></Drawer>
      </Box>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Link
          href="/sel/profile"
          underline="none"
          sx={{ color: "inherit" }}
          onClick={handleClose}
        >
          <MenuItem>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Account</Typography>
          </MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Logout</Typography>
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
      </Menu>
      <Popper
        id={id}
        open={openNotification}
        anchorEl={anchorElNotification}
        sx={{ zIndex: "2" }}
      >
        {hasnotification == 0 && (
          <Box
            sx={{
              border: 1,
              p: 1,
              width: {
                sm: "400px",
                xs: "300px",
                backgroundColor: "#FFE4C4",
                height: "100px",
                marginTop: "20px",
              },
            }}
          >
            <center>
              <CircularProgress />
            </center>
          </Box>
        )}
        {hasnotification == 1 && (
          <div>
            <Box
              sx={{
                border: 1,
                p: 1,
                width: {
                  sm: "400px",
                  xs: "300px",
                  backgroundColor: "#FFE4C4",
                  height: "80px",
                  marginTop: "2px",
                },
              }}
            >
              <center>
                {" "}
                <Typography sx={{ color: "black" }}>
                  No notifications yet.{" "}
                </Typography>
              </center>
            </Box>
          </div>
        )}
        {hasnotification == 2 && (
          <Box
            sx={{
              border: 1,
              p: 1,
              bgcolor: "background.paper",
              height: "600px",
              overflowY: "scroll",
              overflowX: "hidden",
              paddingTop: "22px",
            }}
          >
            {Notifications.map((notification) =>
              notification.type === "bidupdate" ? (
                <Link href={`/moreon/${notification.AuctionId}`}>
                  <Box
                    sx={{
                      border: 1,
                      p: 1,
                      width: {
                        sm: "400px",
                        xs: "300px",
                        backgroundColor: "#FFE4C4",
                        height: "100px",
                        marginTop: "20px",
                      },
                    }}
                  >
                    <center>
                      {" "}
                      <Typography sx={{ color: "black" }}>
                        This is the notification
                      </Typography>
                    </center>
                  </Box>
                </Link>
              ) : (
                <Box
                  sx={{
                    border: 1,
                    p: 1,
                    width: {
                      sm: "400px",
                      xs: "300px",
                      backgroundColor: "#FFE4C4",
                      height: "100px",
                      marginTop: "20px",
                    },
                  }}
                >
                  <center>
                    {" "}
                    <Typography sx={{ color: "black" }}>
                      This is the notification
                    </Typography>
                  </center>
                </Box>
              )
            )}
          </Box>
        )}
      </Popper>
    </Box>
  );
}

export default SellerNavbar;
