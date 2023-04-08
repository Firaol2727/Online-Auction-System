import { IconButton } from "@mui/material";
import WestIcon from '@mui/icons-material/West';
import {CircularProgress} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
const Notifications=(props)=>{
    console.log("The props is",props.open)
    if(props.open==1){
        return (
            <>
        <div id="mySidenav" className="sidenav">
            <IconButton onClick={()=>{
                    props.open==0?props.setopen(1): props.setopen(0)
                }} sx={{position:"relative",marginLeft:"350px"}}
                ><WestIcon color="primary"/>
            </IconButton>
            <div style={{position:"relative",minHeight:"65px",maxHeight:"100px", marginTop:"2px", backgroundColor:"greenyellow"}}> this is a notification page the colors may be different according to the auctions</div>
            <div style={{position:"relative",minHeight:"65px",maxHeight:"100px", marginTop:"2px", backgroundColor:"greenyellow"}}> this is a notification page the colors may be different according to the auctions</div>
            
        </div>
        </>
    )
        }
    else{
        console.log("The notification is not opened so there is no running the use effect")
        return (
            <></>
        )
    }
    
}
export default Notifications;