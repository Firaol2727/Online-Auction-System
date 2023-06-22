import {useState,useRef,useEffect} from 'react';
import axios from 'axios';
import { TextField,Box, Button, Link, CircularProgress } from '@mui/material';
import { redirect, useNavigate } from "react-router-dom";
import  "./css/forgotpassword.css";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import 
const baseUri=axios.create({
    baseURL:"http://localhost:5000/"
    });
const ForgotPassword=()=>{
    const [message,setmessage]=useState('');
    const [vmessage,setvmessage]=useState('');
    const [email,setemail]=useState('');
    const [code,setcode]=useState('');
    const [loading,setloading]=useState(false);
    const [verifyloading,setverifyloading]=useState(false);
    const [codesent,setcodesent]=useState(0);
    const nav=useNavigate();
    const sendEmail=()=>{
        if(email==''){
            setmessage("Enter username")
            return;
        }
        setloading(true)
        baseUri.post ("/forgotpassword",
            { email},
            {withCredentials:true}
        ).then(response=>{
            setloading(false)
            if (response.status===200) {
                setcodesent(1);
                console.log("The response is ",response)
                
            }else{
                setmessage("username or password error")
            }
        }).catch(err=>{
          setloading(false)
            setmessage("Error username or password")
            console.log("The error is ",err);
        })
    }
    const sendVerificationCode=()=>{
        if(code==''){
            return;
        }else{
            setverifyloading(true)
        baseUri.post("/verifycode",
            {email, code},
            {withCredentials:true}
        ).then(response=>{
        setverifyloading(false)
            if (response.status===200) {
                setcodesent(2);
                console.log("The response is ",response)
                setvmessage("Success")
            }else{
                setvmessage("Invalid code")
            }
        }).catch(err=>{
          setverifyloading(false)
            setvmessage("Invalid code")
            console.log("The error is ",err);
        })
        }
        
    }
    return (
        <div style={{
            position:"absolute",
            width:"100%",
            backgroundColor:"white",
            height:"100%"
        }}>

            <br /> <br /> 
            <div style={{position:"absolute",left:"5%",height:"60px"}}>
                <img src="/logo2.png" href="" width="40px" height={"60px"} 
                style={{position:"absolute",left:"0%",top:"20px"}}/>
                <h1 style={{
                    position:"absolute",
                    // backgroundColor:"yellow",
                    top:"0%",
                    left:"43px",
                    fontSize:"40px",
                    fontFamily:"sans-serif",color:"brown",
                    
                }}>Nuchereta</h1>
            </div>
            
            <div class="slanted-box"></div>
            <div class="slanted-box2"></div>
            { codesent ==0 && <Box 
            sx={{
                position:"absolute",
                zIndex:2,
                top:"25%",
                height:"60%",
                backgroundColor:"white",
                left:{
                    sm:"30%",
                    xs:"8%",
                    ms:"30%",
                    lg:"30%"
                },
                width:{
                    xs:"90%",
                    sm:"40%",
                    ms:"40%",
                    lg:"40%"

                }
            }}>
                <p style={{position:"absolute",top:"0%",
                left:'6%', fontFamily:"serif",fontSize:"20px",fontWeight:"bold"}}>Reset your password</p>
                 {message && <p style={{position:"absolute",top:"10%",color:"red",
                left:'35%', fontFamily:"serif",}}>Error email</p>}
            <input required placeholder='Email' onChange={(e)=>{
                setemail(e.target.value)
                setmessage('')
            }}  type='email' style={{
                position:"absolute",width:"70%" ,height:"35px",top:"20%",left:"8%",padding:'5px',border:"1px gray solid"
            }}></input> <br /> <br />

            <Button  style={{
                position:"absolute",
                top:"40%",
                left:"8%",
                width:"72%",
                height:"40px"
            }} variant="contained" color='error' onClick={sendEmail}>
                { loading &&<CircularProgress color='secondary'  sx={{position:"absolute",left:"10%",width:"30px"}}/>}
                Reset Password</Button>
                <div style={{position:"absolute",
                    top:"57%",left:"30%",
                    display:"flex",flexDirection:"row"}}>
                <Link underline='none' sx={{color:"gray",
                    fontSize:"16px"}}>Back to</Link>
                <Link href='/sel/login' underline='none'
                    sx={{marginLeft:"10px",color:" #92291C  ",
                    fontSize:"17px",':hover':{color:'green',cursor:"pointer"}
                }}>Login </Link></div>
                <div style={{position:"absolute",
                    top:"64%",left:"10%",
                    display:"flex",flexDirection:"row"}}>
                <Link underline='none' sx={{color:"gray",
                    fontSize:"16px"}}>Do you have an account ?</Link>
                <Link href='/signup' underline='none'
                    sx={{marginLeft:"10px",color:" #92291C  ",
                    fontSize:"17px",':hover':{color:'green',cursor:"pointer"}
                }}>Signup Up </Link>
            </div>
            <center><p style={{position:"absolute",bottom:"18%",left:"15%"}}>Ⓒ All rights reserved by Nuchereta</p></center>
            </Box>}
            { codesent ==1 && <Box 
            sx={{
                position:"absolute",
                zIndex:2,
                top:"25%",
                height:"60%",
                backgroundColor:"white",
                left:{
                    sm:"30%",
                    xs:"8%",
                    ms:"30%",
                    lg:"30%"
                },
                width:{
                    xs:"90%",
                    sm:"40%",
                    ms:"40%",
                    lg:"40%"

                }
            }}>
                
                <p style={{position:"absolute",top:"0%",
                left:'6%', fontFamily:"serif",fontSize:"18px",fontWeight:"bold"}}>Verify code</p>
                {vmessage && <p style={{position:"absolute",top:"10%",color:"red",
                left:'35%', fontFamily:"serif",}}>Error code !</p>}
            <input required placeholder='code' onChange={(e)=>{
                setcode(e.target.value)
                setvmessage('')
            }}  type='text' style={{
                position:"absolute",width:"70%" ,height:"35px",top:"20%",left:"8%",padding:'5px',border:"1px gray solid"
            }}></input> <br /> <br />

            <Button  style={{
                position:"absolute",
                top:"40%",
                left:"8%",
                width:"72%",
                height:"40px"
            }} variant="contained" color='error' onClick={sendVerificationCode}>
                { verifyloading &&<CircularProgress color='secondary'  sx={{position:"absolute",left:"10%",width:"30px"}}/>}
                verify code</Button>
            <center><p style={{position:"absolute",bottom:"18%",left:"15%"}}>Ⓒ All rights reserved by Nuchereta</p></center>
            </Box>}
            { codesent ==2 && <Box sx={{
                position:"absolute",
                zIndex:2,
                top:"25%",
                height:"60%",
                backgroundColor:"white",
                left:{
                    sm:"30%",
                    xs:"8%",
                    ms:"30%",
                    lg:"30%"
                },
                width:{
                    xs:"90%",
                    sm:"40%",
                    ms:"40%",
                    lg:"40%"

                }
            }}>
                <CheckCircleOutlineIcon sx={{
                    position:"absolute",top:"6%",color:"green",height:"25px",
                    left:'24%',
                }}/>
                <p style={{position:"absolute",top:"0%",color:"green",
                left:'30%', fontFamily:"serif",marginLeft:"10px",fontSize:"25px",fontWeight:"bold"}}>Verified !</p>
                <p style={{position:"absolute",top:"10%",color:"black",
                left:'20%', fontFamily:"serif",marginLeft:"10px",fontSize:"20px",height:"200px"}}> 
                    Your new <b>password</b> has been   <br /> <b>sent to your email! </b> 
                    Login and change your password
                </p>
            <br /> <br />
            <Button  style={{
                position:"absolute",
                top:"40%",
                left:"40%",
                width:"20%",
                height:"40px"
            }} variant="contained" color='error' >
                <a href='/sel/login' style={{color:"white",textDecoration:"none"}}>Login</a> </Button>
            <center><p style={{position:"absolute",bottom:"18%",left:"15%"}}>Ⓒ All rights reserved by Nuchereta</p></center>
            </Box>}
            
        </div>
    )
}
export default ForgotPassword;