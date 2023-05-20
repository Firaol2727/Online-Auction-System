import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonIcon from '@mui/icons-material/Person';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import SellerNavbar from "./selnav";
import { Box,Typography,IconButton,Button, Stack, TextField,Link, ListItemIcon,Divider} from "@mui/material";
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
import Avatar from '@mui/material/Avatar';

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
    const [changeloading,setchangeloading]=useState(false);
   
    const handleClose = () => {
      onClose();
    };
  
    // const handleListItemClick = (value) => {
    //   onClose(value);
    // };
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Change Password</DialogTitle>
        <List sx={{ pt: 0 }}>
         
        <TextField
                        sx={{
                        margin: "10px",
                        value:"",
                        width:"300px",
                        
                        }}
                        id="outlined-basic"
                        variant="standard"
                        label="old password"
        /> <br />
        <TextField
                        sx={{
                        margin: "10px",
                        
                        width:"300px",
                        "& .MuiInputBase-root": {
                            height: 40,
                        },
                        }}
                        id="outlined-basic"
                        variant="standard"
                        value=""
                        label="old password"
        /> <br />
        <TextField
                        sx={{
                        margin: "10px",
                        
                        width:"300px",
                        "& .MuiInputBase-root": {
                            height: 40,
                        },
                        }}
                        id="outlined-basic"
                        variant="standard"
                        label="old password"
        /> <br /> 
        {changeloading && <LinearProgress/>}
        <br />
        <center> <Button variant='contained' color='error' disabled={changeloading} onClick={()=>{setchangeloading(true)}}>
            Confirm
        </Button></center>
         
        </List>
      </Dialog>
    );
  }
  
  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

const SelProfie=()=>{
    const [region, setRegion] = useState(null);
    // const [profile,setProfile]=useState(null);
    const [open, setOpen] = useState(false);
    let profile;
    const [loading,setloading]=useState(true);
    const nav=useNavigate();
    useEffect(()=>{
        setloading(true);
        baseapi.get("/profile",{
            withCredentials:true
        })
        .then(res=>{
            if(res.status===200){
                setloading(false);
                 profile=res.data;
                // setProfile(res.data);
                console.log("The user profile is ",userdata)
            }
        }).catch(
            err=>{
                setloading(true);
                if(err.status===403){
                    nav('/login')
                }
            }
        )
    },[])
    const [popen, setPopen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [value, setValue] = useState('understanding');
    const handleChange = (event) => {
      setValue(event.target.value);
    };
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
    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('');
    const [deposit,setDeposit]=useState('');
    const [city,setCity]=useState('');
    const [btnletter,setBtnletter]=useState("Edit");
    const [displaymode,setDisplaymode]=useState("normal"); // the display mode can be in normal , in edit or in passwordEdit form 
    let boxSize=displaymode=='normal'?"120%":"130%";
    return (
        <div>
            <SellerNavbar/>
                {!loading && <Box sx={{
                    position:"absolute",
                    marginTop:"64px",
                    backgroundColor:"white",
                }} >
                
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
                        // value={profile.fname}
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
                        value={"profile.lname"}
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
                        variant={"profile.email"}
                        value="yohannesdejene23@gmail.com"
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
                        value="+251946951726"
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
                        value="@yohannesdejene"
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
                        value="private"
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
                        value="Addis Ababa"
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
                        value="Oromia"
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
                        value={region}
                        label="First name"
                        onChange={(event) => setRegion(event.target.value)}
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
                        value="dejene"
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
                        variant="outlined"
                        value="yohannesdejene23@gmail.com"
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
                        value="@yohannes"
                        label="Tel username"
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
                        value="Addis Ababa"
                        label="City"
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
                        onChange={handleChange}
                        sx={{ width: "250px" }}
                        MenuProps={{
                            style: {
                            maxHeight: 400,
                            },
                        }}
                        >
                        <MenuItem value="Addis Ababa">Addis Ababa</MenuItem>
                        <MenuItem value="Dire Dawa">Dire Dawa</MenuItem>
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

                        textTransform: "unset",
                        alignItems: "center",
                        justify: "center",
                        textAlign: "Center",
                        }}
                        disabled
                    >
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
                        Save changes
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
