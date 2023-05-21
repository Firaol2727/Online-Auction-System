import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonIcon from '@mui/icons-material/Person';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import SellerNavbar from "./selnav";
import { Box,Typography,IconButton,Button, Stack, TextField,Link, ListItemIcon,Divider, CircularProgress} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState,useEffect } from 'react';
import axios from 'axios';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink } from "react-router-dom";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DoneAllIcon from '@mui/icons-material/DoneAll';

/**
 * 
 *  
 */
import LinearProgress from '@mui/material/LinearProgress';
import PropTypes from 'prop-types';
import List from '@mui/material/List';

import { useNavigate } from 'react-router-dom';

const baseapi=axios.create({
    baseURL:"http://localhost:5000/sel"
})
function SimpleDialog(props) {
    const { onClose, open } = props;
    const [oldpassword,setoldpassword]=useState("");
    const [npassword,setnpassword]=useState("");
    const [cpassword,setcpassword]=useState("");
    const [error,seterror]=useState(false);
    const [success,setsuccess]=useState(false);
    const [changeloading,setchangeloading]=useState(false);
   
    const handleClose = () => {
        onClose();
        setsuccess(false);
        setnpassword("")
        setcpassword("")
        setoldpassword("")
        seterror(false)
    };
    const handpasswordchange=(e)=>{
        e.preventDefault()
        setchangeloading(true);
        baseapi.post('/changepassword',{
            "pp":oldpassword,
            "np":npassword,
            'cp':cpassword,
        },{withCredentials:true})
        .then(res=>{
            if(res.status===200){
                setsuccess(true)
                setchangeloading(false),
                setTimeout(handleClose,[3000])
            }
        }).catch(err=>{
                seterror(true);
                setchangeloading(false)
        })

    }
  
    // const handleListItemClick = (value) => {
    //   onClose(value);
    // };
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Change Password</DialogTitle>
        <form onSubmit={handpasswordchange}>
            <List sx={{ pt: 0 }}>
            {error && <center><Typography color="error">Error password</Typography></center>}
            <TextField  sx={{
                margin: "10px",
                
                width:"300px",
                "& .MuiInputBase-root": {
                    height: 40,
                },
                }}
                type='password'
                id="outlined-basic"
                variant="standard"
                value={oldpassword}
                onChange={(e)=>{setoldpassword(e.target.value); seterror(false)}}
                label="old password"
            /> <br/>
            <TextField  sx={{
                margin: "10px",       
                width:"300px",
                "& .MuiInputBase-root": {
                    height: 40,
                },
                }}
                id="outlined-basic"
                variant="standard"
                value={npassword}
                onChange={(e)=>{setnpassword(e.target.value)}}
                label="New password"            
            /> 
             <br />
            <TextField  sx={{
                margin: "10px",
                
                width:"300px",
                "& .MuiInputBase-root": {
                    height: 40,
                },
                }}
                id="outlined-basic"
                variant="standard"
                        value={cpassword}
                        onChange={(e)=>{setcpassword(e.target.value)}}
                        label="old password" /> <br />
              {success && <center><Box >
                <IconButton direction={"row"} sx={{color:"white"}}>
                 <Typography sx={{color:"green"}}>Done</Typography>
                 <DoneAllIcon sx={{color:"green"}}/>
            </IconButton> </Box></center>
             }
            {changeloading && <LinearProgress/>}
            
            <br />
            <center> <Button variant='contained' color='error' disabled={changeloading} type='submit'>
                Confirm
            </Button></center>

            </List>
            </form>
        </Dialog>
      
    );
  }
  
  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

const SelProfie=()=>{
    const [profile,setProfile]=useState('');
    const [open, setOpen] = useState(false);
    const [loading,setloading]=useState(true);
    const [ploading,setploading]=useState(false);
    const [value,setvalue]=useState();
    const [email,setEmail]=useState('');
    const [fname,setfname]=useState('');
    const [lname,setlname]=useState('');
    const [telUsername,settelUsername]=useState('');
    const [region,setregion]=useState('');
    const [city,setCity]=useState('');
    const [btnletter,setBtnletter]=useState("Edit");
    const [pchanged,setpchanged]=useState(false);
    const [displaymode,setDisplaymode]=useState("normal"); // the display mode can be in normal , in edit or in passwordEdit form 

    const nav=useNavigate();
    useEffect(()=>{
        baseapi.get("/profile",{
            withCredentials:true
        })
        .then(res=>{
            if(res.status===200){
                setloading(false);
                let userdata=res.data;
                setfname(userdata.fname);
                setlname(userdata.lname);
                setEmail(userdata.email);
                setCity(userdata.city);
                setregion(userdata.region);
                settelUsername(userdata.telUsername);
                setProfile(res.data);
                console.log("The user userdata is ",userdata)
                console.log("The user profile is ",profile)
            }
            if(res.status===403){
                nav('/login')
            }
        }).catch(
            err=>{
                setloading(false);
                console.log("the error is ",err);
                console.log(
                    "status",err.status
                )
                nav('/login')
            }
        )
    },[pchanged])
    const [popen, setPopen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickPopen=()=>{
        setPopen(true);
    }
    const handlePClose = () => {
        setPopen(false);
      };
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange=()=>{

    }
    const handProfileChange=()=>{
        setploading(true);
        baseapi.post("/changepp",{
            "fname":fname,
            "lname":lname,
            "email":email,
            "telUsername":telUsername,
            "city":city,
            "region":region,

        },{withCredentials:true})
        .then(response=>{
            if(response.status===200){
                setploading(false);
                setpchanged(!pchanged);
                setDisplaymode("normal")
            }
        }).catch(err=>{
            if(err){
                console.log("error",err);
                setploading(false);
            }
        })
        
    }
  
    return (
        <div>
            <SellerNavbar/>
                {!loading && <Box sx={{
                    position:"absolute",
                    marginTop:"64px",
                    backgroundColor:"white",
                }} >
                {/* {displaymode=='normal' && <div style={{marginTop:"200px"}}>
                        The username is {profile.fname}
                </div>} */}

                    {displaymode=='normal' && <Box
                        className="profile"
                        my={5}
                        sx={{
                        alignItems: "center",
                        marginLeft: {
                            lg: "100px",
                            md: "90px",
                            sm: "30px",
                            xs: "15px",
                        },
                        marginRight: {
                            lg: "100px",
                            md: "90px",
                            sm: "30px",
                            xs: "15px",
                        },
                        }}
                    >
                    <Box sx={{ display: "flex" }}>
                    <Typography my={2} sx={{ marginLeft: "10px" }}>
                    
                        Account info
                    </Typography>
                    <Button sx={{
                        height: "50px",
                        fontSize: "5px",
                        textTransform: "unset",
                        alignItems: "center",
                        justify: "center",
                        textAlign: "Center",
                        marginLeft: {
                            xs: "60px",
                            sm: "200px",
                            md: "300px",
                            lg: "300px",
                        },
                        }}
                    >
                        <Typography
                        sx={{
                            paddingLeft: "20px",
                            paddingRight: "20px",
                            paddingTop: "5px",
                            paddingBottom: "5px",
                            backgroundColor: "#FA2121 ",
                            color: "white",
                            alignItems: "center",
                        }}
                        onClick={()=>{setDisplaymode("edit")}}
                        >
                        Edit Profile
                        </Typography>
                        
                    </Button>
                    </Box>
                    <Divider />
                    <Box
                    className="name"
                    my={4}
                    sx={{
                        diplay: {
                        lg: "flex",
                        md: "flex",
                        sm: "block",
                        xs: "block",
                        },
                    }}
                    >
                    <TextField  sx={{
                        margin: "10px",
                        width: {
                            lg: 245,
                            md: 260,
                            sm: 200,
                            xs: 200,
                        },
                        "& .MuiInputBase-root": {
                            height: 40,
                        },
                        }}
                        autoFocus
                        id="outlined-basic"
                        variant="outlined"
                        value={profile.fname}
                        label="First name"
                        InputProps={{
                        readOnly: true,
                        }}
                    />
                    <TextField sx={{
                        margin: "10px",

                        width: {
                            lg: 245,
                            md: 260,
                            sm: 200,
                            xs: 200,
                        },
                        "& .MuiInputBase-root": {
                            height: 40,
                        },
                        }}
                        id="outlined-basic"
                        variant="outlined"
                        value={profile.lname}
                        label="Last Name"
                    />
                    </Box>
                    <Box className="email">
                    <TextField
                        sx={{
                        marginLeft: "10px",
                        marginRight: "10px",

                        width: {
                            lg: 510,
                            md: 540,
                            sm: 420,
                            xs: 250,
                        },
                        "& .MuiInputBase-root": {
                            height: 40,
                        },
                        }}
                        id="outlined-basic"
                        variant={"outlined"}
                        value={profile.email}
                        label="Email"
                    />
                    </Box>
                    <Box className="phone">
                    <TextField
                        sx={{
                        marginLeft: "10px",
                        marginRight: "10px",

                        marginTop: "20px",
                        width: {
                            lg: 510,
                            md: 540,
                            sm: 420,
                            xs: 250,
                        },
                        "& .MuiInputBase-root": {
                            height: 40,
                        },
                        }}
                        id="outlined-basic"
                        variant="outlined"
                        value={profile.phonenumber}
                        label="Phone number"
                    />
                    </Box>
                    <Box className="Telegram Username">
                    <TextField
                        sx={{
                        marginLeft: "10px",
                        marginRight: "10px",

                        marginTop: "20px",
                        width: {
                            lg: 510,
                            md: 540,
                            sm: 420,
                            xs: 250,
                        },
                        "& .MuiInputBase-root": {
                            height: 40,
                        },
                        }}
                        id="outlined-basic"
                        variant="outlined"
                        value={profile.telUsername}
                        label="Telusername"
                    />
                    </Box> <br />
                    <Box className="type">
                    <TextField
                        sx={{
                        marginLeft: "10px",
                        marginRight: "10px",

                        width: {
                            lg: 510,
                            md: 540,
                            sm: 420,
                            xs: 250,
                        },
                        "& .MuiInputBase-root": {
                            height: 40,
                        },
                        }}
                        id="outlined-basic"
                        variant="outlined"
                        value={profile.sector}
                        label="Type"
                    />
                    </Box>
                    <Box className="City">
                    <TextField
                        sx={{
                        marginLeft: "10px",
                        marginRight: "10px",

                        marginTop: "20px",
                        width: {
                            lg: 510,
                            md: 540,
                            sm: 420,
                            xs: 250,
                        },
                        "& .MuiInputBase-root": {
                            height: 40,
                        },
                        }}
                        id="outlined-basic"
                        variant="outlined"
                        value={profile.city}
                        label="City"
                    />
                    </Box>
                    <Box className="Region">
                    <TextField
                        sx={{
                        marginLeft: "10px",
                        marginRight: "10px",

                        marginTop: "20px",
                        width: {
                            lg: 510,
                            md: 540,
                            sm: 420,
                            xs: 250,
                        },
                        "& .MuiInputBase-root": {
                            height: 40,
                        },
                        }}
                        id="outlined-basic"
                        variant="outlined"
                        value={profile.region}
                        label="Region"
                    />
                    </Box>
                    
                    <Box sx={{ marginTop: "20px", marginLeft: "0px" }}>
                    <Button
                        sx={{
                        height: "50px",
                        fontSize: "5px",

                        textTransform: "unset",
                        alignItems: "center",
                        justify: "center",
                        textAlign: "Center",
                        }}
                        disabled
                    >
                        <SettingsIcon sx={{color:"black"}}/>
                            <b style={{fontSize:"20px",color:"black"}}>Account Settings</b> 
                    </Button>
                    </Box>

                    <br />
                    
                    <Stack direction={"row"} spacing={2} onClick={handleClickPopen}> 
                        <EditSharpIcon sx={{color:"#3E403E"}} />
                        <div style={{fontSize:"20px",color:"#3E403E" }}>Change password</div> 
                    </Stack>

                    <Stack direction={"row"} spacing={2}  sx={{marginTop:"10px"}}  onClick={handleClickOpen}> 
                        <DeleteOutlineIcon sx={{color:"#3E403E"}} />
                        <div style={{fontSize:"20px",color:"#3E403E" }}>Delete Account ?</div> 
                    </Stack>
                    <Divider />
                        </Box>
                    }
                  
                    {displaymode=='edit'&&
                        <Box
                        className="profile"
                        my={5}
                        sx={{
                        alignItems: "center",
                        marginLeft: {
                            lg: "100px",
                            md: "90px",
                            sm: "30px",
                            xs: "15px",
                        },
                        marginRight: {
                            lg: "100px",
                            md: "90px",
                            sm: "30px",
                            xs: "15px",
                        },
                        }}
                    >
                    <Box sx={{ display: "flex" }}>
                    <Typography my={2} sx={{ marginLeft: "10px" }}>
                        {" "}
                        Account info
                    </Typography>
                    <Button sx={{
                        height: "50px",
                        fontSize: "5px",
                        textTransform: "unset",
                        alignItems: "center",
                        justify: "center",
                        textAlign: "Center",
                        marginLeft: {
                            xs: "60px",
                            sm: "200px",
                            md: "300px",
                            lg: "300px",
                        },
                        }}
                    >
                        <Typography
                        sx={{
                            paddingLeft: "20px",
                            paddingRight: "20px",
                            paddingTop: "5px",
                            paddingBottom: "5px",
                            backgroundColor: "#FA2121 ",
                            color: "white",
                            alignItems: "center",
                        }}
                        onClick={()=>{setDisplaymode("normal")}}
                        >
                        Back
                        </Typography>
                        
                    </Button>
                    </Box>
                    <Divider />
                    <Box
                    className="name"
                    my={4}
                    sx={{
                        diplay: {
                        lg: "flex",
                        md: "flex",
                        sm: "block",
                        xs: "block",
                        },
                    }}
                    >
                    <TextField  sx={{
                        margin: "10px",
                        width: {
                            lg: 245,
                            md: 260,
                            sm: 200,
                            xs: 200,
                        },
                        "& .MuiInputBase-root": {
                            height: 40,
                        },
                        }}
                        autoFocus
                        id="outlined-basic"
                        variant="outlined"
                        value={fname}
                        label="First name"
                        onChange={(event) => setfname(event.target.value)}
                        InputProps={{
                        readOnly: true,
                        }}
                    />
                    <TextField
                        sx={{
                        margin: "10px",

                        width: {
                            lg: 245,
                            md: 260,
                            sm: 200,
                            xs: 200,
                        },
                        "& .MuiInputBase-root": {
                            height: 40,
                        },
                        }}
                        id="outlined-basic"
                        variant="outlined"
                        value={lname}
                        label="Last Name"
                        onChange={(event) => setlname(event.target.value)}
                    />
                    </Box>
                    <Box className="email">
                    <TextField
                        sx={{
                        marginLeft: "10px",
                        marginRight: "10px",

                        width: {
                            lg: 510,
                            md: 540,
                            sm: 420,
                            xs: 250,
                        },
                        "& .MuiInputBase-root": {
                            height: 40,
                        },
                        }}
                        id="outlined-basic"
                        variant="outlined"
                        value={email}
                        onChange={(event)=>{setEmail(event.target.value)}}
                        label="Email"
                    />
                    </Box> <br />
                    <Box className="Telegram">
                    <TextField
                        sx={{
                        marginLeft: "10px",
                        marginRight: "10px",

                        width: {
                            lg: 510,
                            md: 540,
                            sm: 420,
                            xs: 250,
                        },
                        "& .MuiInputBase-root": {
                            height: 40,
                        },
                        }}
                        id="outlined-basic"
                        variant="outlined"
                        value={telUsername}
                        label="Tel username"
                        onChange={(event) => settelUsername(event.target.value)}
                    />
                    </Box>
                    <Box className="City">
                    <TextField
                        sx={{
                        marginLeft: "10px",
                        marginRight: "10px",

                        marginTop: "20px",
                        width: {
                            lg: 510,
                            md: 540,
                            sm: 420,
                            xs: 250,
                        },
                        "& .MuiInputBase-root": {
                            height: 40,
                        },
                        }}
                        id="outlined-basic"
                        variant="outlined"
                        value={city}
                        label="City"
                        onChange={(event) => setCity(event.target.value)}
                    />
                    </Box>

                    <Box sx={{ marginTop: "20px", marginLeft: "10px" }}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Region</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={region}
                        label="Region"
                        onChange={(event)=>{setregion(event.target.value)}}
                        sx={{ width: "250px" }}
                        MenuProps={{
                            style: {
                            maxHeight: 400,
                            },
                        }}
                        >
                        <MenuItem value="AddisAbaba">Addis Ababa</MenuItem>
                        <MenuItem value="DireDawa">Dire Dawa</MenuItem>
                        <MenuItem value="Amhara">Amhara</MenuItem>
                        <MenuItem value="Oromia">Oromia</MenuItem>
                        <MenuItem value="Tigray">Tigray</MenuItem>
                        <MenuItem value="Somali">Somali</MenuItem>
                        <MenuItem value="Benishangul-Gumuz">Benishangul-Gumuz</MenuItem>
                        <MenuItem value="Gambela">Gambela</MenuItem>
                        <MenuItem value="Harari">Harari</MenuItem>
                        <MenuItem value="Sidama">Sidama</MenuItem>
                        <MenuItem value="Afar">Afar</MenuItem>
                        <MenuItem value="SWEPR">SWEPR</MenuItem>
                        <MenuItem value="SNNEP">SNNPR</MenuItem>
                        </Select>
                    </FormControl>
                    </Box> 
                    <Box sx={{ marginTop: "20px", marginLeft: "0px" }}>
                        <Button
                            sx={{
                            height: "50px",
                            fontSize: "5px",
                            backgroundColor: "#FA2121 ",
                            textTransform: "unset",
                            alignItems: "center",
                            justify: "center",
                            textAlign: "Center",
                            }}
                            disabled={ploading}
                            onClick={handProfileChange}
                        >
                            {/* {ploading && <CircularProgress sx={{color:"white"}}  />} */}
                             <Typography
                            sx={{
                                paddingLeft: "20px",
                                paddingRight: "20px",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                                backgroundColor: "#FA2121 ",
                                color: "white",
                                alignItems: "center",
                            }}
                            >
                                  
                            {ploading?"Saving...":"Save changes"}
                            </Typography>
                        </Button>
                    </Box>
                    <Divider />
                        </Box>
                    }
                </Box>}
                <SimpleDialog
                    open={popen}
                    onClose={handlePClose}
                />
            
                <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure you want to delete your account"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            password - 
            <input type='password' id="passwordconfirm"/><br />
            Deleting your account will make you <br />
            <b>*</b>  Not  able to access your previous auctions <br />
            <b>*</b>Not able to  get  final auction reports <br />
            <b>Why do you want to delete your Account ?</b>
            <FormControl>
                {/* <FormLabel id="demo-controlled-radio-buttons-group">Gender?</FormLabel> */}
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                    >
                        <FormControlLabel value="understanding" control={<Radio />} label="I don't understand how to use the website" />
                        <FormControlLabel value="not_used" control={<Radio />} label="I don't need this account anymore" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} variant='outlined'>
            Cancel
          </Button>
          <Button onClick={handleClose} autoFocus variant='outlined' sx={{color:"red"}} >
            Delete
          </Button>
        </DialogActions>
                </Dialog>
         
        </div>
    )
}

export default SelProfie;
