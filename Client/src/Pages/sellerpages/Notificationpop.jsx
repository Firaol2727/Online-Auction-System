import {useState,useEffect} from 'react';
import { Popper,Box,Stack,List } from '@mui/material';

const NotificationPop=(props)=>{
    console.log(props);
    
    return (
        <Popper id={id} open={openNotification} anchorEl={anchorElNotification}>
        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper',height:"700px",overflow:"scroll",paddingTop:"22px" }}>
            <Box sx={{
                width:{sm:"400px",xs:"300px",backgroundColor:"lightgreen",height:"100px",marginBottom:"5px"}
            }}
            ></Box>
            <Box sx={{
                width:{sm:"400px",xs:"300px",backgroundColor:"lightgreen",height:"100px",marginBottom:"5px"}
            }}
            ></Box>
            <Box sx={{
                width:{sm:"400px",xs:"300px",backgroundColor:"lightgreen",height:"100px",marginBottom:"5px"}
            }}
            ></Box>
            <Box sx={{
                width:{sm:"400px",xs:"300px",backgroundColor:"lightgreen",height:"100px",marginBottom:"5px"}
            }}
            ></Box>
            <Box sx={{
                width:{sm:"400px",xs:"300px",backgroundColor:"lightblue",height:"100px",marginBottom:"5px"}
            }}
            ></Box>
            <Box sx={{
                width:{sm:"400px",xs:"300px",backgroundColor:"lightgreen",height:"100px",marginBottom:"5px"}
            }}
            ></Box>
            <Box sx={{
                width:{sm:"400px",xs:"300px",backgroundColor:"lightblue",height:"100px",marginBottom:"5px"}
            }}
            ></Box>
            <Box sx={{
                width:{sm:"400px",xs:"300px",backgroundColor:"lightgreen",height:"100px",marginBottom:"5px"}
            }}
            ></Box>
            <Box sx={{
                width:{sm:"400px",xs:"300px",backgroundColor:"lightgreen",height:"100px",marginBottom:"5px"}
            }}
            ></Box>
        </Box>
      </Popper>
    )
}
export default NotificationPop;
