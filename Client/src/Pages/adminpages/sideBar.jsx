import React ,{useEffect,useState}from "react";
import {Link,Icon, Stack, Divider} from '@mui/material';
import { Box} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

import List from '@mui/material/List';
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
        <Box bgcolor= 'white' sx={{marginTop:"60px"
          }}> 
        <List   aria-label="contacts" >
        < nav aria-label="main mailbox folders" >
          <ListItem disablePadding >
          <ListItemButton onClick={()=>{ 
            op==0?setOp(1): setOp(0)
            }} >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText secondary="Closed Auctions"/>
          </ListItemButton >
          </ListItem>
          <Divider/>
        </nav>
        <nav aria-label="main mailbox folders" >
        
          <ListItem disablePadding >
          <ListItemButton
                onClick={()=>{ document.getElementById("mySidenav").style.width = "350px"}}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText secondary="Active Auctions"/>
          </ListItemButton>
        </ListItem>
          
        <Divider/>
        </nav>
        <nav aria-label="main mailbox folders" >
        
          <ListItem disablePadding >
          <ListItemButton
                onClick={()=>{ document.getElementById("mySidenav").style.width = "350px"}}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            
            <ListItemText secondary="Message"/>
          </ListItemButton>
        </ListItem>
        
        <Divider/>
        </nav>
        <nav aria-label="main mailbox folders" >
        
          <ListItem disablePadding >
          <ListItemButton
                onClick={()=>{ document.getElementById("mySidenav").style.width = "350px"}}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText secondary="Reports"/>
          </ListItemButton>
        </ListItem>
       
        <Divider/>
        </nav>
        <nav aria-label="main mailbox folders" >
        {/* <Link  key ={subcategory} href={`/custom/${subcategory}`} underline="none" 
          sx={{
            border:"1px black"
          }} 
          > */}
          <ListItem disablePadding >
          <ListItemButton
                onClick={()=>{ document.getElementById("mySidenav").style.width = "350px"}}
          >
            <ListItemIcon>
              <PersonIcon />          

            </ListItemIcon>
            <ListItemText secondary="Profile"/>
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
        <nav aria-label="main mailbox folders" >
        {/* <Link  key ={subcategory} href={`/custom/${subcategory}`} underline="none" 
          sx={{
            border:"1px black"
          }} 
          > */}
          <ListItem disablePadding >
          <ListItemButton
                onClick={()=>{ document.getElementById("mySidenav").style.width = "350px"}}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText secondary= "Notifications"/>
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
        <Notifications open={op} setopen={setOp} />
        </div>
      
    );
}
export default Sidebar;