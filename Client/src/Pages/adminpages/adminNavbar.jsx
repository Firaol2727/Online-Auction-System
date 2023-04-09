import React from "react";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Box from '@mui/material/Box';
import {Link,Icon, Stack, IconButton} from '@mui/material';
// import PersonIcon from '@mui/icons-material/PersonIcon';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import ListItemIcon from '@mui/material/ListItemIcon';

const drawerWidth = 240;
const navItems = ['MyProduct','AddProduct', 'Myprofile'];

function NavbarAdmin() {
const container = window !== undefined ? () => window().document.body : undefined;
return (
    <Box sx={{ display: 'flex' }}>
    <AppBar component="nav" sx={{      backgroundImage: "linear-gradient(#04519b, #044687 60%, #033769)"}} >
        <Toolbar>
        <img
            alt="Home Page"
            src="https://oaresources.azureedge.net/images/oa-gavel-sm.png"
            style={{ width: "40px", margin: "10px 15px " }}
        ></img>
            <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: {  sm: 'block' } }} // xs: 'none',
        >NUCHERETA
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <ListItemButton>
            <LogoutIcon />
            <b style={{color:"white"}}>Log Out</b>
            </ListItemButton>
        
            {/* <Link   underline="none"  > <Button  sx={{ color: '#fff' }}><NotificationsIcon color="white" /></Button> </Link>
            <Link href="/totalsell" underline="none"><Button  sx={{ color: '#fff' }}>Total Sell</Button></Link>
            <Link   underline="none"  >
                <Button  sx={{ color: '#fff' }}><PersonIcon color="white" /></Button>
            </Link> */}
        </Box>
        </Toolbar>

    </AppBar>
    </Box>
);
}

export default NavbarAdmin;