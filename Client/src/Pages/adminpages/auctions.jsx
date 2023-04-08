import NavbarAdmin from "./adminNavbar";
import * as React from 'react';
import Sidebar from "./sideBar";
import Pagination from '@mui/material/Pagination';
import "./css/notifications.css"
import {Link,Icon, Stack, AppBar, CardHeader, ImageList} from '@mui/material';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Notifications from "./notification";
const AdminAuctions=()=>{
    React.useEffect(()=>{
        console.log("Running the useeffect of notification page ")
    },[])
    return (
        <div>
        <NavbarAdmin sx={{position:"absolute"}}/>
        <Stack direction="row" sx={{position:"relative",marginTop:"30px"}} spacing={0.5}>
            <Sidebar/>
            <Box flex={6} >
                <Box  sx={{
                    position:"relative",
                    marginTop:"50px",
                }} >
                    <div style={{position:"relative", display:"flex",flexDirection:"row",flexWrap:"wrap"}} >
                    <div style={{
                        position:"relative",
                        marginLeft:"3px",
                        marginBottom:"3px",
                        width:"290px",
                        float:"left",
                        height:"300px",
                        backgroundColor:"greenyellow"}}>
                    </div>
                    <div style={{
                        position:"relative",
                        marginLeft:"3px",
                        marginBottom:"3px",
                        width:"290px",
                        float:"left",
                        height:"300px",
                        backgroundColor:"brown"}}>

                    </div>
                    <div style={{
                        position:"relative",
                        marginLeft:"3px",
                        marginBottom:"3px",
                        width:"290px",
                        float:"left",
                        height:"300px",
                        backgroundColor:"brown"}}>

                    </div>
                    <div style={{
                        position:"relative",
                        marginLeft:"3px",
                        marginBottom:"3px",
                        width:"290px",
                        float:"left",
                        height:"300px",
                        backgroundColor:"brown"}}>

                    </div>
                    <div style={{
                        position:"relative",
                        marginLeft:"3px",
                        marginBottom:"3px",
                        width:"290px",
                        float:"left",
                        height:"300px",
                        backgroundColor:"brown"}}>

                    </div>
                    <div style={{
                        position:"relative",
                        marginLeft:"3px",
                        marginBottom:"3px",
                        width:"290px",
                        float:"left",
                        height:"300px",
                        backgroundColor:"brown"}}>

                    </div>
                    </div>

            <div style={{
        position:"relative",
        height:"50px",
        marginTop:"10px",
        backgroundColor:"yellow",
      }}> <Pagination count={10} color="primary" page={1} sx={{position:"relative" }}/>
            </div>
                </Box>
            </Box>
            
        </Stack>
        
        </div>
    );
}

export default AdminAuctions;