
import WestIcon from '@mui/icons-material/West';
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
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItemIcon from "@mui/material/ListItemIcon";
import { NavLink, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import * as React from 'react';
import Popper from "@mui/material/Popper";
import io from "socket.io-client";
import axios from "axios";
// import NotificationPop from "./Notificationpop";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
const baseapi = axios.create({
    baseURL: "http://localhost:5000/special",
  });
const NotificationPop=(props)=>{
    const [Notifications, setNotifications] = useState([]);
    const [seemore, setseemore] = useState(false);
    const [hasnotification, sethasnotifications] = useState(0);
    let [page, setpage] = useState(1);
    function fetchNotifications(page) {
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

    function fetchNotifications(page) {
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
    console.log("The props is",props.open)
    // if(props.open==1){
    //     fetchNotifications(page);
    // }
    if(props.open==1){

        return (
            <>
        <div id="mySidenav" className="sidenav">
            <IconButton onClick={()=>{
                    props.open==0?props.setopen(1): props.setopen(0)
                }} sx={{position:"relative",marginLeft:"350px"}}
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
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Oui Oui"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Sandra Adams
                    </Typography>
                    {' — Do you have Paris recommendations? Have you ever…'}
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
        </div>
        </>
    )
        }
    else{
        // console.log("The notification is not opened so there is no running the use effect")
        return (
            <></>
        )
    }
    
}
export default NotificationPop;