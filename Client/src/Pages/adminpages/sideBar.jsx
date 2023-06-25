import React ,{useEffect,useState}from "react";
import {Link,Icon, Stack, Divider} from '@mui/material';
import { CircularProgress, } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Box,Typography} from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import ReportIcon from '@mui/icons-material/Report';
import LogoutIcon from '@mui/icons-material/Logout';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import CommentIcon from '@mui/icons-material/Comment';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import NotificationPop from "./notification";
// import NotificationPop from "./Notificationpop";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import WestIcon from '@mui/icons-material/West';
const baseapi=axios.create({
  baseURL:"http://localhost:5000/special"
})
// let sub=[
//   "Closed Auctions",
//   "Active Auctions",
//   "Waiting Auctions",
//   "Auctions",
//   "Message",
//   "Reports",
//   "Profile",
//   "Notifications",
// ]
const Sidebar=()=>{
  const [op,setOp]=useState(0);
  const [Notifications, setNotifications] = useState([]);
  const [seemore, setseemore] = useState(false);
  const [hasnotification, sethasnotifications] = useState(0);
  let [page, setpage] = useState(1);
  async function fetchNotifications(page) {
      if(page==1){
        sethasnotifications(0);
      }
      setseemore(true)
      baseapi
        .get(`/notification?page=${page}`, { withCredentials: true })
        .then((response) => {
          if (response.status === 200) {
            setseemore(false)
            let data = response.data;
            console.log("response data", data);
            if (data.length > 0) {
              let tempnotification=[];
              let tempdata=response.data;
              tempnotification.push(...Notifications);
              tempnotification.push(...tempdata)
              setNotifications([...tempnotification]);
              sethasnotifications(2);
            } else {
              sethasnotifications(1);

            }
          } else if (response.status === 403) {
            nav("/login");
          } else {
            setseemore(false)
            sethasnotifications(1);
          }
          console.log("hasnotification", hasnotification);
        })
        .catch((err) => {
          console.log(err);
          setseemore(false)
          sethasnotifications(1);
        });
  }
  const handleClickNotification =async () => {
    setOp(op==0?1:0)
    setNotifications(0)
    if (op==0) {
      setNotifications([])
      await fetchNotifications(1);
    }else{
      setNotifications([])
      setpage(1)
      
      setseemore(false)
    }
  };
    useEffect(()=>{
      // console.log("running the use Effect")
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
                onClick={handleClickNotification}
          >
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            
            <ListItemText secondary="Notifications"/>
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
          </sListItemButton> */}

        {/* </Link> */}
        <Divider/>
        </nav>
    </List>
        </Box>
        </Box>
        {op==1 && <div id="mySidenav" className="sidenav">
            <IconButton onClick={handleClickNotification} sx={{position:"relative",marginLeft:"350px"}}
                ><WestIcon color="primary"/>
            </IconButton>
             {hasnotification == 0 && (
          <Box
            sx={{
          
              width: {
                sm: "100%",
                xs: "1",
                backgroundColor: "inherit",
                height: "50px",
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
          <ListItem alignItems="flex-start">
              <ListItemAvatar>
              <Avatar sx={{ bgcolor: "brown" }}>N</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Nuchereta"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline',marginRight:"5px" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      About us -
                    </Typography>
                    A committed graduate student team consisting of Firaol, Yohannes, Mercy,
                     and Liul developed the Nuchereta online auctioning system, which allows buyers to bid on items from 
                    the comfort of their homes and enables sellers to obtain the best price for their products.
                  </React.Fragment>
                }
              />
          </ListItem>
        )}
        {hasnotification == 2 && (
          <List sx={{ width: '100%', maxWidth: 360,maxHeight:"80%", bgcolor: 'background.paper',overflow:"scroll" }}>
            {Notifications.map(notification =>
              (
                notification.nottype === "start" ?
                (<>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "brown" }}>S</Avatar>
                    </ListItemAvatar>
                    <ListItemText color="brown"
                      primary={
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="#061746 "
                            fontSize={"15px"}
                          >
                            Auction update
                          </Typography>}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="brown"
                          >
                            Auction started -
                          </Typography>
                          {notification.message}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  </>): notification.nottype === "close" ?
                (<>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "brown" }}>C</Avatar>
                    </ListItemAvatar>
                    <ListItemText color="brown"
                      primary={
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="#061746 "
                            fontSize={"15px"}
                          >
                            Auction update
                          </Typography>}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="brown"
                          >
                            Auction closed -
                          </Typography>
                          {notification.message}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  </>):
                  (<>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "brown" }}>N</Avatar>
                      </ListItemAvatar>
                      <ListItemText color="brown"
                        primary={
                          <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="#061746 "
                              fontSize={"15px"}
                            >
                              Nuchereta
                            </Typography>}
                        secondary={
                          <React.Fragment>
                
                            {notification.message}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    </>)
                    ))}
            <center>
              <button 
                  onClick={async()=>{
                      let nextpage=page+1;
                      setpage(nextpage)
                      setseemore(true)
                      console.log("Fetching another one ",nextpage);
                      await fetchNotifications(nextpage)
                      setseemore(false)
                  }}
                    sx={{color:"black",borderRadius:"12px",border:"0.5px gray solid",
                    ":hover":{backgroundColor:"lightblue"},
                  width:"60%", height:"25px",backgroundColor:"white"}} > 
                  {seemore? "...loading":"See more Results"}</button></center>
          </List>
        )
        }
        </div>}
        </div>
      
    );
}
export default Sidebar;