import React from "react";
import ReportIcon from '@mui/icons-material/Report';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const drawerWidth = 240;
const navItems = ['MyProduct','AddProduct', 'Myprofile'];

function SellerNavbar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2, backgroundImage: "linear-gradient(#04519b, #044687 60%, #033769)" ,position:"absolute",width:"100%",marginTop:"0%",height:"60px",color:"white"}}>
            <p style={{marginTop:"10px"}}>NU CHERETA </p> 
        </Typography> 
        <Divider />
        <Box sx={{
            position:"absolute",width:"100%",marginTop:"62px",
        }}>
        <List>
            <Link href="http://localhost:3000/watchorder" underline="none">
            <ListItem disablePadding sx={{
                border:"1px black"
            }}>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={"watchOrder"} />
                </ListItemButton>
            </ListItem>
            </Link>

            <Divider variant="inset" component="li" />

            <Link href="http://localhost:3000/totalsell" underline="none">
            <ListItem disablePadding sx={{
                border:"1px black"
            }}>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={"Total Sell"} />
                </ListItemButton>
            </ListItem>
            </Link>

            <Divider variant="inset" component="li" />

            <Link href="http://localhost:3000/addseller" underline="none">
            <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={"addSeller"} />
                </ListItemButton>
            </ListItem>
            </Link>

            <Divider variant="inset" component="li" />

            <Link href="http://localhost:3000/sellers" underline="none">
            <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={"sellers"} />
                </ListItemButton>
            </ListItem>
            </Link>

            <Divider variant="inset" component="li" />

            <Link href="http://localhost:3000/myprofilea" underline="none">
            <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={"Myprofile"} />
                </ListItemButton>
            </ListItem>
            </Link>

            <Divider variant="inset" component="li" />
            
            <Link href="http://localhost:3000/addseller" underline="none">
            <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={"AddSeller"} />
                </ListItemButton>
            </ListItem>
            </Link>

            <Divider variant="inset" component="li" />
            
            <Link href="http://localhost:3000/addcategory" underline="none">
            <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={"AddCategory"} />
                </ListItemButton>
            </ListItem>
            </Link>
        </List>
        </Box>
    </Box>
);
const container = window !== undefined ? () => window().document.body : undefined;
return (
    <Box sx={{ display: 'flex' }}>
    <AppBar component="nav"  sx={{ backgroundImage: "linear-gradient(#04519b, #044687 60%, #033769)" ,height:"60px" }} >
        <Toolbar >
        <img
            alt="Home Page"
            src="https://oaresources.azureedge.net/images/oa-gavel-sm.png"
            style={{ width: "40px", margin: "6px 10px " }}
        ></img>
            <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: {  sm: 'block' } }} // xs: 'none',
        >
            NU CHERETA
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Link href="http://localhost:3000/myprofilea" underline="none" >
                <Button  sx={{ color: '#fff' }}>
                    <ReportIcon/>
                    <Stack direction={"Column"} spacing={2} >
                        <p> My Auctions</p>
                        </Stack>
            </Button></Link>
        <Link href="http://localhost:3000/myprofilea" underline="none" sx={{width:"100px"}} >
                <Button  sx={{ color: '#fff' }}>
                    <ReportIcon/>
                    <Stack direction={"Column"} spacing={2} >
                        <p>New</p>
                        </Stack>
            </Button></Link>
        <Link href="http://localhost:3000/myprofilea" underline="none" >
            <Button  sx={{ color: '#fff' }}>
                <ReportIcon/>
                <Stack direction={"Column"} spacing={2} >
                    <p> Notification</p>
                    </Stack>
        </Button></Link>
        <Link href="http://localhost:3000/myprofilea" underline="none" >
            <Button  sx={{ color: '#fff' }}>
                <ReportIcon/>
               
                    <p> Profile</p>
                 
        </Button></Link>
        </Box>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            // edge="end"
            size="large"
            aria-haspopup="true"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
            >
            <MenuIcon />
        </IconButton>
        
        </Toolbar>
    </AppBar>
    <Box component="nav">
        <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            anchor="right"
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
        >
            {drawer}
        </Drawer>
    </Box>
    </Box>
  );
}

export default SellerNavbar;