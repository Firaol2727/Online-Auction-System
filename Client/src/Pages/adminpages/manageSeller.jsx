import Sidebar from "./sideBar";
import NavbarAdmin from "./adminNavbar";
import { Stack, Box, Button,List, Link, ListItem, IconButton} from '@mui/material';
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
import './css/report.css'
const ManageSeller=()=>{
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
                <TextField id="filled-basic" label="id" variant="filled" sx={{width:"300px"}}/>
                <Button id="find" variant="contained" sx={{width:"100px"}} onClick={
                    ()=>{
                        // document.getElementById("find").style.backgroundColor="lightblue"
                    }
                } >Find</Button>
            </Stack>
            <Box sx={{
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
                    <p style={{color:"gray"}}><b style={{fontSize:"17px",color:"black"}}>User Id </b> - 1543f1h5d4xfgh3215</p>
                    <p style={{color:"gray"}}> <b style={{fontSize:"17px",color:"black"}}>User Name</b>- Liul Girma Tamirat</p>
                    <p style={{color:"gray"}}><b style={{fontSize:"17px",color:"black"}}>Total Auction</b> - 8</p>

                    <ListItem direction={"row"} sx={{height:"20px",padding:"0px"}} ><PhoneIcon /><p style={{color:"gray"}}><b style={{fontSize:"17px",color:"black"}}>Phone No  -</b> AddisAbaba,Bole</p></ListItem><br></br>
                    <ListItem direction={"row"} sx={{height:"20px",padding:"0px"}}><MailIcon/><p style={{color:"gray"}}><b style={{fontSize:"17px",color:"black"}}>Email  -</b> 12/05/2012</p></ListItem><br></br>
                    <ListItem direction={"row"} sx={{height:"20px",padding:"0px"}}><PinDropIcon/><p style={{color:"gray"}} ><b style={{fontSize:"17px",color:"black"}}>City  -</b> 13/07/2012</p></ListItem><br></br>
                    <ListItem direction={"row"} sx={{height:"20px",padding:"0px"}}><PlaceIcon/><p style={{color:"gray"}} ><b style={{fontSize:"17px",color:"black"}}>Region  -</b> 13/07/2012</p></ListItem><br></br>
                    <br></br>
                    
                    <Button variant="contained"  sx={{
                        position:"relative",
                        marginLeft:"600px",
                        width:"200px",
                        backgroundColor:"red",
                        color:"white"
                    }}> Delete</Button>
                </Box>
                
                </Box>
                </Box>
                </Box>
            </Box>
        </Stack>
        
    </div>
    )
}
export default ManageSeller;