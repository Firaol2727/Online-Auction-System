import Sidebar from "./sideBar";
import NavbarAdmin from "./adminNavbar";
import { Stack, Box, Button} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import './css/report.css';
import axios from "axios";
const baseapi=axios.create({baseURL:"http://localhost:5000/special"})
const Adprofile=()=>{
    const nav=useNavigate();
    const [editmode,setedimode]=useState(0);
    const [profile,setprofile]=useState();
    const [message,setmessage]=useState();
    const [loading,setloading]=useState(false);
    const [error,seterror]=useState(2);
    const [pp,setpp]=useState('');
    const [np,setnp]=useState('');
    const [cp,setcp]=useState('');
    const openEditmode=()=>{
        editmode==0?setedimode(1):setedimode(0);
        seterror(2)

    }
    const handleChangepassword=()=>{
        console.log("old password",pp)
        console.log("new password",np)
        console.log("confirm password",cp)
        if(cp==pp && pp !=''){
            baseapi.post("changepp",{withCredentials:true})
            .then(res=>{
                setloading(false);
                if(res.status==200){
                    seterror(0);
                }
            })
            .catch(err=>{
                console.log("Error",err);
                setloading(false);
                seterror(0)
                
            })
        }
        else{
            seterror(3)
        }
    }
    useEffect(()=>{
        baseapi.get("/myprofile",{withCredentials:true})
        .then(res=>{
            console.log("Response",res)
            if(res.status==200){
                setprofile(res.data)
                seterror(1)
            }else if(res.status==403){
                nav("/adlogin")
            }
        })
        .catch(err=>{
            console.log("The error ",err);
        })
    },[]);

    return(
    <div>
        <NavbarAdmin sx={{position:"absolute"}}/>
        <Stack direction="row" sx={{position:"relative",marginTop:"30px"}} spacing={0.5}>
            <Sidebar/>

            {profile && <Box flex={6} >
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
                <h3 style={{
                    marginLeft:"80px",
                    marginTop:"5px",
                }}>ADMIN</h3>
                </Box>
                <Box className="description" style={{
                    position:"absolute",
                    width:"65%",
                    left:"25%",
                    // height:"800px",
                    padding:"5px",
                    backgroundColor:"white"
                }}>
                    <p style={{color:"gray"}}><b style={{fontSize:"17px",color:"black"}}> Email</b> - {profile.email}</p>
                    <p style={{color:"gray"}}> <b style={{fontSize:"17px",color:"black"}}>Phone Number</b>- {profile.phone}</p>
                    
                    <br></br>
                    <Button variant="contained" onClick={openEditmode} sx={{
                        marginLeft:"500px"
                    }}> <EditIcon/>Change password</Button>
                {editmode==1 && <div>
                    <div style={{
                            marginLeft:"50px",
                            marginTop:"70px"
                    }}>
                        <h3 style={{color:"blue"}}>Change Password</h3>
                        </div>
                    <div style={{
                            marginLeft:"100px",
                            marginTop:"30px"
                    }}>
                        {error==1 && <center><b style={{color:"red"}}>Error password</b></center>}
                        {error==0 && <center><b style={{color:"green"}}>password changed successfully</b></center>}
                        {error==3 && <center><b style={{color:"red"}}>password must be same</b></center>}
                        <b>Old password -</b>  <TextField id="standard-basic" label="Old password" variant="filled" onChange={(e)=>{setpp(e.target.value)}} /><br /><br />
                        <b>New password -</b> <TextField id="filled-basic" label="New Password" variant="filled" onChange={(e)=>{setnp(e.target.value)}}  sx={{marginRight:"80px"}}/>
                            <TextField id="filled-basic" label="Confirm Password" variant="filled" onChange={(e)=>{setcp(e.target.value)}} /><br /> <br />
                        <Button variant="contained" color="secondary" 
                            onClick={handleChangepassword}
                        sx={{
                            marginTop:"50px",
                            marginLeft:"50px"
                        }}>Confirm Change</Button>

                    </div>
                    </div>}

                </Box>
                    
                </Box>
                </Box>
                </Box>
            </Box>}
        </Stack>
        
    </div>
    )
}
export default Adprofile;