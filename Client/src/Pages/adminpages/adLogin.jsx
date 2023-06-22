import {useState,useRef,useEffect} from 'react';
import axios from 'axios';
import { TextField,Box, Button, CircularProgress, LinearProgress } from '@mui/material';
import { redirect, useNavigate } from "react-router-dom";
import  "./css/adLogin.css";
const baseUri=axios.create({
    baseURL:"http://localhost:5000/special"
    });

const AdLogin=()=>{
    const [message,setmessage]=useState('');
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    const [loading,setloading]=useState('');
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
            setloading(false);
            if (response.status===200) {
                console.log("The response is ",response)
                setmessage("Success")
                nav('/auctioncontrol');
            }else{
                setmessage("Error username or password")
            }
        }).catch(err=>{
            setloading(false);
            setmessage("login failed")
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
            
            <div class="slanted-box"></div>
            <div class="slanted-box2"></div>
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
                
                <h2 style={{position:"absolute",top:"0%",left:'6%', fontFamily:"serif"}}>Welcome,</h2>
                <p className='write-in'>The thrill of the auction is just a click away!</p>
                <p style={{
                position:"absolute",
                top:"18%",
                color:"red",
                left:"30%",
                width:"72%"
            }}>{message}</p>
            <input required placeholder='username' onChange={(e)=>{
                setusername(e.target.value)
                setmessage('')
            }}  type='text' style={{
                position:"absolute",width:"70%" ,height:"35px",top:"30%",left:"8%",padding:'5px',border:"1px gray"
            }}></input> <br /> <br />
            <input  required   onChange={(e)=>{
                setpassword(e.target.value)
                setmessage('')
            }} placeholder='password' type='password' style={{
                position:"absolute",width:"70%" ,height:"35px",top:"44%",left:"8%",padding:'5px',border:"1px gray"
            }}></input>

            
            {loading && <LinearProgress style={{
                position:"absolute",
                top:"65%",
                color:"red",
                left:"30%",
                width:"22%" 
            }} />}

            <Button  style={{
                position:"absolute",
                top:"75%",
                left:"8%",
                width:"72%"
            }} variant="contained" color='error' onClick={login}>Login</Button>
            <center><p style={{position:"absolute",bottom:"4%",left:"25%"}}>Ⓒ All rights reserved by Nuchereta</p></center>
            </Box>
            
        </div>
    )
}
export default AdLogin;