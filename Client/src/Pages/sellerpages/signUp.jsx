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
import AlbumIcon from '@mui/icons-material/Album';
import Checkbox from '@mui/material/Checkbox';

import CircularProgress from "@mui/material/CircularProgress";
axios.create({
  baseURL: "http://localhost:5000",
});

// import  "./css/signup.css";
const baseUri=axios.create({
    baseURL:"http://localhost:5000/"
    });
function BuyerForm() {
    const [fname,setfname]=useState('');
    const [lname,setlname]=useState('');
    const [email,setemail]=useState('');
    const [phonenumber,setphonenumber]=useState('');
    const [password,setpassword]=useState('');
    const [confirmpassword,setconfirmpassword]=useState();
    const [errmessage,seterrmessage]=useState('');
    const [loading,setloading]=useState(false);
    const nav=useNavigate();
    function isValidPhoneNumber(phoneNumber) {
        const regex = /^(09|07)\d{8}$/;
        return regex.test(phoneNumber);
    }
    function isValidPassword(password) {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return regex.test(password);
    }
    
    const submitFormBuyer=(e)=>{
        e.preventDefault();
        setloading(true)
        let validphone=isValidPhoneNumber(phonenumber);
        let validpassword=isValidPassword(password);
        if(!validpassword){
            seterrmessage("Password length must be greater than 6 and must contain numbers and digits")
        }
        if(!validphone){
            seterrmessage("Enter a valid phonenumber")
        }
        if(password!==confirmpassword){
            seterrmessage("Error in confirm password")
        }
        if(validphone  && validpassword && password==confirmpassword){
            baseUri.post('/custom/register',
                {
                    "firstName":fname,
                    "lastName":lname,
                    "phoneNumber":phonenumber, 
                    "email":email, 
                    "password":password 
                })
                .then(res=>{
                    setloading(false)
                    if(res.status==200){
                        nav(-1);
                    }else{
                        seterrmessage("It looks like you have already an account, try login")
                    }
                })
                .catch(err=>{
                    setloading(false)
                    console.log("The error is ",err);
                    seterrmessage("Network error ")
                })
        }

    }
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
        <form  onSubmit={ (e)=>{
            e.preventDefault
        }
        }  style={{border:"1px gray solid", borderRadius:"30px", padding:"20px",}}>
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
                }}> Sign up to bid boldly and win gracefully.</Typography></center> 
            <br />
            <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
            >
            <span style={{ color: "red" }}>{errmessage}</span>
            <Stack gap={2} direction={{sm:"column",xs:"column",lg:"row",md:"row"}} 
                sx={{ width:"100%"}} >
                <TextField
                    value={fname}
                    onChange={(e)=>{setfname(e.target.value)}}
                    name="fname"
                    label="First Name"
                    variant="standard"
                    sx={{ margin: "5px",width:{sm:"47%",xs:"96%",lg:"96%",md:"47%"} }}
                    required
                />
                <TextField
                       value={lname}
                       onChange={(e)=>{setlname(e.target.value)}}
                    name="lname"
                    label="Last Name"
                    variant="standard"
                    sx={{ margin: "5px" ,width:{sm:"47%",xs:"96%",lg:"96%",md:"47%"} }}
                    required
                />
            </Stack>
            <TextField
                value={email}
                onChange={(e)=>{setemail(e.target.value)}}
                name="email"
                label="Email"
                variant="standard"
                sx={{ margin: "5px" }}
                required
                type="email"
            />
    
            <TextField
                value={phonenumber}
                onChange={(e)=>{setphonenumber(e.target.value)}}
                name="phonenumber"
                label="Phone Number"
                variant="standard"
                sx={{ margin: "5px" }}
                required
                type="number"
            />
    
            <TextField
               value={password}
               onChange={(e)=>{setpassword(e.target.value)}}
                name="password"
                label="Password"
                variant="standard"
                sx={{ margin: "5px" }}
                required
                type="password"
            />
            {/* <span style={{ color: "red" }}>{formErrorsSeller.password}</span> */}
            <TextField
                value={confirmpassword}
                onChange={(e)=>{setconfirmpassword(e.target.value)}}
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
               
                {loading ? (
                <>
                    <CircularProgress size={24} />
                    Signing...
                </>
                ) : (
                "Create my account"
                )}
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
    
function SellerForm() {
    const [fname,setfname]=useState('');
    const [lname,setlname]=useState('');
    const [email,setemail]=useState('');
    const [phonenumber,setphonenumber]=useState('');
    const [region,setregion]=useState('');
    const nav=useNavigate();
    const [city,setcity]=useState('');
    const [password,setpassword]=useState('');
    const [confirmpassword,setconfirmpassword]=useState();
    const [errmessage,seterrmessage]=useState('');
    const [loading,setloading]=useState(false);
    function isValidPhoneNumber(phoneNumber) {
        const regex = /^(09|07)\d{8}$/;
        return regex.test(phoneNumber);
    }
    function isValidPassword(password) {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return regex.test(password);
    }
    const submitSeller=(e)=>{
        e.preventDefault();
        let validphone=isValidPhoneNumber(phonenumber);
        let validpassword=isValidPassword(password);
        if(!validpassword){
            seterrmessage("Password length must be greater than 6 and must contain numbers and digits")
        }
        if(!validphone){
            seterrmessage("Enter a valid phonenumber")
        }
        if(password!==confirmpassword){
            seterrmessage("Error in confirm password")
        }
        if(validphone  && validpassword && password==confirmpassword){
            baseUri.post('/sel/register',
                {
                    "firstName":fname,
                    "lname":lname,
                    "phoneNumber":phonenumber, 
                    "email":email, 
                    "password":password,
                    "region":region,
                    "city":city
                })
                .then(res=>{
                    if(res.status===200){
                        nav(-1)
                    }else{
                        seterrmessage("It looks like you have already an account,try to login")
                    }
                })
                .catch(err=>{
                    console.log("The error is ",err);
                    
                })
        }

    }
    return (
    <Box
    sx={{
        position:"absolute",
        backgroundColor:"white",
        zIndex:2,
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
    <form  style={{border:"1px gray solid", borderRadius:"30px", padding:"20px",}}>
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
        <span style={{ color: "red" }}>{errmessage}</span>
        <Stack gap={2} direction={{sm:"column",xs:"column",lg:"row",md:"row"}} 
            sx={{ width:"100%"}} >
            <TextField
                onChange={(e) =>setfname(e.target.value)}
                value={fname}
                name="fname"
                label="First Name"
                variant="standard"
                sx={{ margin: "5px",width:{sm:"47%",xs:"96%",lg:"96%",md:"47%"} }}
                required
            />
            <TextField
                onChange={(e) =>setlname(e.target.value)}
                value={lname}
                name="lname"
                label="Last Name"
                variant="standard"
                sx={{ margin: "5px" ,width:{sm:"47%",xs:"96%",lg:"96%",md:"47%"} }}
                required
            />
        </Stack>
        <TextField
            onChange={(e) =>setemail(e.target.value)}
            value={email}
            name="email"
            label="Email"
            variant="standard"
            sx={{ margin: "5px" }}
            required
            type="email"
        />

        <TextField
            onChange={(e) =>setphonenumber(e.target.value)}
            value={phonenumber}
            name="phonenumber"
            label="Phone Number"
            variant="standard"
            sx={{ margin: "5px" }}
            required
            type="number"
        />

        <TextField
            onChange={(e) =>setpassword(e.target.value)}
            value={password}
            name="password"
            label="Password"
            variant="standard"
            sx={{ margin: "5px" }}
            required
            type="password"
        />

        <TextField
            onChange={(e) =>setconfirmpassword(e.target.value)}
            value={confirmpassword}
            name="confirmpassword"
            defaultValue={"Addis Ababa"}
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
            <Typography sx={{ float: "left", paddingTop: "17px",color:"gray" }}>
            Region:
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 70 }}>
            <Select
                // value={region}
                required
                onChange={(e) =>setregion(e.target.value)}
                value={region}
                name="region"
                // displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{ height: "40px",width:"300px" }}
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
            onChange={(e) =>setcity(e.target.value)}
            value={city}
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
            backgroundColor:"brown",
            ":hover":{backgroundColor:"red"},
            borderSize:"10px"}}
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
const SelectUserType=(props)=>{
    const [selected,setselected]=useState(0)
    const [checked, setChecked] = useState(true);
    const [checked2, setChecked2] = useState(false);
    const [usertype, setusertype] = useState(1);
    const handleChange = (event) => {
        if(!checked){
            setChecked(event.target.checked);
            setChecked2(false)
            setusertype(1)
        }
        
    };
    const handleChange2 = (event) => {
        if(!checked2){
            setChecked2(event.target.checked);
            setChecked(false)
            setusertype(2)
        }
    };
    const submiType=() =>{
        props.settype(usertype)
    }
    console.log("Selecting user type",props.type)

    return <>
        <Box
    sx={{
        position:"absolute",
        backgroundColor:"white",
        zIndex:2,
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
    }}>
        <Box style={{border:"1px gray solid", borderRadius:"30px", padding:"20px",}}>
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
            }}>Join as a Buyer or Seller</Typography></center> 
            <br /><br />
        

            <Stack  sx={{marginLeft:"7%"}} gap={5} direction={{xs:"column",sm:"row"}}>
                <Box sx={{
                    padding:"5px",
                    width:{xs:"90%",sm:"40%"},
                    height:"170px",
                    border:checked?"3px brown solid":"1px grey solid",

                }}>
                    
                    <Checkbox
                        sx={{left:"84%",top:"0%"}}
                        checked={checked}
                        onChange={handleChange}
                        color="error"
                        icon={<AlbumIcon />}
                        checkedIcon={<AlbumIcon />}
                        inputProps={{ 'aria-label': 'controlled' }}
                        />
                    <Box sx={{position:"static" ,top:{sm:"25%",xs:"5%"},width:"50px",height:"50px"}} >
                    <img src='/buyer3.png' alt="" width="50px" height="50px" /></Box>
                    
                    <p style={{
                        marginRight:"10px",
                        marginLeft:"10px",
                        
                        width:"80%",
                        fontSize:"20px",
                        fontWeight:"bold",
                        fontFamily:"serif"
                        }}>I'm a buyer looking for products</p>
                </Box>
                <Box sx={{
                    
                    width:{xs:"90%",sm:"40%"},
                    height:"170px",
                    border:checked2?"3px brown solid":"1px grey solid",
                    padding:"5px"

                }}>
                    <Checkbox
                        sx={{left:"84%",top:"0%"}}
                        color="error"
                        checked={checked2}
                        onChange={handleChange2}
                        icon={<AlbumIcon />}
                        checkedIcon={<AlbumIcon />}
                        inputProps={{ 'aria-label': 'controlled' }}
                        />
                         <Box sx={{position:"static" ,top:{sm:"25%",xs:"5%"},width:"50px",height:"50px"}} >
                        <img src='/seller.jpeg' alt="" width="50px" height="50px" />
                    </Box>
                    <p style={{
                        marginRight:"10px",
                        marginLeft:"10px",
                        fontSize:"20px",
                        fontWeight:"bold",
                        fontFamily:"serif"
                        }}>I'm a seller looking for products</p>
                </Box>
               
            </Stack>
            
            <br /><br /> <br />

            <center> 
                <Button 
                    onClick={submiType}
                    sx={{
                        backgroundColor:"brown",
                        ":hover":{backgroundColor:"red"},
                        width:"50%", color:"white",
                        borderSize:"10px"}} variant='contained' >
                    { checked? "Join as Buyer":"Join as Seller"}</Button></center>
            <br /><br /> <br />
            <center><p>Already have an account ?
            <b>
            <a href='sel/login'
                style={{color:"brown",textDecoration:"none",fontFamily:"serif",marginLeft:"10px"}} underline='none'>Login</a></b></p></center>
        </Box>
    </Box>
    </>
}
const SignUp=()=>{
    const [type,settype]=useState(0);
    // 1 type=1 for bidder
    // 2 type=2 for seller
    // 0 type=0for not selected yet
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
      
        
            <SelectUserType type={type} settype={settype} />
            {type ==1 &&<BuyerForm/>}
            {type ==2 && <SellerForm/>}
        </div>
    )
}
export default SignUp;