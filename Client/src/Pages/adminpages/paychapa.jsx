import NavbarAdmin from "./adminNavbar";
import Sidebar from "./sideBar";
import { Stack,Box, Button } from "@mui/material";
import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseapi =axios.create({baseURL:"http://localhost:5000"})
const PayChapa=()=>{
    const [loading,setloading]=useState(false);
    const [message,setmessage]=useState(false);
    const nav =useNavigate();
    const handlepayment=()=>{
        baseapi.get("/paychapa",{withCredentials:true})
        .then(res=>{
            if(res.status==200){
                console.log(res.data);
                window.location.replace(res.data);
            }
            console.log(res)
        }).catch(err=>{
            console.log(err);
        })
    }

    return(
        <div>
            <NavbarAdmin sx={{position:"absolute"}}/>
            <Stack direction="row" sx={{position:"relative",marginTop:"30px"}} spacing={0.5}>
                <Sidebar/>
                <div style={{marginTop:"300px",marginLeft:"200px"}}>
                    <Button onClick={handlepayment } sx={{
                        backgroundColor:"red",color:"white",
                        ":hover":{
                            backgroundColor:"brown"
                        }
                        }}>
                    Pay
                </Button>
                </div>
                
            </Stack>
        </div>);

}
export default PayChapa;