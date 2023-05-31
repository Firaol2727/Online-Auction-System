import Sidebar from "./sideBar";
import NavbarAdmin from "./adminNavbar";
import { Stack, Box, Button} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import { useState,useEffect } from "react";
import './css/report.css';
const Adprofile=()=>{

    const [editmode,setedimode]=useState(0);
    const openEditmode=()=>{
        editmode==0?setedimode(1):setedimode(0);
    }
    const [loading,setloading]=useState(0);
    
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
           
            <Stack direction="row"style={{marginLeft:"30px"}} >
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
                    <p style={{color:"gray"}}><b style={{fontSize:"17px",color:"black"}}>Admin Email</b> - 1543f1h5d4xfgh3215</p>
                    <p style={{color:"gray"}}> <b style={{fontSize:"17px",color:"black"}}>Phone Number</b>- Liul Girma Tamirat</p>
                    <p style={{color:"gray"}}><b style={{fontSize:"17px",color:"black"}}>Total Auction</b> - 8</p>
                    <br></br>
                    <Button variant="contained" onClick={openEditmode} sx={{
                        marginLeft:"500px"
                    }}> <EditIcon/>Change password</Button>
                   {editmode==1 && <div>
                    <div style={{
                            marginLeft:"50px",
                            marginTop:"70px"
                    }}>
                        <h3 style={{color:"red"}}>Change Password</h3>
                        </div>
                    <div style={{
                            marginLeft:"100px",
                            marginTop:"30px"
                    }}>
                        <b>Old password -</b>  <TextField id="standard-basic" label="Old password" variant="filled" /><br /><br />
                        <b>New password -</b> <TextField id="filled-basic" label="New Password" variant="filled" sx={{marginRight:"80px"}}/>
                          <TextField id="filled-basic" label="Confirm Password" variant="filled" /><br /> <br />
                        <Button variant="contained" color="secondary" sx={{
                            marginTop:"50px",
                            marginLeft:"50px"
                        }}>Confirm Change</Button>

                    </div>
                    </div>}

                </Box>
                    
                </Box>
                </Box>
                </Box>
            </Box>
        </Stack>
        
    </div>
    )
}
export default Adprofile;