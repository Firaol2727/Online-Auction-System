import {useState,useRef,useEffect} from 'react';
import axios from 'axios';
import { TextField,Box, Button, LinearProgress,Link, Typography } from '@mui/material';
import {  redirect, useNavigate } from "react-router-dom";
import  "./css/selogin.css";
const baseUri=axios.create({
    baseURL:"http://localhost:5000/"
    });

const LoginTrial=()=>{
    const [message,setmessage]=useState('');
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    const [loading,setloading]=useState(false);
    const nav=useNavigate();
    const login=()=>{
        console.log(username);
        console.log(password); 
        if(username==''){
            setmessage("Enter username")
            return;
        }
        if(password==''){
            setmessage("password required")
            return;
        }
        setloading(true)
        baseUri.post ("/login",
            { username,password},
            {withCredentials:true}
        ).then(response=>{
          setloading(false)
          console.log("response",response)
            if (response.status===200) {
                console.log("The response is ",response)
                setmessage("Success")
                if(response.data=="BUYER"){
                    nav('/');
                }else if(response.data=="SELLER"){
                    nav('/sel/home');
                }
                
            }else{
                setmessage("username or password error")
            }
        }).catch(err=>{
          setloading(false)
            setmessage("Error username or password")
            console.log("The error is ",err);
        })
    }
    return (
        <div style={{
            position:"absolute",
            width:"100%",
            backgroundColor:"white",
            height:"100%"
        }}>

            <br /> 
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
            
            <div className="slanted-box"></div>
            <div className="slanted-box2"></div>
            <Box sx={{
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
                
                <h2 style={{position:"absolute",top:"0%",left:'3%', fontFamily:"serif"}}>Welcome,</h2>
                <p className='write-in'>The thrill of the auction is just a click away!</p>
                <p style={{
                position:"absolute",
                top:"16%",
                color:"red",
                left:"25%",
                width:"72%"
            }}>{message}</p>
              { loading && <LinearProgress sx={{
              position:"absolute",
                top:"22%",
                color:"white",
                left:"30%",
                width:"20%"
            }} />
}
            <input required placeholder='username' onChange={(e)=>{
                setusername(e.target.value)
                setmessage('')
            }}  type='text' style={{
                position:"absolute",width:"70%" ,height:"35px",top:"25%",left:"8%",padding:'5px',border:"1px gray solid"
            }}></input> <br /> <br />
             <input  required   onChange={(e)=>{
                setpassword(e.target.value)
                setmessage('')
            }} placeholder='password' type='password' style={{
                position:"absolute",width:"70%" ,height:"35px",top:"39%",left:"8%",padding:'5px',border:"1px gray solid"
            }}></input>
            
            <Link href='/forgotpassword' sx={{
                position:"absolute",
                top:"50%",
                color:"green",
                left:"8%",
                width:"40%",
                textDecoration:"none",
                ':hover':{color:'red',cursor:"pointer"}
            }}>forgot password?</Link>
         
            <Button  style={{
                position:"absolute",
                top:"58%",
                left:"8%",
                width:"72%"
            }} variant="contained" color='error' onClick={login}>Login</Button>
            <div style={{position:"absolute",
            bottom:"25%",left:"10%",
            display:"flex",flexDirection:"row"}}>
                <Link underline='none' sx={{color:"gray",
                fontSize:"16px"}}>Do you have an account ?</Link>
               <Link href='/signup' underline='none'
                sx={{marginLeft:"10px",color:" #92291C  ",
                fontSize:"17px",':hover':{color:'green',cursor:"pointer"}
                }}>Sign Up For Free</Link>
            </div>
            <center><p style={{position:"absolute",bottom:"10%",left:"20%"}}>Ⓒ All rights reserved by Nuchereta</p></center>
            </Box>
            
        </div>
    )
}
export default LoginTrial;