import {useState,useEffect} from "react";
import ReportIcon from '@mui/icons-material/Report';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CircularProgress, Link, Stack } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ListItemIcon from '@mui/material/ListItemIcon';
import { NavLink } from "react-router-dom";
import Badge from '@mui/material/Badge';
import Popper from '@mui/material/Popper';
import NotificationPop from "./Notificationpop";
const drawerWidth = 240;
const navItems = ['MyProduct','AddProduct', 'Myprofile'];
import axios from "axios";
function SellerNavbar(props) {
    const { window } = props;
    const baseapi=axios.create({
        baseURL:"http://localhost:3000/sel"
    })
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [Notifications,setNotifications]=useState([]);
    const [hasnotification,sethasnotifications]=useState(1); 
    //  0 for loading 1 for hasnotification and 2 for no notification
    // function fetchNotifications(params) {
    //     baseapi.get("/notification")
    //     .then(response=>{
    //         if(response.status==200)
    //             setNotifications(response.data);
    //     })
    //     .catch(err=>{
    //         console.log(err);
    //     })
    // }
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const container = window !== undefined ? () => window().document.body : undefined;
    const [anchorElNotification, setAnchorElNotification] = useState(null);

    const handleClickNotification= (event) => {
        setAnchorElNotification(anchorElNotification ? null : event.currentTarget);
    };

    const openNotification = Boolean(anchorElNotification);
    const id = openNotification ? 'simple-popper' : undefined;
return (
    <Box sx={{ display: 'flex' }}>
        {/* backgroundImage: "linear-gradient(#04519b, #044687 60%, #033769)" */}
    <AppBar component="nav"  sx={{ backgroundColor: "#B54E47", height:"60px" }} >
        <Toolbar >
        <img
            alt="Home Page"
            src="https://oaresources.azureedge.net/images/oa-gavel-sm.png"
            style={{ width: "40px", margin: "6px 10px " }}
        ></img>
        <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: {  xs: 'none', sm: 'block' }  }} // xs: 'none',
        >
            NU CHERETA
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        
        <NavLink
            to="/sel/home"
            style={({ isActive, isPending }) => {
                return {
                // fontWeight: isPending ? "bold" : "",
                color: isActive ?"#e0ffff" : "#fff" ,
               
                };
            }}>
                <Button  color="inherit" >
                    <Stack direction={"Column"} spacing={2} sx={{alignItems:"center"}}>
                        <ReceiptIcon/>
                        <p>My Auctions</p>
                        </Stack>
                </Button>
        </NavLink>
        
        <NavLink
            to="/sel/newauction"
            style={({ isActive, isPending }) => {
                return {
                // fontWeight: isPending ? "bold" : "",
                color: isActive ?"#e0ffff" : "#fff" ,
                
                };
            }}>
                <Button  color="inherit">
                    <Stack direction={"Column"} spacing={2} sx={{alignItems:"center"}}>
                        <AddCircleIcon/>
                        <p>New</p>
                        </Stack>
            </Button></NavLink>
        
        <Button  color="inherit" onClick={handleClickNotification} >
            <Stack direction={"Column"} spacing={2} sx={{alignItems:"center"}}>
                <NotificationsNoneIcon/>
                <p> Notification</p>
                </Stack>
        </Button>

            <Button 
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                color="inherit" onClick={handleClick}>
            <Stack direction={"Column"} spacing={2} sx={{alignItems:"center"}} >
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 , display: { xs: 'block', sm: 'none' },} }>
            
        </Typography>
            <Stack direction={"row"} spacing={2}   sx={{ mr: 2, display: { sm: 'none' }}}>
            <NavLink
            to="/sel/home"
            style={({ isActive, isPending }) => {
                return {
                // fontWeight: isPending ? "bold" : "",
                color: isActive ?"#e0ffff" : "#fff" ,
                };
            }}>
                <IconButton 
                    color="inherit"
                    aria-label="open drawer"
                    // edge="end"
                    size="small"
                    aria-haspopup="true"
                    >
                <ReceiptIcon />
            </IconButton>
            </NavLink>
            <NavLink
            to="/sel/newauction"
            style={({ isActive, isPending }) => {
                return {
                // fontWeight: isPending ? "bold" : "",
                color: isActive ?"#e0ffff" : "#fff" ,
               
                };
            }}><IconButton 
            color="inherit"
            aria-label="open drawer"
            // edge="end"
            size="small"
            aria-haspopup="true"
            >
                <AddCircleIcon />
            </IconButton></NavLink>
            <IconButton 
            color="inherit"
            aria-label="open drawer"
            // edge="end"
            size="small"
            aria-haspopup="true"
            onClick={handleClickNotification} >
                <Badge badgeContent={4} color="error"><NotificationsNoneIcon  sx={{color:"white"}}/></Badge>
                
            </IconButton>
            
            <IconButton 
                id="demo-positioned-button"
                color="inherit"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                size="small"
                sx={{ mr: 2, display: { sm: 'none' }}}
            >
                <PersonIcon />
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
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
        >
            
        </Drawer>
    </Box>
    <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
    >
         <Link href="/sel/profile"  underline="none" sx={{color:"inherit"}} onClick={handleClose}>
            <MenuItem >
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
    <Popper id={id} open={openNotification} anchorEl={anchorElNotification}>
        {
            hasnotification==0 && <Box sx={{
                border: 1, p: 1,width:{sm:"400px",xs:"300px",backgroundColor:"lightgreen",height:"100px",marginTop:"20px"} }}>
                <center><CircularProgress/></center>
            </Box>
        }
        {hasnotification==1&& <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper',height:"700px",overflow:"scroll",paddingTop:"22px" }}>
            <Box sx={{
                width:{sm:"400px",xs:"300px",backgroundColor:"lightgreen",height:"100px",marginBottom:"5px"}
            }}
            ></Box>
            <Box sx={{
                width:{sm:"400px",xs:"300px",backgroundColor:"lightgreen",height:"100px",marginBottom:"5px"}
            }}
            ></Box>
            <Box sx={{
                width:{sm:"400px",xs:"300px",backgroundColor:"lightgreen",height:"100px",marginBottom:"5px"}
            }}
            ></Box>
            <Box sx={{
                width:{sm:"400px",xs:"300px",backgroundColor:"lightgreen",height:"100px",marginBottom:"5px"}
            }}
            ></Box>
            <Box sx={{
                width:{sm:"400px",xs:"300px",backgroundColor:"lightblue",height:"100px",marginBottom:"5px"}
            }}
            ></Box>
            <Box sx={{
                width:{sm:"400px",xs:"300px",backgroundColor:"lightgreen",height:"100px",marginBottom:"5px"}
            }}
            ></Box>
            <Box sx={{
                width:{sm:"400px",xs:"300px",backgroundColor:"lightblue",height:"100px",marginBottom:"5px"}
            }}
            ></Box>
            <Box sx={{
                width:{sm:"400px",xs:"300px",backgroundColor:"lightgreen",height:"100px",marginBottom:"5px"}
            }}
            ></Box>
            <Box sx={{
                width:{sm:"400px",xs:"300px",backgroundColor:"lightgreen",height:"100px",marginBottom:"5px"}
            }}
            ></Box>
        </Box>}
    </Popper>
    </Box>
    );
}

export default SellerNavbar;