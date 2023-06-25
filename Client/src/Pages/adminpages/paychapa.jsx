import NavbarAdmin from "./adminNavbar";
import Sidebar from "./sideBar";
import { Stack,Box, Button, TextField } from "@mui/material";
import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseapi =axios.create({baseURL:"http://localhost:5000"})
const PayChapa=()=>{
    const [loading,setloading]=useState(false);
    const [message,setmessage]=useState(false);
    const nav =useNavigate();
    const [email,setemail]=useState("");
    const [phone,setphone]=useState("");
    const [password,setpassword]=useState("");
    const [passkey,setpasskey]=useState("");
    const [errm,seterrm]=useState("");
    const handlepayment=()=>{
        baseapi.post("/createadmin",{email,password,passkey,phone},{withCredentials:true})
        .then(res=>{
            if(res.status==200){
                nav("/reports")
                // window.location.replace(res.data);
            }
            console.log(res)
        }).catch(err=>{
            console.log(err);
            seterrm("You can't add admin")

        })
    }

    return(
        <div>
            <NavbarAdmin sx={{position:"absolute"}}/>
            <Stack direction="row" sx={{position:"relative",marginTop:"30px"}} spacing={0.5}>
                <Sidebar/>
                <br></br>
                <center>
                    
                    <form style={{position:"absolute",left:"35%",
                    width:"50%",top:"25%",padding:"20px",
                    border:"1px gray solid",borderRadius:"20px"}}>
                        <h2>Create Admin </h2>
                    <h4>Note: Creating admin is allowed only to the super admin !</h4>
                    <br />
                    <br />
                        <p style={{color:"red"}}>{errm}</p>
                        <TextField label="Email" type="email" onChange={(e)=>{setemail(e.target.value)}} style={{width:"70%"}}></TextField> <br /> <br />
                        <TextField label="phone"  onChange={(e)=>{setphone(e.target.value)}} style={{width:"70%"}}></TextField> <br /> <br />
                        <TextField label="password"  onChange={(e)=>{setpassword(e.target.value)}} style={{width:"70%"}}></TextField><br /> <br />
                        <TextField label="passkey"  onChange={(e)=>{setpasskey(e.target.value)}} style={{width:"70%"}}></TextField><br /> <br />
                        <Button onClick={handlepayment } sx={{
                        backgroundColor:"red",color:"white",
                        ":hover":{
                            backgroundColor:"brown"
                        }
                        }}>
                    Create Admin
                </Button>
                    </form>
                </center>
                
            </Stack>
        </div>);

}
export default PayChapa;