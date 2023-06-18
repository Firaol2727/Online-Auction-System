import Sidebar from "./sideBar";
import NavbarAdmin from "./adminNavbar";
import { Stack, Box, Button,List, Link, ListItem, IconButton, CircularProgress} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PinDropIcon from '@mui/icons-material/PinDrop';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import './css/report.css';
import { useNavigate } from "react-router-dom";
import {useEffect,useState} from 'react';
import axios from "axios";
const baseapi=axios.create({withCredentials:true,baseURL:"http://localhost:5000/special"})
const ManageSeller=()=>{
    const nav=useNavigate();
    const [auction,setauction]=useState(null);
    const [message,setmessage]=useState();
    const [searchid,setsearchid]=useState('')
    const [loading,setloading]=useState(false);
    const [dloading,setdloading]=useState(false);
    const handleSearch=(id)=>{
        console.log("The id is ",id)
        setauction(null);
        baseapi.post("/seller",{"sid":id},{withCredentials:true})
        .then(res=>{
            setloading(false)
            if(res.status==200){
                setauction(res.data);
            }
            else if (res.status==400){
                setmessage("No Auction with this id")
            }
            else if (res.status==403){
                nav('/adlogin')
            }
            else{
                setmessage("ERROR while searching")
            }
        })
        .catch(err=>{
            console.log("The error is ",err);
            setloading(false);
        })
    }
    const handledelete=(id)=>{
        console.log("The id is ",id)
        setdloading(true)
        setmessage(null)
        baseapi.post("/deleteseller",{"sid":id},{withCredentials:true})
        .then(res=>{
            setdloading(false)
            if(res.status==200){
                setauction(res.data);
            }
            else if (res.status==400){
                setmessage("No Seller with this id")
            }
            else if (res.status==403){
                nav('/adlogin')
            }
            
        })
        .catch(err=>{
            console.log("The error is ",err);
            setloading(false);
        })
    }
    return(
    <div>
        <NavbarAdmin sx={{position:"absolute"}}/>
        <Stack direction="row" sx={{position:"relative",marginTop:"30px"}} spacing={0.5}>
            <Sidebar/>
            <Box flex={6} >
                <Box  sx={{
                    position:"relative",
                    marginTop:"50px",
                    
                }} >
            <h3>Enter Seller Id </h3>
            <Stack direction="row"style={{marginLeft:"30px"}} >
                <TextField id="filled-basic" label="id" variant="filled" sx={{width:"300px"}} onChange={(e)=>{setsearchid(e.target.value)}}/>
                <Button id="find" variant="contained" sx={{width:"100px"}} disabled={loading} onClick={()=>{handleSearch(searchid)}}>{ loading?<center><CircularProgress /></center>:"Search"}</Button>
            </Stack>
            {auction && <Box sx={{
                    position:"relative",
                    marginTop:"5px",
                    // s
                    backgroundColor:"lightgreen"
                }}>
                <Box sx={{position:"absolute",width:"100%"}}>
                <Box className="picture" style={{
                    position:"absolute",
                    width:"260px",
                    // backgroundColor:"white"
                }}>
                    <Box className="picture" style={{
                    position:"relative",
                    marginLeft:"30px",
                    width:"250px",
                    height:"250px",
                    backgroundColor:"gray"
                }}>
                    < PersonOutlineIcon  sx={{
                        position:"absolute",
                        height:"100%",
                        width:"100%",
                        color:"white"
                    }}/>
                </Box>
                <h4 style={{
                    marginLeft:"80px",
                    marginTop:"5px",
                }}>Liul Girma</h4>
                </Box>
                <Box className="description" style={{
                    position:"absolute",
                    width:"65%",
                    left:"25%",
                    // height:"800px",
                    padding:"5px",
                    backgroundColor:"white"
                }}>
                    <p style={{color:"black"}}>User Id -<b>1543f1h5d4xfgh3215</b> </p>
                    <p style={{color:"black"}}> User Name- <b>Liul Girma Tamirat</b></p>
                    <p style={{color:"black"}}>Total Auction - <b>8</b></p>

                    <ListItem direction={"row"} sx={{height:"20px",padding:"0px"}} ><PhoneIcon /><p style={{color:"black"}}>Phone No  - <b> AddisAbaba,Bole</b></p></ListItem><br></br>
                    <ListItem direction={"row"} sx={{height:"20px",padding:"0px"}}><MailIcon/><p style={{color:"black"}}>Email  - <b>12/05/2012</b></p></ListItem><br></br>
                    <ListItem direction={"row"} sx={{height:"20px",padding:"0px"}}><PinDropIcon/><p style={{color:"black"}} >City  - <b>13/07/2012</b></p></ListItem><br></br>
                    <ListItem direction={"row"} sx={{height:"20px",padding:"0px"}}><PlaceIcon/><p style={{color:"black"}} >Region  - <b>13/07/2012</b></p></ListItem><br></br>
                    <br></br>
                    
                    <Button variant="contained" disabled={dloading} onClick={handledelete} sx={{
                        position:"relative",
                        marginLeft:"600px",
                        width:"200px",
                        backgroundColor:"red",
                        color:"white",
                        ':hover':{
                            backgroundColor:"brown",
                        }
                    }}> { dloading?<center><CircularProgress /></center>:"Delete"}</Button>
                </Box>
                
                </Box>
            </Box>}
            {message && <center><b>No Seller with this id </b></center>}
                </Box>
            </Box>
        </Stack>
        
    </div>
    )
}
export default ManageSeller;