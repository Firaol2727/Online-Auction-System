import {useState,useRef,useEffect} from 'react';
import axios from 'axios';
import { TextField,Box, Button, LinearProgress,Link, Typography, Stack } from '@mui/material';
import {  redirect, useNavigate } from "react-router-dom";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import {Select} from '@mui/material';
import {MenuItem} from '@mui/material';
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreIcon from "@mui/icons-material/MoreVert";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import { NavLink, useLocation } from "react-router-dom";
import SignupFormBuyer from "../../Components/SignupForm/SignupFormBuyer";
import SignupFormSeller from "../../Components/SignupForm/SignupFormSeller";
import SignupForm from "../../Components/SignupForm/SignupForm";
// import SignupFormBuyer from "../../Components/SignupForm/SignupFormBuyer";
// import SignupFormSeller from "../../Components/SignupForm/SignupFormBuyer";
import LoginForm from "../../Components/LoginForm";

import FormControlLabel from "@mui/material/Dialog";

import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";

import Radio from "@mui/material/Radio";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import CircularProgress from "@mui/material/CircularProgress";
axios.create({
  baseURL: "http://localhost:5000",
});

import  "./css/signup.css";
const baseUri=axios.create({
    baseURL:"http://localhost:5000/"
    });
function BuyerForm() {
        return (
        <Box
        sx={{
            position:"absolute",
            backgroundColor:"white",
            zIndex:"2",
            marginLeft: {
            lg: "25%",
            md: "25%",
            sm: "7%",
            xs: "7%",
            },
            border:"1px gray solid",
            marginRight: "30px",
            top: "25%",
            padding:"20px",
            width: {
            lg: "50%",
            md: "50%",
            sm: "82%",
            xs: "82%",
            },
        }}
          >
            <form >
              <center><Typography sx={{ color: "black",fontSize:"25px",fontWeight:"bolder" }}>Sign Up  Buyer</Typography></center>
              {/* <hr /> */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
    
                  textAlign: "center",
                }}
              >
                <TextField
                //   onChange={handleInputChangeBuyer}
                //   value={state.buyerData.fname}
                  name="fname"
                  label="First Name"
                  variant="standard"
                  sx={{ margin: "5px" }}
                  required
                />
    
                <TextField
                //   onChange={handleInputChangeBuyer}
                //   value={state.buyerData.lname}
                  name="lname"
                  label="Last Name"
                  variant="standard"
                  sx={{ margin: "5px" }}
                  required
                />
    
                <TextField
                //   onChange={handleInputChangeBuyer}
                //   value={state.buyerData.email}
                  name="email"
                  label="Email"
                  variant="standard"
                  sx={{ margin: "5px" }}
                  required
                  type="email"
                />
    
                <TextField
                //   onChange={handleInputChangeBuyer}
                //   value={state.buyerData.phonenumber}
                  name="phonenumber"
                  label="Phone Number"
                  variant="standard"
                  sx={{ margin: "5px" }}
                  required
                  type="text"
                />
    
                <TextField
                //   onChange={handleInputChangeBuyer}
                //   value={state.buyerData.password}
                  name="password"
                  label="Password"
                  variant="standard"
                  sx={{ margin: "5px" }}
                  type="password"
                  required
                />
    
                <TextField
                //   onChange={handleInputChangeBuyer}
                //   value={state.buyerData.confirmpassword}
                  name="confirmpassword"
                  label="Confirm Password"
                  variant="standard"
                  type="password"
                  sx={{ margin: "5px" }}
                  required
                />
    
                <Box>
                  {/* <Typography sx={{ color: "red" }}>{responseBuyer}</Typography> */}
                </Box>
                <Box
                  sx={{
                    alignItems: "center",
                    justify: "center",
                    textAlign: "Center",
                    backgroundColor: "red",
                    marginTop: "30px",
                  }}
                >
                  <Button
                    sx={{
                      fontSize: "20px",
                      textTransform: "unset",
                      color: "white",
                    }}
                    // disabled={savingBuyer}
                    type="submit"
                  >
                    Create Account
                    {/* {savingBuyer ? (
                      <>
                        <CircularProgress size={24} />
                        Saving...
                      </>
                    ) : (
                      " Create Account"
                    )} */}
                  </Button>
                  {/* <span style={{ color: "red" }}>{responseBuyer}</span> */}
                </Box>
              </Box>
            </form>
          </Box>
        );
    }
    
function SellerForm() {
return (
    <Box
    sx={{
        position:"absolute",
        backgroundColor:"white",
        zIndex:"2",
        marginLeft: {
        lg: "25%",
        md: "25%",
        sm: "7%",
        xs: "7%",
        },
        
        marginRight: "30px",
        marginBottom:"-30%",
        top: "20%",
      
        width: {
        lg: "50%",
        md: "50%",
        sm: "83%",
        xs: "83%",
        },
    }}
    >
    <form style={{border:"1px gray solid", borderRadius:"30px", padding:"20px",}}>
        <center><Typography 
        sx={{ 
            color: "black" ,
            marginTop:"20px",
            fontSize:{
                lg: "30px",
                md: "30px",
                sm: "25px",
                xs: "25px",
            },
            fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"
            }}>Sign up to get best price for your products</Typography></center> 
        <br />
        <Box
        sx={{
            display: "flex",
            flexDirection: "column",
        }}
        >
        <Stack gap={2} direction={{sm:"column",xs:"column",lg:"row",md:"row"}} 
            sx={{ width:"100%"}} >
            <TextField
                // onChange={(e) =>
                //   dispatchSeller({ type: "firstName", firstName: e.target.value })
                // }
                // value={stateSeller.firstName}\
            //   onChange={handleInputChange}
            //   value={state.sellerData.fname}
                name="fname"
                label="First Name"
                variant="standard"
                sx={{ margin: "5px",width:{sm:"47%",xs:"96%",lg:"96%",md:"47%"} }}
                required
            />
            <TextField
                //
            //   onChange={handleInputChange}
                // value={state.sellerData.lname}
                name="lname"
                label="Last Name"
                variant="standard"
                sx={{ margin: "5px" ,width:{sm:"47%",xs:"96%",lg:"96%",md:"47%"} }}
                required
            />
        </Stack>
        <TextField
            // onChange={handleInputChange}
            // value={state.sellerData.email}
            name="email"
            label="Email"
            variant="standard"
            sx={{ margin: "5px" }}
            required
            type="email"
        />

        <TextField
        //   onChange={handleInputChange}
        //   value={state.sellerData.phonenumber}
            name="phonenumber"
            label="Phone Number"
            variant="standard"
            sx={{ margin: "5px" }}
            required
            type="number"
        />

        <TextField
        //   onChange={handleInputChange}
        //   value={state.sellerData.password}
            name="password"
            label="Password"
            variant="standard"
            sx={{ margin: "5px" }}
            required
            type="password"
        />
        {/* <span style={{ color: "red" }}>{formErrorsSeller.password}</span> */}
        <TextField
            // onChange={handleInputChange}
        //   value={state.sellerData.confirmpassword}
            name="confirmpassword"
            label="Confirm Password"
            variant="standard"
            sx={{ margin: "5px" }}
            required
            type="password"
        />
        <span style={{ color: "red" }}>
            {/* {formErrorsSeller.confirmPassword} */}
        </span>

        <Box sx={{ float: "right", display: "flex", flexWrap: "wrap" }}>
            <Typography sx={{ float: "left", paddingTop: "17px" }}>
            Select region:
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 70 }}>
            <Select
                // value={region}
                required
            //   onChange={handleInputChange}
            //   value={state.sellerData.region}
                name="region"
                // displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{ height: "40px" }}
            >
                <MenuItem value={"Addis Ababa"}>Addis Ababa</MenuItem>
                <MenuItem value={"Dire Dawa"}>Dire Dawa</MenuItem>
                <MenuItem value={"Oromia"}>Oromia</MenuItem>
                <MenuItem value={"Amhara"}>Amhara</MenuItem>
                <MenuItem value={"Tigray"}>Tigray</MenuItem>
                <MenuItem value={"Afar"}>Afar</MenuItem>
                <MenuItem value={"Somali"}>Somali</MenuItem>
                <MenuItem value={"Gambela"}>Gambela</MenuItem>
                <MenuItem value={"Harari"}>Harari</MenuItem>
                <MenuItem value={"Benishangul-Gumuz"}>
                Benishangul-Gumuz
                </MenuItem>
                <MenuItem value={"SWEP"}>SWEP</MenuItem>
                <MenuItem value={"SNNP"}>SNNP</MenuItem>
            </Select>
            </FormControl>
        </Box>

        <TextField
        //   onChange={handleInputChange}
        //   value={state.sellerData.city}
            name="city"
            label="City"
            variant="standard"
            sx={{ margin: "5px" }}
            required
        />
        {/* <span style={{ color: "red" }}>{formErrorsSeller.city}</span> */}
        </Box>
        <Box>
        <Typography sx={{ color: "red", marginTop: "30px" }}>
            {/* {responseSeller} */}
        </Typography>
        </Box>
        <span></span>
        <Box
        sx={{
            alignItems: "center",
            justify: "center",
            textAlign: "Center",
            backgroundColor: "red",
            marginTop: "30px",
        }}
        >
        <Button
            sx={{
            fontSize: "20px",
            textTransform: "unset",
            color: "white",
            }}
        //   disabled={savingSeller}
            type="submit"
        >
            Create my account
            {/* {savingSeller ? (
            <>
                <CircularProgress size={24} />
                Saving...
            </>
            ) : (
            " Create Account"
            )} */}
        </Button>
        </Box>
        <center><p>Already have an account ?
            <b>
            <a href='sel/login'
             style={{color:"brown",textDecoration:"none",fontFamily:"serif",marginLeft:"10px"}} underline='none'>Login</a></b></p></center>
    </form>
    <br /> <br />
    </Box> 
);
}
const SignUp=()=>{
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
            if (response.status===200) {
                console.log("The response is ",response)
                setmessage("Success")
                nav('/sel/home');
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
            
            <div class="slanted-box"></div>
            <div class="slanted-box2"></div>
            {/* <Box sx={{
                position:"absolute",
                zIndex:2,
                top:"10%",
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
                }}>Signup Up For Free</Link>
            </div>
            <center><p style={{position:"absolute",bottom:"10%",left:"20%"}}>Ⓒ All rights reserved by Nuchereta</p></center>
            </Box> */}
        
        
            {/* {<BuyerForm/>} */}
            {<SellerForm/>}
        </div>
    )
}
export default SignUp;