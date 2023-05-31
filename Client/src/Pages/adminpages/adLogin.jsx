import {useState,useRef,useEffect} from 'react';
import axios from 'axios';
import { TextField,Box, Button } from '@mui/material';
import { redirect, useNavigate } from "react-router-dom";
const baseUri=axios.create({
    baseURL:"http://localhost:5000/special"
    });
const AdLogin=()=>{
    const [message,setmessage]=useState('');
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    const nav=useNavigate();
    const login=()=>{
        setmessage("loading...")
        console.log(username);
        console.log(password); 
        baseUri.post ("/login",
            { username,password},
            {withCredentials:true}
        ).then(response=>{
            if (response.status===200) {
                console.log("The response is ",response)
                setmessage("Success")
                nav('/auctioncontrol');
            }else{
                setmessage("username or password error")
            }
        }).catch(err=>{
            setmessage("login failed")
            console.log("The error is ",err);
        })
    }
    return (
        <>
            <br /> <br /> <br /> <br /> <br /> <br />
            <center>
                <h2>Login</h2>
            <hr />
            <p>{message}</p>
            <TextField  onChange={(e)=>{
                setusername(e.target.value)
            }} label="Email or phoneNumber"/> <br /> <br />
            <TextField   onChange={(e)=>{
                setpassword(e.target.value)
            }} label="Password" type='password'/> <br />
            <Button variant="contained" onClick={login}>Loging</Button>
            </center>
        </>
    )
}
export default AdLogin;