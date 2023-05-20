import { useState,useEffect } from "react";
import SellerNavbar from "./selnav";
import Box from '@mui/material/Box';
import { Button, TextField } from "@mui/material";
const SelChangePassword=()=>{
    return (
        <div>
            <SellerNavbar/>
            <Box sx={{
                position:"absolute",
                marginTop:"64px",
                height:"100%",
                backgroundColor:"#E0DBDB",
                left:{
                    sm:"20%",
                    xs:"0%"
                },
                right:{
                    sm:"20%",
                    xs:"0%"
                }
            }}>
                <center>
                    <Box style={{marginTop:"20%",marginRight:"10%",marginLeft:"10%"}}>
                        <h2> Change Password</h2>
                        <p>Error message here</p>
                    <TextField label="Old password"  variant="filled" sx={{width:"300px",backgroundColor:"white"}}/><br /> <br />
                    <TextField label="new password"  variant="filled" sx={{width:"300px",backgroundColor:"white"}}/> <br /> <br />
                    <TextField label="new password"  variant="filled" sx={{width:"300px",backgroundColor:"white"}}/> <br />
                    <br />
                    <Button variant="contained">Submit</Button>
                    </Box>
                    
                </center>
                

            </Box>
        </div>
    )
}
export default SelChangePassword;