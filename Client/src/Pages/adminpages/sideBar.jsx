import React ,{useEffect,useState}from "react";
import {Link,Icon, Stack, Divider} from '@mui/material';
import { Box} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import ReportIcon from '@mui/icons-material/Report';
import LogoutIcon from '@mui/icons-material/Logout';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import List from '@mui/material/List';
import CommentIcon from '@mui/icons-material/Comment';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import Notifications from "./notification";
const api=axios.create({
  baseURL:"http://localhost:5000"
})
let sub=[
  "Closed Auctions",
  "Active Auctions",
  "Waiting Auctions",
  "Auctions",
  "Message",
  "Reports",
  "Profile",
  "Notifications",
]
const Sidebar=()=>{
  const [op,setOp]=useState(0);
    useEffect(()=>{
      console.log("running the use Effect")
    },[])
    return(
      <div >
        <Box   flex={1} p={1}  bgcolor= 'background.paper'
            sx={{
              display:{xs:"none",sm:"block"},
              position:"static"
            }} 
            >
        <Box bgcolor= 'white' sx={{marginTop:"30px"
          }}> 
        <List   aria-label="contacts" >
        <Link href="/auctioncontrol" underline="none">
          <ListItem disablePadding >
          <ListItemButton  >
            <ListItemIcon>
              <HistoryToggleOffIcon />
            </ListItemIcon>
            <ListItemText secondary="Bid History"/>
          </ListItemButton >
          </ListItem>
          <Divider/>
        </Link>
        <Link href="/reports" underline="none">
        <ListItem disablePadding >
        <ListItemButton>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText secondary="Reports"/>
        </ListItemButton>
      </ListItem>
        </Link>
        <Divider/>
        <nav aria-label="notification" >
        
          <ListItem disablePadding >
          <ListItemButton
                onClick={()=>{ 
                  op==0?setOp(1): setOp(0)
                  }}
          >
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            
            <ListItemText secondary="Notifications"/>
          </ListItemButton>
        </ListItem>
        
        <Divider/>
        </nav>
        <nav aria-label="comment" >
        
          <ListItem disablePadding >
          <ListItemButton
                onClick={()=>{ document.getElementById("mySidenav").style.width = "350px"}}
          >
            <ListItemIcon>
              <CommentIcon />
            </ListItemIcon>
            <ListItemText secondary="Comments"/>
          </ListItemButton>
        </ListItem>
       
        <Divider/>
        </nav>
        <Link href="/manageseller" underline="none">
        {/* <Link  key ={subcategory} href={`/custom/${subcategory}`} underline="none" 
          sx={{
            border:"1px black"
          }} 
          > */}
          <ListItem disablePadding >
          <ListItemButton
               
          >
            <ListItemIcon>
              < ManageAccountsIcon />          
            </ListItemIcon>
            <ListItemText secondary=" Manage Seller "/>
          </ListItemButton>
        </ListItem>
          {/* <ListItemButton>
            <ListItem disablePadding >
              <ListItemText primary={subcategory} sx={{color:"black"}} />
            </ListItem>
          </ListItemButton> */}

        {/* </Link> */}
        <Divider/>
        </Link> 
        <Link href="/manageauction" underline="none">
        {/* <Link  key ={subcategory} href={`/custom/${subcategory}`} underline="none" 
          sx={{
            border:"1px black"
          }} 
          > */}
          <ListItem disablePadding >
          <ListItemButton
          >
            <ListItemIcon>
              <EventBusyIcon />
            </ListItemIcon>
            <ListItemText secondary= "Edit and Delete "/>
          </ListItemButton>
        </ListItem>
          {/* <ListItemButton>
            <ListItem disablePadding >
              <ListItemText primary={subcategory} sx={{color:"black"}} />
            </ListItem>
          </ListItemButton> */}

        {/* </Link> */}
        <Divider/>
        </Link>
        <Link href="/adprofile" underline="none">
        {/* <Link  key ={subcategory} href={`/custom/${subcategory}`} underline="none" 
          sx={{
            border:"1px black"
          }} 
          > */}
          <ListItem disablePadding >
          <ListItemButton
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText secondary= "Profile"/>
          </ListItemButton>
        </ListItem>
          {/* <ListItemButton>
            <ListItem disablePadding >
              <ListItemText primary={subcategory} sx={{color:"black"}} />
            </ListItem>
          </ListItemButton> */}

        {/* </Link> */}
        <Divider/>
        </Link>
        <nav aria-label="logout" >
        {/* <Link  key ={subcategory} href={`/custom/${subcategory}`} underline="none" 
          sx={{
            border:"1px black"
          }} 
          > */}
          <ListItem disablePadding >
          <ListItemButton
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText secondary= "Log Out"/>
          </ListItemButton>
        </ListItem>
          {/* <ListItemButton>
            <ListItem disablePadding >
              <ListItemText primary={subcategory} sx={{color:"black"}} />
            </ListItem>
          </ListItemButton> */}

        {/* </Link> */}
        <Divider/>
        </nav>
    </List>
        </Box>
        </Box>
        <Notifications open={op} setopen={setOp}   />
        </div>
      
    );
}
export default Sidebar;