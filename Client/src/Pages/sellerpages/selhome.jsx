import './selnav';
import './selSidebar'
import SellerNavbar from './selnav';
import SelSidebar from './selSidebar';
import { useRef } from 'react';
import { Box ,Stack} from '@mui/material';
import { Component } from 'react';
const getmarings=()=>{
    let materialwidth=window.innerWidth;
    if (materialwidth>800){
        return "20%"
    } else {
        return "0%"
    }
}
const selHome=()=>{
    
    return (
        <>
            <SellerNavbar/>
                <Box sx={{
                    position:"absolute",
                    marginTop:"80px",
                    border:"1px black solid",
                    left:getmarings,
                    right:getmarings
                
                }} ><><b>This is sellers home page </b></>
                </Box>
        </>
    );
}
export default selHome;